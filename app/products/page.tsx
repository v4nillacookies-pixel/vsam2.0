import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  allProducts,
  productOriginalPrice,
  productImage,
  productSalePrice,
  productSaleSavings,
  productUrl
} from "@/lib/sams-data";
import styles from "./products-page.module.css";

export const metadata: Metadata = {
  title: "Todos los productos | Sam's Club",
  description: "Catalogo completo de productos de Electronica y Computacion."
};

export default function ProductsPage() {
  const products = allProducts();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link aria-label="Sam's Club inicio" className={styles.logo} href="/">
          <Image alt="Sam's Club" height={29} priority src="/sams.svg" width={171} />
        </Link>

        <Link className={styles.backLink} href="/">
          Volver al inicio
        </Link>
      </header>

      <section className={styles.heading}>
        <p>Electronica y Computacion</p>
        <h1>Todos los productos</h1>
        <span>{products.length} productos disponibles</span>
      </section>

      <section className={styles.grid} aria-label="Catalogo de productos">
        {products.map((product) => (
          <Link className={styles.card} href={productUrl(product)} key={product.id}>
            <span className={styles.badge}>{product.badge}</span>
            <Image
              alt={product.name}
              height={220}
              loading="lazy"
              src={productImage(product.id)}
              width={220}
            />
            <p>{product.brand}</p>
            <strong>{product.name}</strong>
            <div className={styles.price}>
              <span>{productSalePrice(product)}</span>
              <em>{productOriginalPrice(product)}</em>
            </div>
            <small>{productSaleSavings(product)}</small>
          </Link>
        ))}
      </section>
    </main>
  );
}
