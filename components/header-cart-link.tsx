"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  cartTotalItems,
  getStoredCart,
  type StoredCartItem
} from "@/lib/cart-storage";

export function HeaderCartLink({
  className,
  countClassName
}: {
  className: string;
  countClassName: string;
}) {
  const [cart, setCart] = useState<StoredCartItem[]>([]);
  const totalItems = useMemo(() => cartTotalItems(cart), [cart]);

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

  return (
    <Link
      aria-label={`Carrito con ${totalItems} articulos`}
      className={className}
      href="/cart"
    >
      <CartIcon />
      <span className={countClassName}>{totalItems}</span>
    </Link>
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
