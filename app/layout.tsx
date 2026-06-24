import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Electronica y Computacion | Sam's Club",
  description: "Replica frontend de la seccion Electronica y Computacion de Sam's Club Mexico."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
