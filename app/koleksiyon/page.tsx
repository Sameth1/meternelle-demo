"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { createPortal } from "react-dom";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { getAllProducts } from "@/lib/products";
import { collections } from "@/lib/collections";
import { useCart } from "@/lib/cartStore";
import { useFavorites } from "@/lib/favoritesStore";

const DESEN_OPTIONS = ["viridis", "pavo", "vas", "rosea", "monogram"] as const;

const DESEN_COLORS: Record<(typeof DESEN_OPTIONS)[number], string> = {
  viridis: "#1a4a3a",
  pavo: "#e8956d",
  vas: "#b8a8c8",
  rosea: "#c8356a",
  monogram: "#2c2c2c",
};
const CATEGORY_OPTIONS = [
  "şort",
  "atlet",
  "bluz",
  "kimono",
  "kaftan",
  "elbise",
  "gömlek",
  "pantolon",
] as const;

const FILTER_TO_DESEN: Record<string, string> = { pavo: "PAV", vas: "VAS", viridis: "VİRİDİS", rosea: "ROSEA", monogram: "MONOGRAM" };
const FILTER_TO_CATEGORY: Record<string, string> = { "şort": "sort", "gömlek": "gomlek", "kimono": "kimono", "kaftan": "kaftan", "bluz": "bluz", "atlet": "atlet", "elbise": "elbise", "pantolon": "pantolon" };

function parseFiltersFromUrl(searchParams: URLSearchParams): { desen: string[]; category: string[] } {
  const desen = (searchParams.get("desen") ?? "").split(",").filter((v) => DESEN_OPTIONS.includes(v as (typeof DESEN_OPTIONS)[number]));
  const category = (searchParams.get("kategori") ?? "").split(",").filter((v) => CATEGORY_OPTIONS.includes(v as (typeof CATEGORY_OPTIONS)[number]));
  return { desen, category };
}

type DisplayProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image_url: string;
  desen: string;
  category: string;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("tr-TR").format(price) + " ₺";
}

function ProductCardSkeleton() {
  return (
    <div className="block overflow-hidden rounded-sm bg-white">
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-sm bg-[var(--beige)] animate-pulse" />
      <div className="p-6">
        <div className="h-5 w-3/4 rounded bg-[var(--beige)] animate-pulse" />
        <div className="mt-2 h-4 w-1/3 rounded bg-[var(--beige)] animate-pulse" />
        <div className="mt-5 h-9 w-20 rounded bg-[var(--beige)] animate-pulse" />
      </div>
    </div>
  );
}

function KoleksiyonContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [desenFilter, setDesenFilter] = useState<string[]>(() => parseFiltersFromUrl(searchParams).desen);
  const [categoryFilter, setCategoryFilter] = useState<string[]>(() => parseFiltersFromUrl(searchParams).category);
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const { addItem, lastAddedSlug } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const products = useMemo<DisplayProduct[]>(() => {
    return getAllProducts().map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      price: p.price,
      image_url: p.image,
      desen: p.desen,
      category: p.category,
    }));
  }, []);

  useEffect(() => {
    const nav = performance.getEntriesByType?.("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type !== "back_forward") {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (desenFilter.length) params.set("desen", desenFilter.join(","));
    if (categoryFilter.length) params.set("kategori", categoryFilter.join(","));
    const qs = params.toString();
    const url = qs ? `/koleksiyon?${qs}` : "/koleksiyon";
    if (typeof window !== "undefined" && window.location.pathname + (window.location.search || "") !== url) {
      router.replace(url, { scroll: false });
    }
  }, [desenFilter, categoryFilter, router]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchDesen =
        desenFilter.length === 0 ||
        desenFilter.some((f) => p.desen === FILTER_TO_DESEN[f]);
      const matchCategory =
        categoryFilter.length === 0 ||
        categoryFilter.some((f) => p.category === FILTER_TO_CATEGORY[f]);
      return matchDesen && matchCategory;
    });
  }, [products, desenFilter, categoryFilter]);

  const resetFilters = () => {
    setDesenFilter([]);
    setCategoryFilter([]);
  };

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
      className="relative min-h-screen bg-[var(--cream)]"
    >
      {/* Sabit M'É watermark - ana sayfadaki gibi sağda, scroll ile hareket etmez */}
      <div
        className="pointer-events-none fixed inset-0 z-0 flex items-center justify-end pr-[5%]"
        aria-hidden
      >
        <span
          className="font-[family-name:var(--font-playfair)] text-[25vw] font-extralight tracking-[0.15em] text-[var(--anthracite)]"
          style={{ opacity: 0.035 }}
        >
          M&apos;É
        </span>
      </div>
      {/* Dark header section */}
      <div className="bg-[var(--anthracite)] px-4 pt-20 pb-0 sm:px-6 sm:pt-24 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-center font-[family-name:var(--font-playfair)] text-3xl font-light tracking-[0.2em] text-[var(--cream)] sm:text-4xl">
            Koleksiyon
          </h1>
        </div>
      </div>

      {/* Collection Spotlight — shown when a single desen filter is active */}
      <AnimatePresence>
        {desenFilter.length === 1 && (() => {
          const col = collections.find(c => c.slug === desenFilter[0]);
          if (!col) return null;
          return (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden bg-[var(--anthracite)]"
            >
              <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
                <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                  {/* Gallery */}
                  <div className="grid grid-cols-2 gap-2">
                    {col.galleryImages.slice(0, 4).map((img, gi) => (
                      <div key={gi} className={`relative overflow-hidden ${gi === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[3/4]"}`}>
                        <Image
                          src={img}
                          alt={`${col.name} ${gi + 1}`}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width:768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Text */}
                  <div className="py-6">
                    <div className="mb-3 h-px w-12" style={{ background: col.color }} />
                    <h2 className="mb-1 font-[family-name:var(--font-playfair)] text-4xl font-light text-[var(--cream)] md:text-5xl">
                      {col.name}
                    </h2>
                    <p className="mb-5 font-[family-name:var(--font-cormorant)] text-sm tracking-widest text-[var(--cream)]/50 uppercase">
                      {col.subtitle}
                    </p>
                    <p className="mb-6 font-[family-name:var(--font-cormorant)] text-base leading-relaxed text-[var(--cream)]/70 md:text-lg">
                      {col.description}
                    </p>
                    <p className="font-[family-name:var(--font-cormorant)] text-base italic text-[var(--cream)]/50">
                      &ldquo;{col.philosophy}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      <div className="bg-[var(--anthracite)] pb-8" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Filters */}
        <div className="relative z-10 mb-10 space-y-6 md:mb-14">
          <div>
            <p className="mb-2 font-[family-name:var(--font-cormorant)] text-xs uppercase tracking-wider text-[var(--anthracite-soft)]">
              Desen
            </p>
            <div className="flex flex-wrap gap-2">
              <motion.button
                type="button"
                onClick={resetFilters}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`border px-4 py-2 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-wider transition-colors ${
                  desenFilter.length === 0 && categoryFilter.length === 0
                    ? "border-[var(--anthracite)] bg-[var(--anthracite)] text-[var(--cream)]"
                    : "border-[var(--stone)] text-[var(--anthracite-soft)] hover:border-[var(--anthracite)]/60"
                }`}
              >
                Tümü
              </motion.button>
              <motion.button
                type="button"
                onClick={resetFilters}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border border-[var(--stone)] px-4 py-2 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-wider text-[var(--anthracite-soft)] transition-colors hover:border-[var(--anthracite)]/60"
              >
                Temizle
              </motion.button>
              {DESEN_OPTIONS.map((d) => {
                const color = DESEN_COLORS[d];
                const isActive = desenFilter.includes(d);
                return (
                  <motion.button
                    key={d}
                    type="button"
                    onClick={() =>
                      setDesenFilter((prev) =>
                        prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
                      )
                    }
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border px-4 py-2 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-wider transition-colors"
                    style={{
                      borderColor: color,
                      backgroundColor: isActive ? color : "transparent",
                      color: isActive ? "white" : color,
                    }}
                  >
                    {d}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 font-[family-name:var(--font-cormorant)] text-xs uppercase tracking-wider text-[var(--anthracite-soft)]">
              Kategori
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((c) => (
                <motion.button
                  key={c}
                  type="button"
                  onClick={() =>
                    setCategoryFilter((prev) =>
                      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
                    )
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`border px-4 py-2 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-wider transition-colors ${
                    categoryFilter.includes(c)
                      ? "border-[var(--anthracite)] bg-[var(--anthracite)] text-[var(--cream)]"
                      : "border-[var(--stone)] text-[var(--anthracite-soft)] hover:border-[var(--anthracite)]/60"
                  }`}
                >
                  {c}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Product count */}
        <p className="relative z-10 mb-8 font-[family-name:var(--font-cormorant)] text-sm tracking-[0.1em] text-[var(--anthracite-soft)]">
          {filteredProducts.length} ürün gösteriliyor
        </p>

        {/* Product grid with M'É between every 2 rows of 4, on the right */}
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key={`${desenFilter.join(",")}-${categoryFilter.join(",")}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-16 md:space-y-24"
              >
                {(() => {
                  const groups: DisplayProduct[][] = [];
                  for (let i = 0; i < filteredProducts.length; i += 8) {
                    groups.push(filteredProducts.slice(i, i + 8));
                  }
                  return groups.map((group, gi) => (
                    <div key={gi} className="relative">
                      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-8 lg:grid-cols-4">
                        {group.map((product, index) => (
                          <motion.article
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: (gi * 8 + index) * 0.05,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="group"
                          >
                            <div className="block overflow-hidden rounded-sm bg-white">
                              <div className="relative aspect-[3/4] w-full">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setLightboxImage({
                                      src: product.image_url,
                                      alt: product.name,
                                    })
                                  }
                                  className="absolute inset-0 w-full cursor-zoom-in overflow-hidden"
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
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite({
                                      id: product.slug,
                                      slug: product.slug,
                                      name: product.name,
                                      price: product.price,
                                      image_url: product.image_url,
                                    });
                                  }}
                                  className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[var(--anthracite)] shadow-sm transition-colors hover:bg-white"
                                  aria-label={isFavorite(product.slug) ? "Favorilerden çıkar" : "Favorilere ekle"}
                                >
                                    {isFavorite(product.slug) ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                  ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                  )}
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
                                </div>
                              </div>
                            </div>
                          </motion.article>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-[family-name:var(--font-cormorant)] text-lg text-[var(--anthracite-soft)]"
              >
                Bu filtrelerle eşleşen ürün bulunamadı.
              </motion.p>
            )}
          </AnimatePresence>
      </div>

      {/* Image lightbox - portal to body for correct fixed positioning */}
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
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

export default function KoleksiyonPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--cream)]" />}>
      <KoleksiyonContent />
    </Suspense>
  );
}
