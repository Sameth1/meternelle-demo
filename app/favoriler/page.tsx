"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cartStore";
import { useFavorites } from "@/lib/favoritesStore";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("tr-TR").format(price) + " ₺";
}

export default function FavorilerPage() {
  const { addItem, lastAddedSlug } = useCart();
  const { items, removeFavorite } = useFavorites();
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[var(--cream)]"
    >
      <div className="bg-[var(--anthracite)] px-4 py-20 sm:px-6 sm:py-24 md:py-28">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-center font-[family-name:var(--font-playfair)] text-3xl font-light tracking-[0.2em] text-[var(--cream)] sm:text-4xl">
            Favoriler
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <p className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--anthracite-soft)]">
              Henüz favori eklemediniz
            </p>
            <Link
              href="/koleksiyon"
              className="mt-6 font-[family-name:var(--font-cormorant)] text-sm tracking-[0.15em] text-[var(--anthracite)] underline transition-colors hover:text-[var(--anthracite-soft)]"
            >
              Koleksiyona Git
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-8 lg:grid-cols-4">
            {items.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group"
              >
                <div className="block overflow-hidden rounded-sm bg-white">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxImage({ src: product.image_url, alt: product.name })
                      }
                      className="absolute inset-0 w-full cursor-zoom-in"
                    >
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFavorite(product.id)}
                      className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[var(--anthracite)] shadow-sm transition-colors hover:bg-white"
                      aria-label="Favorilerden çıkar"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="font-[family-name:var(--font-cormorant)] text-base font-medium text-[var(--anthracite)] sm:text-lg">
                      {product.name}
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-cormorant)] text-[var(--anthracite-soft)] sm:mt-2">
                      {formatPrice(product.price)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link
                        href={`/urun/${product.slug}`}
                        className="inline-block border border-[var(--anthracite)]/40 px-4 py-2 text-xs uppercase tracking-wider text-[var(--anthracite)] transition-colors hover:border-[var(--anthracite)]"
                      >
                        İncele
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          addItem({
                            id: `${product.slug}-S-M`,
                            slug: product.slug,
                            name: product.name,
                            price: product.price,
                            image_url: product.image_url,
                            beden: "S-M",
                            quantity: 1,
                          })
                        }
                        className="border border-[var(--anthracite)]/40 bg-[var(--anthracite)] px-4 py-2 text-xs uppercase tracking-wider text-[var(--cream)] transition-colors hover:opacity-90"
                      >
                        {lastAddedSlug === product.slug
                          ? "Sepete Eklendi ✓"
                          : "Sepete Ekle"}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFavorite(product.id)}
                        className="font-[family-name:var(--font-cormorant)] text-xs text-[var(--anthracite-soft)] underline hover:text-[var(--anthracite)]"
                      >
                        Favorilerden çıkar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {lightboxImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
                onClick={() => setLightboxImage(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative max-h-[90vh] max-w-[90vw]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={lightboxImage.src}
                    alt={lightboxImage.alt}
                    width={1200}
                    height={1600}
                    className="max-h-[90vh] w-auto object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setLightboxImage(null)}
                    className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[var(--anthracite)] transition-colors hover:bg-white"
                    aria-label="Kapat"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </motion.main>
  );
}
