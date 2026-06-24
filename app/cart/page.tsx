import type { Metadata } from "next";
import { CartPage } from "@/components/cart-page";

export const metadata: Metadata = {
  title: "Carrito | Sam's Club",
  description: "Carrito de compras con productos agregados."
};

export default function Page() {
  return <CartPage />;
}
