import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";
import CartProvider from "./components/CartProvider";
import { FavoritesProvider } from "@/lib/favoritesStore";
import Navbar from "./components/Navbar";
import BodyClassHandler from "./components/BodyClassHandler";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "M'Éternelle | Touch the body and soul",
  description:
    "Bir dokunuş ruhunuzu sarabiliyorsa... M'Éternelle ile bedeninize ve ruhunuza dokunun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${cormorant.variable} ${playfair.variable} antialiased font-[family-name:var(--font-cormorant)]`}
        suppressHydrationWarning
      >
        <CartProvider>
          <FavoritesProvider>
            <BodyClassHandler />
            <Navbar />
            {children}
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
