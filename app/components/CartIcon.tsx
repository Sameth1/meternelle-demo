"use client";

import Link from "next/link";
import { useCart } from "@/lib/cartStore";

export default function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/sepet"
      aria-label={`Sepet (${itemCount} ürün)`}
      className="fixed top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--anthracite)] text-[var(--cream)] transition-opacity hover:opacity-90"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--cream)] px-1.5 text-xs font-medium text-[var(--anthracite)]">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}
