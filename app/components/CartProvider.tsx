"use client";

import { CartProvider as CartStoreProvider } from "@/lib/cartStore";

export { useCart } from "@/lib/cartStore";

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartStoreProvider>{children}</CartStoreProvider>;
}
