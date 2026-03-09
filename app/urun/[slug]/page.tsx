"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { getProductBySlug, DESEN_COLORS as LIB_DESEN_COLORS } from "@/lib/products";
import { useCart } from "@/lib/cartStore";
import { useFavorites } from "@/lib/favoritesStore";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("tr-TR").format(price) + " ₺";
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const [product, setProduct] = useState<{
    name: string;
    price: number;
    description: string;
    image_url: string;
    images: string[];
    desen: string;
    pattern: string;
    code: string;
    beden: string[];
  } | null>(null);
  const [notFoundState, setNotFoundState] = useState(false);
  const [selectedBeden, setSelectedBeden] = useState<string>("S-M");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addState, setAddState] = useState<"idle" | "added" | "no-beden">("idle");
  const [shareOpen, setShareOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!slug) return;
    const p = getProductBySlug(slug);
    if (p) {
      setProduct({
        name: p.name,
        price: p.price,
        description: p.description,
        image_url: p.image,
        images: p.images?.length ? p.images : [p.image],
        desen: p.desen,
        pattern: p.pattern ?? "",
        code: p.code ?? "",
        beden: p.beden ?? ["S-M", "M-L"],
      });
      setSelectedBeden((p.beden && p.beden.length > 0) ? p.beden[0] : "S-M");
    } else {
      setNotFoundState(true);
    }
  }, [slug]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [slug]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    }
    if (shareOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [shareOpen]);

  const getShareUrl = useCallback(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  const handleCopyLink = useCallback(async () => {
    const url = getShareUrl();
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch {
      /* fallback ignored */
    }
  }, [getShareUrl]);

  const images = product
    ? (product.images?.length ? product.images : [product.image_url])
    : [];
  const goPrev = useCallback(() => {
    setSelectedImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);
  const goNext = useCallback(() => {
    setSelectedImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  if (notFoundState) {
    notFound();
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[var(--cream)]">
        <div className="h-8 w-48 animate-pulse rounded bg-[var(--beige)]" />
      </div>
    );
  }

  const bedenOptions =
    product.beden && Array.isArray(product.beden) && product.beden.length > 0
      ? product.beden
      : ["S-M", "M-L"];

  const imageUrl =
    product.image_url ||
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80";

  const desenColor = product.desen
    ? LIB_DESEN_COLORS[product.desen as keyof typeof LIB_DESEN_COLORS]
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[var(--cream)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link
          href="/koleksiyon"
          className="mb-10 inline-flex items-center gap-2 border-b border-[var(--anthracite)]/40 pb-2 font-[family-name:var(--font-cormorant)] text-base font-medium tracking-[0.15em] text-[var(--anthracite)] transition-colors hover:border-[var(--anthracite)]"
        >
          ← Koleksiyona Dön
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-white lg:aspect-square lg:max-h-[600px]">
              <motion.div
                className="absolute inset-0 touch-pan-y"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  const threshold = 80;
                  if (info.velocity.x < -threshold) goNext();
                  else if (info.velocity.x > threshold) goPrev();
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={images[selectedImageIndex]}
                      alt={`${product.name} - ${selectedImageIndex + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority={selectedImageIndex === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--stone)] bg-[var(--cream)]/90 text-[var(--anthracite)] transition-opacity hover:opacity-90 sm:left-4"
                    aria-label="Önceki görsel"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--stone)] bg-[var(--cream)]/90 text-[var(--anthracite)] transition-opacity hover:opacity-90 sm:right-4"
                    aria-label="Sonraki görsel"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((src, idx) => (
                  <button
                    key={src + idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative h-16 w-16 min-w-16 shrink-0 overflow-hidden rounded-sm border-2 transition-colors ${
                      selectedImageIndex === idx
                        ? "border-[var(--anthracite)]"
                        : "border-[var(--stone)] hover:border-[var(--anthracite)]/60"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <div
              className="rounded-sm px-6 py-6"
              style={{
                backgroundColor: desenColor
                  ? `${desenColor}12`
                  : "rgba(234, 229, 220, 0.5)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <h1
                  className="font-[family-name:var(--font-playfair)] text-3xl font-light tracking-[0.15em] sm:text-4xl"
                  style={{ color: desenColor ?? "var(--anthracite)" }}
                >
                  {product.name}
                </h1>
                <div className="flex shrink-0 items-center gap-3" ref={shareRef}>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShareOpen((o) => !o);
                      }}
                      className="flex items-center gap-1.5 font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite)] underline transition-colors hover:opacity-80"
                      aria-label="Paylaş"
                      aria-expanded={shareOpen}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                      </svg>
                      Paylaş
                    </button>
                    <AnimatePresence>
                      {shareOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full z-20 mt-2 min-w-[180px] rounded-sm border border-[var(--stone)] bg-[var(--cream)] p-2 shadow-lg"
                        >
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(`${product.name} - ${getShareUrl()}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded px-3 py-2 text-left font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite)] transition-colors hover:bg-[var(--anthracite)]/5"
                            onClick={() => setShareOpen(false)}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp
                          </a>
                          <button
                            type="button"
                            onClick={async () => {
                              await handleCopyLink();
                              setShareOpen(false);
                            }}
                            className="flex w-full items-center gap-2 rounded px-3 py-2 text-left font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite)] transition-colors hover:bg-[var(--anthracite)]/5"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                            Instagram
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleCopyLink();
                              setShareOpen(false);
                            }}
                            className="flex w-full items-center gap-2 rounded px-3 py-2 text-left font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite)] transition-colors hover:bg-[var(--anthracite)]/5"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                            {copyFeedback ? "Kopyalandı ✓" : "Bağlantıyı kopyala"}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                <motion.button
                  type="button"
                  key={isFavorite(slug ?? "") ? "filled" : "outline"}
                  onClick={() =>
                    toggleFavorite({
                      id: slug ?? "",
                      slug: slug ?? "",
                      name: product.name,
                      price: product.price ?? 0,
                      image_url: product.image_url || images[0],
                    })
                  }
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  whileTap={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="shrink-0 text-[var(--anthracite)] transition-colors hover:opacity-80"
                  aria-label={isFavorite(slug ?? "") ? "Favorilerden çıkar" : "Favorilere ekle"}
                >
                  {isFavorite(slug ?? "") ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  )}
                </motion.button>
                </div>
              </div>
              <div
                className="mt-4 h-px w-16"
                style={{
                  backgroundColor: desenColor
                    ? desenColor
                    : "rgba(61, 61, 61, 0.3)",
                }}
                aria-hidden
              />
              <p
                className="mt-4 font-[family-name:var(--font-cormorant)] text-xl"
                style={{ color: desenColor ?? "var(--anthracite-soft)" }}
              >
                {product.price != null ? formatPrice(product.price) : "—"}
              </p>
            </div>

            {product.description && (
              <p className="mt-6 font-[family-name:var(--font-cormorant)] text-lg leading-relaxed text-[var(--anthracite-soft)]">
                {product.description}
              </p>
            )}

            {(product.desen || product.pattern || product.code) && (
              <div className="mt-6 space-y-2">
                {product.desen && (
                  <div>
                    <span
                      className="font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-wider"
                      style={{ color: desenColor ?? "var(--anthracite-soft)" }}
                    >
                      Desen:{" "}
                    </span>
                    <span
                      className="font-[family-name:var(--font-cormorant)] text-lg"
                      style={{ color: desenColor ?? "var(--anthracite)" }}
                    >
                      {product.desen}
                    </span>
                  </div>
                )}
                {product.pattern && (
                  <div>
                    <span className="font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-wider text-[var(--anthracite-soft)]">
                      Motif:{" "}
                    </span>
                    <span className="font-[family-name:var(--font-cormorant)] text-lg text-[var(--anthracite)]">
                      {product.pattern}
                    </span>
                  </div>
                )}
                {product.code && (
                  <div>
                    <span className="font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-wider text-[var(--anthracite-soft)]">
                      Ürün Kodu:{" "}
                    </span>
                    <span className="font-[family-name:var(--font-cormorant)] text-lg text-[var(--anthracite)]">
                      {product.code}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6">
              <span className="block font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-wider text-[var(--anthracite-soft)]">
                Beden
              </span>
              <div className="mt-3 flex gap-3">
                {bedenOptions.map((beden) => (
                  <button
                    key={beden}
                    type="button"
                    onClick={() => {
                      setSelectedBeden(beden);
                      setQuantity(1);
                    }}
                    className={`border px-5 py-3 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-wider transition-colors ${
                      selectedBeden === beden
                        ? "border-[var(--anthracite)] bg-[var(--anthracite)]/5 text-[var(--anthracite)]"
                        : "border-[var(--stone)] text-[var(--anthracite-soft)] hover:border-[var(--anthracite)]/60"
                    }`}
                  >
                    {beden}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-[var(--stone)]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center font-[family-name:var(--font-cormorant)] text-[var(--anthracite)] transition-colors hover:bg-[var(--anthracite)]/5"
                  aria-label="Azalt"
                >
                  −
                </button>
                <span className="flex h-11 min-w-[2.5rem] items-center justify-center border-x border-[var(--stone)] px-3 font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite)]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="flex h-11 w-11 items-center justify-center font-[family-name:var(--font-cormorant)] text-[var(--anthracite)] transition-colors hover:bg-[var(--anthracite)]/5"
                  aria-label="Artır"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (!selectedBeden) {
                  setAddState("no-beden");
                  setTimeout(() => setAddState("idle"), 2000);
                  return;
                }
                addItem({
                  id: `${slug}-${selectedBeden}`,
                  slug: slug ?? "",
                  name: product.name,
                  price: product.price ?? 0,
                  image_url: product.image_url || images[0],
                  beden: selectedBeden,
                  quantity,
                });
                setAddState("added");
                setTimeout(() => setAddState("idle"), 2000);
              }}
              className="mt-10 w-full bg-[var(--anthracite)] py-4 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.25em] text-[var(--cream)] transition-opacity hover:opacity-90"
            >
              {addState === "added"
                ? "Sepete Eklendi ✓"
                : addState === "no-beden"
                  ? "Lütfen beden seçin"
                  : "Sepete Ekle"}
            </button>
            <button
              type="button"
              onClick={() =>
                toggleFavorite({
                  id: slug ?? "",
                  slug: slug ?? "",
                  name: product.name,
                  price: product.price ?? 0,
                  image_url: product.image_url || images[0],
                })
              }
              className="mt-3 w-full border border-[var(--anthracite)]/40 py-3 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.25em] text-[var(--anthracite)] transition-colors hover:bg-[var(--anthracite)]/5"
            >
              {isFavorite(slug ?? "")
                ? "Favorilerde ✓"
                : "Favorilere Ekle"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
