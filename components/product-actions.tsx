"use client";

import { useState } from "react";
import { addProductToStoredCart } from "@/lib/cart-storage";
import type { Product } from "@/lib/sams-data";
import styles from "./product-actions.module.css";

export function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [feedback, setFeedback] = useState("");

  function addToCart() {
    addProductToStoredCart(product.id, quantity);
    setFeedback(
      `${quantity} ${quantity === 1 ? "articulo" : "articulos"} de ${product.brand} agregado${quantity === 1 ? "" : "s"} al carrito.`
    );
  }

  return (
    <div className={styles.actions}>
      <button
        aria-pressed={isFavorite}
        className={isFavorite ? `${styles.heart} ${styles.isActive}` : styles.heart}
        onClick={() => setIsFavorite((current) => !current)}
        type="button"
      >
        {isFavorite ? "En favoritos" : "Agregar a favoritos"}
      </button>

      <div className={styles.quantity} aria-label="Cantidad">
        <button
          aria-label="Restar cantidad"
          disabled={quantity === 1}
          onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          type="button"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          aria-label="Sumar cantidad"
          onClick={() => setQuantity((current) => current + 1)}
          type="button"
        >
          +
        </button>
      </div>

      <button className={styles.addButton} onClick={addToCart} type="button">
        Agregar
      </button>

      {feedback ? (
        <p className={styles.feedback} role="status">
          {feedback}
        </p>
      ) : null}

      <p className={styles.note}>
        Precio y disponibilidad pueden cambiar segun direccion y club seleccionado.
      </p>
    </div>
  );
}
