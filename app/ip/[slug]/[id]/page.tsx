import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeaderCartLink } from "@/components/header-cart-link";
import { ProductActions } from "@/components/product-actions";
import {
  allProducts,
  findProductById,
  productOriginalPrice,
  productDetails,
  productImage,
  productSalePrice,
  productSaleSavings,
  productUrl,
  relatedProducts
} from "@/lib/sams-data";
import styles from "./product-page.module.css";

type ProductPageProps = {
  params: Promise<{
    slug: string;
    id: string;
  }>;
};

export function generateStaticParams() {
  return allProducts().map((product) => ({
    slug: product.slug,
    id: product.id
  }));
}

export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = findProductById(id);

  if (!product) {
    return {
      title: "Producto no encontrado | Sam's Club"
    };
  }

  return {
    title: `${product.name} | Sam's Club`,
    description: productDetails(product).description
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, id } = await params;
  const product = findProductById(id);

  if (!product || product.slug !== slug) {
    notFound();
  }

  const details = productDetails(product);
  const suggestions = relatedProducts(product);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link aria-label="Volver al inicio" className={styles.logo} href="/" prefetch={false}>
          <Image alt="Sam's Club" height={29} priority src="/sams.svg" width={171} />
        </Link>

        <nav className={styles.headerActions} aria-label="Acciones">
          <Link className={styles.backLink} href="/" prefetch={false}>
            Volver a Electronica y Computacion
          </Link>
          <HeaderCartLink
            className={styles.cartLink}
            countClassName={styles.cartCount}
          />
        </nav>
      </header>

      <nav className={styles.breadcrumb} aria-label="Ruta de navegacion">
        <Link href="/" prefetch={false}>Inicio</Link>
        <span>/</span>
        <Link href="/#mas-vendido" prefetch={false}>Electronica y Computacion</Link>
        <span>/</span>
        <strong>{product.brand}</strong>
      </nav>

      <section className={styles.productHero}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails} aria-label="Imagenes del producto">
            {[0, 1, 2].map((item) => (
              <button
                aria-label={`Vista ${item + 1} de ${product.name}`}
                className={item === 0 ? styles.thumbnailActive : styles.thumbnail}
                key={item}
                type="button"
              >
                <Image
                  alt=""
                  height={72}
                  src={productImage(product.id)}
                  width={72}
                />
              </button>
            ))}
          </div>

          <div className={styles.mainImage}>
            <Image
              alt={product.name}
              height={560}
              priority
              sizes="(max-width: 900px) 100vw, 520px"
              src={productImage(product.id)}
              width={560}
            />
          </div>
        </div>

        <aside className={styles.purchasePanel}>
          <div className={styles.badgeRow}>
            <span>{product.badge}</span>
            {product.rating ? <strong>Estrellas {product.rating}</strong> : null}
          </div>

          <p className={styles.brand}>{product.brand}</p>
          <h1>{product.name}</h1>
          <p className={styles.itemCode}>Articulo #{product.id}</p>

          <div className={styles.priceBlock}>
            <strong>{productSalePrice(product)}</strong>
            <span>{productOriginalPrice(product)}</span>
            <em>{productSaleSavings(product)}</em>
          </div>

          <p className={styles.months}>{product.months}</p>

          <div className={styles.fulfillment}>
            {product.fulfillment.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <ProductActions product={product} />
        </aside>
      </section>

      <section className={styles.infoGrid}>
        <article className={styles.infoPanel}>
          <p className={styles.eyebrow}>Descripcion</p>
          <h2>Detalles del producto</h2>
          <p>{details.description}</p>
        </article>

        <article className={styles.infoPanel}>
          <p className={styles.eyebrow}>Beneficios</p>
          <h2>Lo mas importante</h2>
          <ul>
            {details.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>

        <article className={styles.infoPanel}>
          <p className={styles.eyebrow}>Especificaciones</p>
          <h2>Ficha tecnica</h2>
          <dl className={styles.specs}>
            {details.specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className={styles.infoPanel}>
          <p className={styles.eyebrow}>Entrega</p>
          <h2>Recibe como prefieras</h2>
          <div className={styles.deliveryOptions}>
            <span>Envio a domicilio</span>
            <span>Club Pickup</span>
            <span>Entrega rapida en productos participantes</span>
          </div>
        </article>
      </section>

      <section className={styles.relatedSection}>
        <div className={styles.relatedHeading}>
          <p className={styles.eyebrow}>Tambien podria gustarte</p>
          <h2>Productos relacionados</h2>
        </div>

        <div className={styles.relatedGrid}>
          {suggestions.map((item) => (
            <Link className={styles.relatedCard} href={productUrl(item)} key={item.id}>
              <Image
                alt={item.name}
                height={160}
                loading="lazy"
                src={productImage(item.id)}
                width={160}
              />
              <span>{item.brand}</span>
              <strong>{item.name}</strong>
              <em>{productSalePrice(item)}</em>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
