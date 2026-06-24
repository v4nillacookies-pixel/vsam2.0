"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  bannerImage,
  bestSellers,
  productOriginalPrice,
  productImage,
  productSalePrice,
  productSaleSavings,
  productUrl,
  promos,
  refrigeratorProducts,
  ryzenDesktopProducts,
  tvProducts,
  wideBanners,
  type Product
} from "@/lib/sams-data";
import {
  addProductToStoredCart,
  cartTotalItems,
  getStoredCart,
  type StoredCartItem
} from "@/lib/cart-storage";
import {
  ACCOUNT_UPDATED_EVENT,
  getStoredAccount,
  type StoredAccount
} from "@/lib/account-storage";
import { AccountModal } from "./account-modal";
import "./electronics-landing.css";

type DeliveryAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

const ADDRESS_STORAGE_KEY = "sams-delivery-address";
const HERO_SLIDES = ["/hero-tech.png", "/hero-tech-2.png", "/hero-tech-3.png"];

export function ElectronicsLanding() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<StoredCartItem[]>([]);
  const [address, setAddress] = useState<DeliveryAddress | null>(null);
  const [account, setAccount] = useState<StoredAccount | null>(null);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSaleOpen, setIsSaleOpen] = useState(true);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const totalItems = useMemo(
    () => cartTotalItems(cart),
    [cart]
  );

  useEffect(() => {
    setCart(getStoredCart());

    function syncCart() {
      setCart(getStoredCart());
    }

    window.addEventListener("storage", syncCart);
    window.addEventListener("sams-cart-updated", syncCart);

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("sams-cart-updated", syncCart);
    };
  }, []);

  useEffect(() => {
    const savedAddress = window.localStorage.getItem(ADDRESS_STORAGE_KEY);

    if (!savedAddress) {
      return;
    }

    try {
      setAddress(JSON.parse(savedAddress) as DeliveryAddress);
    } catch {
      window.localStorage.removeItem(ADDRESS_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    setAccount(getStoredAccount());

    function syncAccount() {
      setAccount(getStoredAccount());
    }

    window.addEventListener("storage", syncAccount);
    window.addEventListener(ACCOUNT_UPDATED_EVENT, syncAccount);

    return () => {
      window.removeEventListener("storage", syncAccount);
      window.removeEventListener(ACCOUNT_UPDATED_EVENT, syncAccount);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  function toggleFavorite(productId: string) {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  }

  function addToCart(product: Product) {
    setCart(addProductToStoredCart(product.id));
  }

  function saveAddress(nextAddress: DeliveryAddress) {
    setAddress(nextAddress);
    window.localStorage.setItem(
      ADDRESS_STORAGE_KEY,
      JSON.stringify(nextAddress)
    );
    setIsAddressOpen(false);
  }

  function deleteAddress() {
    setAddress(null);
    window.localStorage.removeItem(ADDRESS_STORAGE_KEY);
    setIsAddressOpen(false);
  }

  return (
    <main className="page-shell">
      <Header
        account={account}
        address={address}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAddress={() => setIsAddressOpen(true)}
        totalItems={totalItems}
      />

      {isSaleOpen ? (
        <SuperSalePopup onClose={() => setIsSaleOpen(false)} />
      ) : null}

      <section className="hero">
        <div className="hero-background" aria-hidden="true">
          {HERO_SLIDES.map((slide, index) => (
            <span
              className={index === activeHeroIndex ? "hero-slide is-active" : "hero-slide"}
              key={slide}
              style={{ backgroundImage: `url(${slide})` }}
            />
          ))}
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Electronica y Computacion</p>
          <h1>Compra tecnologia, pantallas y gadgets a precio de socio</h1>
        </div>

        <div className="delivery-card" aria-label="Seleccion de entrega">
          <span className="pin-icon">
            <Image alt="" height={34} src="/sams0.png" width={34} />
          </span>
          <div>
            <strong>Como quieres tus articulos?</strong>
            <p>
              {address
                ? `${address.city}, ${address.zip}`
                : "Elige envio, pickup o entrega en 24 hrs."}
            </p>
          </div>
          <button onClick={() => setIsAddressOpen(true)} type="button">
            Cambiar
          </button>
        </div>
      </section>

      <section className="content-section" aria-labelledby="aprovecha">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Aprovecha hoy</p>
            <h2 id="aprovecha">Promociones destacadas</h2>
          </div>
        </div>

        <div className="promo-grid">
          {promos.map((promo) => (
            <a className="promo-card" href={promo.href} key={promo.title}>
              <span>{promo.title}</span>
              <strong>{promo.date}</strong>
              <em>Ver productos</em>
            </a>
          ))}
        </div>

      </section>

      <ProductRail
        id="mas-vendido"
        eyebrow="Lo mas Vendido"
        title="Favoritos de los Socios"
        products={bestSellers}
        favorites={favorites}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
      />

      <ProductRail
        id="refrigeradores-samsung"
        eyebrow="Linea blanca"
        title="Refrigeradores Samsung"
        products={refrigeratorProducts}
        favorites={favorites}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
      />

      <section className="wide-banner-section" id="pantallas">
        {wideBanners.map((banner) => (
          <article className="wide-banner" key={banner.id}>
            <Image
              alt={banner.title}
              fill
              priority={banner.id === "pantallas"}
              sizes="(max-width: 920px) 100vw, 1180px"
              src={bannerImage(banner.image)}
            />
            <div>
              <p>{banner.title}</p>
              <strong>{banner.subtitle}</strong>
            </div>
          </article>
        ))}
      </section>

      <ProductRail
        id="computo"
        eyebrow="Grita Gooool!"
        title="Vive la emocion en alta Definicion"
        products={tvProducts}
        favorites={favorites}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
      />

      <ProductRail
        id="computadoras-ryzen"
        eyebrow="Computo"
        title="Computadoras de escritorio Ryzen"
        products={ryzenDesktopProducts}
        favorites={favorites}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
      />

      {isAddressOpen ? (
        <AddressModal
          address={address}
          onClose={() => setIsAddressOpen(false)}
          onDelete={deleteAddress}
          onSave={saveAddress}
        />
      ) : null}

      {isAccountOpen ? (
        <AccountModal
          account={account}
          onClose={() => setIsAccountOpen(false)}
          onSave={setAccount}
        />
      ) : null}
    </main>
  );
}

function Header({
  account,
  address,
  onOpenAccount,
  onOpenAddress,
  totalItems
}: {
  account: StoredAccount | null;
  address: DeliveryAddress | null;
  onOpenAccount: () => void;
  onOpenAddress: () => void;
  totalItems: number;
}) {
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Sam's Club inicio">
          <Image
            alt="Sam's Club"
            height={29}
            priority
            src="/sams.svg"
            width={171}
          />
        </Link>

        <button className="nav-button" type="button">
          Departamentos
        </button>

        <label className="search-box">
          <span>Buscar</span>
          <input placeholder="Buscar en Sam's Club" />
        </label>

        <nav className="header-actions" aria-label="Acciones de cuenta">
          <a href="#">Beneficios</a>
          <button
            className="header-action-button"
            onClick={onOpenAccount}
            type="button"
          >
            {account ? account.name.split(" ")[0] : "Cuenta"}
          </button>
          <a href="#">Pedidos</a>
          <Link aria-label={`Carrito con ${totalItems} articulos`} className="cart-button" href="/cart">
            <CartIcon />
            <span>{totalItems}</span>
          </Link>
        </nav>
      </header>

      <div className="delivery-strip">
        <button onClick={onOpenAddress} type="button">
          <strong>Elige como quieres recibir el pedido</strong>
          <span>{address ? "Cambiar direccion" : "Agregar direccion"}</span>
        </button>
        <p>
          {address
            ? `${address.street}, ${address.city}, ${address.state}, ${address.zip}`
            : "Guarda tu direccion para calcular disponibilidad y tiempos de entrega."}
        </p>
      </div>
    </>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 5h2.2l1.7 9.4a2 2 0 0 0 2 1.6h6.7a2 2 0 0 0 1.9-1.4L20 8H7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M10 20h.01M17 20h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
}

function AddressModal({
  address,
  onClose,
  onDelete,
  onSave
}: {
  address: DeliveryAddress | null;
  onClose: () => void;
  onDelete: () => void;
  onSave: (address: DeliveryAddress) => void;
}) {
  const [street, setStreet] = useState(address?.street ?? "");
  const [city, setCity] = useState(address?.city ?? "");
  const [state, setState] = useState(address?.state ?? "");
  const [zip, setZip] = useState(address?.zip ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSave({
      street: street.trim(),
      city: city.trim(),
      state: state.trim(),
      zip: zip.trim()
    });
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        aria-labelledby="address-title"
        aria-modal="true"
        className="address-modal"
        role="dialog"
      >
        <div className="modal-heading">
          <div>
            <p className="eyebrow">Entrega</p>
            <h2 id="address-title">Agrega tu direccion</h2>
          </div>
          <button aria-label="Cerrar" onClick={onClose} type="button">
            x
          </button>
        </div>

        <form className="address-form" onSubmit={handleSubmit}>
          <label>
            Calle y numero
            <input
              autoFocus
              onChange={(event) => setStreet(event.target.value)}
              placeholder="Ej. Av. 10 Norte 123"
              required
              value={street}
            />
          </label>
          <label>
            Ciudad
            <input
              onChange={(event) => setCity(event.target.value)}
              placeholder="Ej. Playa del Carmen"
              required
              value={city}
            />
          </label>
          <label>
            Estado
            <input
              onChange={(event) => setState(event.target.value)}
              placeholder="Ej. Q.R."
              required
              value={state}
            />
          </label>
          <label>
            Codigo postal
            <input
              inputMode="numeric"
              onChange={(event) => setZip(event.target.value)}
              pattern="[0-9]{5}"
              placeholder="77710"
              required
              value={zip}
            />
          </label>

          <div className="modal-actions">
            {address ? (
              <button className="danger-button" onClick={onDelete} type="button">
                Borrar direccion
              </button>
            ) : null}
            <button className="secondary-button" onClick={onClose} type="button">
              Cancelar
            </button>
            <button className="save-button" type="submit">
              Guardar direccion
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function ProductRail({
  id,
  eyebrow,
  title,
  products,
  favorites,
  onAddToCart,
  onToggleFavorite
}: {
  id: string;
  eyebrow: string;
  title: string;
  products: Product[];
  favorites: string[];
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  function scrollRail(direction: "left" | "right") {
    railRef.current?.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth"
    });
  }

  return (
    <section className="content-section product-section" id={id}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>

        <div className="rail-controls" aria-label={`Controles de ${title}`}>
          <Link href="/products">
            Ver mas
          </Link>
        </div>
      </div>

      <div className="product-rail-shell">
        <div className="product-rail" ref={railRef}>
          {products.map((product) => (
            <ProductCard
              isFavorite={favorites.includes(product.id)}
              key={product.id}
              onAdd={() => onAddToCart(product)}
              onFavorite={() => onToggleFavorite(product.id)}
              product={product}
            />
          ))}
        </div>
        <button
          aria-label={`Ver mas productos de ${title}`}
          className="rail-next-button"
          onClick={() => scrollRail("right")}
          type="button"
        >
          &rsaquo;
        </button>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  isFavorite,
  onAdd,
  onFavorite
}: {
  product: Product;
  isFavorite: boolean;
  onAdd: () => void;
  onFavorite: () => void;
}) {
  return (
    <article className="product-card">
      <div className="product-badge-row">
        <span className="product-badge">{product.badge}</span>
        <button
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          className={isFavorite ? "heart-button is-active" : "heart-button"}
          onClick={onFavorite}
          type="button"
        >
          &hearts;
        </button>
      </div>

      <Link className="product-image" href={productUrl(product)}>
        <Image
          alt={product.name}
          height={220}
          loading="lazy"
          sizes="220px"
          src={productImage(product.id)}
          width={220}
        />
      </Link>

      <button className="add-button" onClick={onAdd} type="button">
        Agregar
      </button>

      <div className="price-block">
        <strong>{productSalePrice(product)}</strong>
        <span>{productOriginalPrice(product)}</span>
        <em>{productSaleSavings(product)}</em>
      </div>

      <p className="months">{product.months}</p>
      <p className="brand-name">{product.brand}</p>
      <Link className="product-name" href={productUrl(product)}>
        {product.name}
      </Link>

      {product.rating ? <p className="rating">&#9733; {product.rating}</p> : null}

      <div className="fulfillment-list">
        {product.fulfillment.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  );
}

function SuperSalePopup({ onClose }: { onClose: () => void }) {
  const [remainingSeconds, setRemainingSeconds] = useState(24 * 60 * 60);
  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;
  const timeParts = [hours, minutes, seconds].map((part) =>
    String(part).padStart(2, "0")
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="sale-popup-backdrop" role="presentation">
      <section
        aria-labelledby="sale-popup-title"
        aria-modal="true"
        className="sale-popup"
        role="dialog"
      >
        <button aria-label="Cerrar promocion" onClick={onClose} type="button">
          x
        </button>
        <p>SUPER SALE</p>
        <h2 id="sale-popup-title">60% de descuento</h2>
        <strong>{timeParts.join(":")}</strong>
        <span>Termina en 24 hs.</span>
      </section>
    </div>
  );
}
