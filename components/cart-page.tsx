"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  cartTotalItems,
  getStoredCart,
  removeStoredCartItem,
  updateStoredCartQuantity,
  type StoredCartItem
} from "@/lib/cart-storage";
import {
  ACCOUNT_UPDATED_EVENT,
  getStoredAccount,
  type StoredAccount
} from "@/lib/account-storage";
import {
  findProductById,
  productOriginalPriceValue,
  productImage,
  productSalePriceValue,
  productUrl,
  type Product
} from "@/lib/sams-data";
import { AccountModal } from "./account-modal";
import styles from "./cart-page.module.css";

type CartLine = {
  product: Product;
  qty: number;
};

type DeliveryMethodId = "pickup" | "fast" | "standard";
type CheckoutStep = "address" | "payment" | null;

const deliveryMethodLabels: Record<DeliveryMethodId, string> = {
  pickup: "Club Pickup",
  fast: "Envio En 24 Hrs",
  standard: "Envio Estandar"
};

export function CartPage() {
  const [items, setItems] = useState<StoredCartItem[]>([]);
  const [account, setAccount] = useState<StoredAccount | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] =
    useState<DeliveryMethodId>("pickup");

  useEffect(() => {
    setItems(getStoredCart());

    function syncCart() {
      setItems(getStoredCart());
    }

    window.addEventListener("storage", syncCart);
    window.addEventListener("sams-cart-updated", syncCart);

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("sams-cart-updated", syncCart);
    };
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

  const cartLines = useMemo(
    () =>
      items
        .map((item) => {
          const product = findProductById(item.id);
          return product ? { product, qty: item.qty } : null;
        })
        .filter((item): item is CartLine => Boolean(item)),
    [items]
  );

  const totalItems = cartTotalItems(items);
  const totals = useMemo(() => calculateTotals(cartLines), [cartLines]);

  function updateQuantity(productId: string, qty: number) {
    setItems(updateStoredCartQuantity(productId, qty));
  }

  function removeItem(productId: string) {
    setItems(removeStoredCartItem(productId));
  }

  function openAddressStep(method: DeliveryMethodId) {
    setSelectedDelivery(method);
    setCheckoutStep("address");
  }

  return (
    <main className={styles.page}>
      <CartHeader
        account={account}
        estimatedTotal={formatCurrency(totals.total)}
        onOpenAccount={() => setIsAccountOpen(true)}
        total={totalItems}
      />

      <div className={styles.shell}>
        <section className={styles.cartColumn}>
          <h1>
            Carrito <span>({totalItems} {totalItems === 1 ? "articulo" : "articulos"})</span>
          </h1>

          {cartLines.length ? (
            <>
              <div className={styles.notice}>
                <span>i</span>
                {Math.min(2, totalItems)} articulos no estan disponibles para el metodo de envio seleccionado.
              </div>

              <section className={styles.deliveryDetails} aria-labelledby="delivery-title">
                <div className={styles.sectionTitle}>
                  <Image alt="" height={34} src="/sams0.png" width={34} />
                  <h2 id="delivery-title">Detalles del envio</h2>
                </div>

                <div className={styles.deliveryMethods}>
                  <DeliveryMethod
                    icon={<PickupIcon />}
                    onSelect={() => openAddressStep("pickup")}
                    title="Club Pickup"
                    text={`${Math.max(1, totalItems - 2)} articulos`}
                  />
                  <DeliveryMethod
                    icon={<FastShippingIcon />}
                    onSelect={() => openAddressStep("fast")}
                    title="Envio En 24 Hrs"
                    text="Todos los articulos"
                  />
                  <DeliveryMethod
                    icon={<StandardShippingIcon />}
                    onSelect={() => openAddressStep("standard")}
                    title="Envio Estandar"
                    text="Todos los articulos"
                  />
                </div>

                <div className={styles.pickupBox}>
                  <Image alt="" height={42} src="/sams0.png" width={42} />
                  <div>
                    <strong>Pickup o envio a domicilio</strong>
                    <Link href="/">Sam&apos;s Club Playa del Carmen, Q.R.</Link>
                  </div>
                  <button onClick={() => openAddressStep("pickup")} type="button">
                    Reservar un horario
                  </button>
                </div>
              </section>

              <section className={styles.itemsPanel}>
                {cartLines.map((line) => (
                  <CartItemRow
                    key={line.product.id}
                    line={line}
                    onRemove={() => removeItem(line.product.id)}
                    onUpdate={(qty) => updateQuantity(line.product.id, qty)}
                  />
                ))}
              </section>

              <section className={styles.otherDelivery}>
                <h2>Disponible con otros metodos de envio</h2>
                <p>Algunos articulos pueden cambiar de disponibilidad segun tu direccion o club seleccionado.</p>
              </section>
            </>
          ) : (
            <section className={styles.emptyCart}>
              <h2>Tu carrito esta vacio</h2>
              <p>Agrega productos desde Electronica y Computacion para verlos aqui.</p>
              <Link href="/">Seguir comprando</Link>
            </section>
          )}
        </section>

        <aside className={styles.summary}>
          <button
            className={styles.continueButton}
            disabled={!cartLines.length}
            onClick={() => openAddressStep(selectedDelivery)}
            type="button"
          >
            Continuar
          </button>

          <dl className={styles.totalRows}>
            <div>
              <dt>Subtotal ({totalItems} {totalItems === 1 ? "articulo" : "articulos"})</dt>
              <dd className={totals.savings > 0 ? styles.strike : ""}>{formatCurrency(totals.subtotal)}</dd>
            </div>
            <div>
              <dt>Ahorros</dt>
              <dd className={styles.savings}>-{formatCurrency(totals.savings)}</dd>
            </div>
            <div>
              <dt>Total estimado</dt>
              <dd>{formatCurrency(totals.total)}</dd>
            </div>
          </dl>

          <p>Los precios incluyen IVA</p>
        </aside>

        <aside className={styles.cashback}>
          Obten un descuento pagando con Cashi o tarjeta de debito
        </aside>
      </div>

      {checkoutStep ? (
        <CheckoutModal
          account={account}
          deliveryMethod={selectedDelivery}
          onClose={() => setCheckoutStep(null)}
          onConfirmAddress={() => setCheckoutStep("payment")}
          step={checkoutStep}
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

function CartHeader({
  account,
  onOpenAccount,
  total,
  estimatedTotal
}: {
  account: StoredAccount | null;
  onOpenAccount: () => void;
  total: number;
  estimatedTotal: string;
}) {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/" aria-label="Sam's Club inicio">
        <Image alt="Sam's Club" height={29} priority src="/sams.svg" width={171} />
      </Link>

      <button className={styles.navButton} type="button">Departamentos</button>
      <Link href="/">Beneficios</Link>

      <label className={styles.search}>
        <span>Buscar</span>
        <input placeholder="Buscar en Sam's Club en linea o en tienda" />
      </label>

      <nav className={styles.actions} aria-label="Acciones de cuenta">
        <Link href="/">Tus productos</Link>
        <button
          className={styles.accountButton}
          onClick={onOpenAccount}
          type="button"
        >
          {account ? account.name.split(" ")[0] : "Cuenta"}
        </button>
        <Link aria-label={`Carrito con ${total} articulos`} className={styles.cartIcon} href="/cart">
          <CartSvg />
          <span>{total}</span>
          <small>{estimatedTotal}</small>
        </Link>
      </nav>
    </header>
  );
}

function DeliveryMethod({
  icon,
  onSelect,
  title,
  text
}: {
  icon: ReactNode;
  onSelect: () => void;
  title: string;
  text: string;
}) {
  return (
    <button className={styles.deliveryMethod} onClick={onSelect} type="button">
      <span>{icon}</span>
      <strong>{title}</strong>
      <em>{text}</em>
    </button>
  );
}

function CheckoutModal({
  account,
  deliveryMethod,
  onClose,
  onConfirmAddress,
  step
}: {
  account: StoredAccount | null;
  deliveryMethod: DeliveryMethodId;
  onClose: () => void;
  onConfirmAddress: () => void;
  step: CheckoutStep;
}) {
  const [selectedPayment, setSelectedPayment] = useState<"spei" | "oxxo" | null>(
    null
  );
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const deliveryLabel = deliveryMethodLabels[deliveryMethod];
  const addressPlaceholder = account?.address || "Ej. Av. 10 Norte 123";
  const zipPlaceholder = account?.zip || "77710";

  function handleAddressSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onConfirmAddress();
  }

  return (
    <div className={styles.modalBackdrop} role="presentation">
      <section
        aria-labelledby={step === "address" ? "address-modal-title" : "payment-modal-title"}
        aria-modal="true"
        className={styles.checkoutModal}
        role="dialog"
      >
        <div className={styles.modalHeader}>
          <div>
            <p>{deliveryLabel}</p>
            <h2 id={step === "address" ? "address-modal-title" : "payment-modal-title"}>
              {step === "address" ? "Confirma tu direccion" : "Elige una forma de pago"}
            </h2>
          </div>
          <button aria-label="Cerrar" onClick={onClose} type="button">
            x
          </button>
        </div>

        {step === "address" ? (
          <form className={styles.addressForm} onSubmit={handleAddressSubmit}>
            <div className={styles.formGrid}>
              <label>
                Domicilio
                <input autoFocus placeholder={addressPlaceholder} required />
              </label>
              <label>
                Numeracion
                <input placeholder="Ej. 123" required />
              </label>
              <label>
                Localidad
                <input placeholder="Ej. Playa del Carmen" required />
              </label>
              <label>
                Codigo postal
                <input inputMode="numeric" pattern="[0-9]{5}" placeholder={zipPlaceholder} required />
              </label>
            </div>
            <label>
              Referencias
              <textarea
                placeholder="Ej. Casa blanca, entre calle 8 y 10"
                required
                rows={3}
              />
            </label>

            <div className={styles.modalActions}>
              <button onClick={onClose} type="button">
                Cancelar
              </button>
              <button type="submit">
                Confirmar direccion
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.paymentOptions}>
            <button
              className={`${styles.paymentMethodButton} ${selectedPayment === "spei" ? styles.paymentSelected : ""}`}
              onClick={() => {
                setSelectedPayment("spei");
                setPaymentConfirmed(false);
              }}
              type="button"
            >
              <span className={styles.speiLogo}>SPEI</span>
              <strong>Via SPEI</strong>
              <em>Transferencia electronica</em>
            </button>
            <button
              className={`${styles.paymentMethodButton} ${selectedPayment === "oxxo" ? styles.paymentSelected : ""}`}
              onClick={() => {
                setSelectedPayment("oxxo");
                setPaymentConfirmed(false);
              }}
              type="button"
            >
              <span className={styles.oxxoLogo}>OXXO</span>
              <strong>Via OXXO</strong>
              <em>Pago en tienda participante</em>
            </button>

            {selectedPayment === "spei" ? (
              <details className={styles.paymentDetails} open>
                <summary>Datos para transferencia SPEI</summary>
                <dl>
                  <div>
                    <dt>CLABE</dt>
                    <dd>728969000088660555</dd>
                  </div>
                  <div>
                    <dt>Beneficiario</dt>
                    <dd>SAMS SRL</dd>
                  </div>
                </dl>
              </details>
            ) : null}

            {selectedPayment === "oxxo" ? (
              <div className={styles.paymentDetails}>
                <strong>Referencia OXXO</strong>
                <p>2242170100228614</p>
              </div>
            ) : null}

            {selectedPayment ? (
              <button
                className={styles.paymentActionButton}
                onClick={() => setPaymentConfirmed(true)}
                type="button"
              >
                Ya realice mi pago
              </button>
            ) : null}

            {paymentConfirmed ? (
              <p className={styles.paymentNotice}>
                Gracias por tu pago, te contactaremos via email para informarte cuando tus productos esten en camino.
              </p>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}

function CartItemRow({
  line,
  onRemove,
  onUpdate
}: {
  line: CartLine;
  onRemove: () => void;
  onUpdate: (qty: number) => void;
}) {
  const { product, qty } = line;
  const itemTotal = productSalePriceValue(product) * qty;
  const itemSubtotal = productOriginalPriceValue(product) * qty;
  const itemSavings = Math.max(0, itemSubtotal - itemTotal);

  return (
    <article className={styles.itemRow}>
      <div className={styles.itemMedia}>
        <span>{product.badge}</span>
        <Link href={productUrl(product)}>
          <Image
            alt={product.name}
            height={112}
            src={productImage(product.id)}
            width={112}
          />
        </Link>
      </div>

      <div className={styles.itemInfo}>
        <Link href={productUrl(product)}>{product.name}</Link>
        <p>Disponible para todos los metodos de envio</p>
        <strong>
          <span aria-hidden="true" /> {product.months}
        </strong>

        <div className={styles.itemLinks}>
          <button onClick={onRemove} type="button">Eliminar</button>
          <button onClick={onRemove} type="button">Guardar para despues</button>
        </div>
      </div>

      <div className={styles.itemPrice}>
        <strong>{formatCurrency(itemTotal)}</strong>
        <span>{formatCurrency(itemSubtotal)}</span>
        {itemSavings > 0 ? <em>Ahorra {formatCurrency(itemSavings)}</em> : null}

        <div className={styles.quantity}>
          <button
            aria-label={`Restar ${product.name}`}
            disabled={qty === 1}
            onClick={() => onUpdate(qty - 1)}
            type="button"
          >
            -
          </button>
          <span>{qty}</span>
          <button
            aria-label={`Sumar ${product.name}`}
            onClick={() => onUpdate(qty + 1)}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

function PickupIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 28 28">
      <path d="M5 16h16l2 4H4l1-4Z" fill="#0067a0" />
      <path d="M7 9h11l3 7H5l2-7Z" fill="#dff4ff" stroke="#0067a0" strokeWidth="1.5" />
      <path d="M10 12h5" stroke="#0067a0" strokeLinecap="round" strokeWidth="1.6" />
      <circle cx="9" cy="21" fill="#ffbe2e" r="2.2" />
      <circle cx="19" cy="21" fill="#ffbe2e" r="2.2" />
    </svg>
  );
}

function FastShippingIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 28 28">
      <path d="M7 20h12" stroke="#0067a0" strokeLinecap="round" strokeWidth="2" />
      <path d="M8 8h9v9H8V8Z" fill="#dff4ff" stroke="#0067a0" strokeWidth="1.5" />
      <path d="M17 12h4l3 5h-7v-5Z" fill="#ffffff" stroke="#0067a0" strokeWidth="1.5" />
      <path d="M4 10h3M3 14h4M5 18h2" stroke="#00a5df" strokeLinecap="round" strokeWidth="1.7" />
      <circle cx="10" cy="20" fill="#ffbe2e" r="2" />
      <circle cx="20" cy="20" fill="#ffbe2e" r="2" />
    </svg>
  );
}

function StandardShippingIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 28 28">
      <path d="M5 10h12v8H5v-8Z" fill="#dff4ff" stroke="#0067a0" strokeWidth="1.5" />
      <path d="M17 13h4l3 5h-7v-5Z" fill="#ffffff" stroke="#0067a0" strokeWidth="1.5" />
      <path d="M7 14h6" stroke="#0067a0" strokeLinecap="round" strokeWidth="1.5" />
      <circle cx="9" cy="20" fill="#ffbe2e" r="2" />
      <circle cx="20" cy="20" fill="#ffbe2e" r="2" />
    </svg>
  );
}

function CartSvg() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="25"
      viewBox="0 0 24 24"
      width="25"
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

function calculateTotals(lines: CartLine[]) {
  return lines.reduce(
    (totals, line) => {
      const subtotal = productOriginalPriceValue(line.product) * line.qty;
      const total = productSalePriceValue(line.product) * line.qty;

      return {
        subtotal: totals.subtotal + subtotal,
        savings: totals.savings + Math.max(0, subtotal - total),
        total: totals.total + total
      };
    },
    { subtotal: 0, savings: 0, total: 0 }
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    currency: "MXN",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: "currency"
  }).format(value);
}
