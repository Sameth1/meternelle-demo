"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/lib/cartStore";
import { useFavorites } from "@/lib/favoritesStore";

const SHIPPING_FREE_THRESHOLD = 5000;
const SHIPPING_COST = 299;

const FALLBACK_RECOMMENDED = [
  { id: "1", slug: "ipek-uyku-bandi", name: "İpek Uyku Bandı", price: 2400, image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", beden: ["S-M", "M-L"] as string[] },
  { id: "2", slug: "saten-maske-seti", name: "Saten Maske Seti", price: 1890, image_url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80", beden: ["S-M", "M-L"] as string[] },
  { id: "3", slug: "luks-bakim-koleksiyonu", name: "Lüks Bakım Koleksiyonu", price: 3200, image_url: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80", beden: ["S-M", "M-L"] as string[] },
  { id: "4", slug: "yastik-kilifi-band-seti", name: "Yastık Kılıfı & Band Seti", price: 4500, image_url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80", beden: ["S-M", "M-L"] as string[] },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat("tr-TR").format(price) + " ₺";
}

type RecommendedProduct = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image_url: string;
  beden: string[];
};

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function SepetPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const { addFavorite, toggleFavorite, isFavorite } = useFavorites();
  const [recommended, setRecommended] = useState<RecommendedProduct[]>([]);
  const [recommendedLoading, setRecommendedLoading] = useState(true);
  const [recommendedOffset, setRecommendedOffset] = useState(0);
  const CARD_W = 180;
  const GAP = 16;
  const STEP = CARD_W + GAP;

  const maxOffset = Math.max(0, recommended.length - 4);
  const goPrev = () => setRecommendedOffset((o) => Math.max(0, o - 1));
  const goNext = () => setRecommendedOffset((o) => Math.min(maxOffset, o + 1));

  const cartSlugs = useMemo(() => new Set(items.map((i) => i.slug)), [items]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    async function fetchRecommended() {
      const { data, error } = await supabase.from("products").select("id, slug, name, price, image_url, beden");
      if (error || !data || data.length === 0) {
        setRecommended(FALLBACK_RECOMMENDED);
      } else {
        const mapped = data
          .filter((p) => p.slug && !cartSlugs.has(p.slug))
          .map((p) => ({
            id: p.id,
            slug: p.slug ?? "",
            name: p.name,
            price: (p.price ?? 0) as number,
            image_url: p.image_url ?? FALLBACK_RECOMMENDED[0].image_url,
            beden: Array.isArray(p.beden) && p.beden.length > 0 ? p.beden : ["S-M", "M-L"],
          }));
        const shuffled = shuffleArray(mapped);
        setRecommended(shuffled.slice(0, 12));
      }
      setRecommendedLoading(false);
    }
    fetchRecommended();
  }, [cartSlugs]);

  if (items.length === 0) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-[70vh] flex-col items-center justify-center bg-[var(--cream)] px-6 py-16"
      >
        <h1 className="mb-4 font-[family-name:var(--font-playfair)] text-2xl font-light tracking-[0.15em] text-[var(--anthracite)] sm:text-3xl">
          Sepetiniz boş
        </h1>
        <Link
          href="/"
          className="font-[family-name:var(--font-cormorant)] text-[var(--anthracite-soft)] underline transition-colors hover:text-[var(--anthracite)]"
        >
          Alışverişe başlayın
        </Link>
      </motion.main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[var(--cream)]"
    >
      <div className="bg-[var(--anthracite)] px-4 py-20 sm:px-6 sm:py-24 md:py-28">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-center font-[family-name:var(--font-playfair)] text-3xl font-light tracking-[0.2em] text-[var(--cream)] sm:text-4xl">
            Sepetim
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ul className="space-y-4">
              {items.map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 border-b border-[var(--stone)]/40 pb-4 last:border-0"
                >
                  <Link
                    href={`/urun/${item.slug}`}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm bg-white"
                  >
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <Link
                        href={`/urun/${item.slug}`}
                        className="font-[family-name:var(--font-cormorant)] text-base font-medium text-[var(--anthracite)] transition-colors hover:text-[var(--anthracite-soft)]"
                      >
                        {item.name}
                      </Link>
                      <p className="font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite-soft)]">
                        Beden: {item.beden}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-[var(--stone)]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-9 w-9 items-center justify-center font-[family-name:var(--font-cormorant)] text-[var(--anthracite)] transition-colors hover:bg-[var(--anthracite)]/5"
                          aria-label="Azalt"
                        >
                          −
                        </button>
                        <span className="flex h-9 min-w-9 items-center justify-center font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite)]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-9 w-9 items-center justify-center font-[family-name:var(--font-cormorant)] text-[var(--anthracite)] transition-colors hover:bg-[var(--anthracite)]/5"
                          aria-label="Artır"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-[family-name:var(--font-cormorant)] text-sm font-medium text-[var(--anthracite)]">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            toggleFavorite({
                              id: item.slug,
                              slug: item.slug,
                              name: item.name,
                              price: item.price,
                              image_url: item.image_url,
                            })
                          }
                          className="flex h-9 w-9 shrink-0 items-center justify-center text-[var(--anthracite)] transition-colors hover:text-[var(--anthracite-soft)]"
                          aria-label={isFavorite(item.slug) ? "Favorilerden çıkar" : "Favorilere ekle"}
                        >
                          {isFavorite(item.slug) ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center text-[var(--anthracite-soft)] transition-colors hover:text-[var(--anthracite)]"
                          aria-label="Sepetten kaldır"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-sm border border-[var(--stone)]/50 bg-[var(--beige)] p-6">
              <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-light tracking-[0.15em] text-[var(--anthracite)]">
                Sipariş Özeti
              </h2>
              <p className="mb-3 font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite-soft)]">
                {itemCount} ürün
              </p>
              <div className="space-y-2 font-[family-name:var(--font-cormorant)] text-[var(--anthracite-soft)]">
                <div className="flex justify-between">
                  <span>Ara toplam</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kargo</span>
                  <span>{shipping === 0 ? "Ücretsiz" : formatPrice(shipping)}</span>
                </div>
              </div>
              <div className="mt-3 flex justify-between border-t border-[var(--stone)]/50 pt-3 font-[family-name:var(--font-cormorant)] text-lg font-medium text-[var(--anthracite)]">
                <span>Toplam</span>
                <span>{formatPrice(total)}</span>
              </div>
              {shipping > 0 && (
                <p className="mt-2 font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite-soft)]">
                  {formatPrice(SHIPPING_FREE_THRESHOLD - subtotal)} daha alışveriş yaparak ücretsiz kargo
                </p>
              )}
              <div className="mt-4 flex min-w-0 gap-2">
                <input
                  type="text"
                  placeholder="Promosyon kodu"
                  className="min-w-0 flex-1 border border-[var(--stone)] bg-white px-3 py-2 font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite)] placeholder:text-[var(--anthracite-soft)]"
                  aria-label="Promosyon kodu"
                />
                <button
                  type="button"
                  className="shrink-0 border border-[var(--anthracite)]/40 px-4 py-2 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-wider text-[var(--anthracite)] transition-colors hover:bg-[var(--anthracite)]/5"
                >
                  Uygula
                </button>
              </div>
              <Link
                href="/"
                className="mt-6 block text-center font-[family-name:var(--font-cormorant)] text-sm tracking-[0.15em] text-[var(--anthracite-soft)] underline transition-colors hover:text-[var(--anthracite)]"
              >
                Alışverişe Devam Et
              </Link>
              <button
                type="button"
                disabled
                className="mt-4 w-full cursor-not-allowed bg-[var(--anthracite)]/60 py-4 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.25em] text-[var(--cream)]"
              >
                Ödemeye Geç
              </button>
            </div>
          </div>
        </div>

        {recommended.length > 0 && (
          <section className="relative mt-16">
            <h2 className="mb-6 font-[family-name:var(--font-playfair)] text-xl font-light tracking-[0.15em] text-[var(--anthracite)] sm:text-2xl">
              Bunları da beğenebilirsiniz
            </h2>
            {recommendedLoading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse rounded-sm bg-[var(--beige)]">
                    <div className="aspect-[3/4] rounded-t-sm bg-[var(--stone)]/30" />
                    <div className="p-4">
                      <div className="h-4 w-3/4 rounded bg-[var(--stone)]/30" />
                      <div className="mt-2 h-4 w-1/3 rounded bg-[var(--stone)]/30" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative flex items-center gap-2 md:gap-4">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={recommendedOffset === 0}
                  className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--anthracite)]/60 transition-colors hover:text-[var(--anthracite)] disabled:opacity-30"
                  aria-label="Önceki"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <div className="min-w-0 flex-1 overflow-hidden" style={{ maxWidth: 4 * CARD_W + 3 * GAP }}>
                  <motion.div
                    className="flex gap-4"
                    animate={{ x: -recommendedOffset * STEP }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {recommended.map((product) => (
                      <article
                        key={product.id}
                        className="group flex w-[180px] shrink-0 flex-col overflow-hidden rounded-sm bg-white"
                      >
                        <Link
                          href={`/urun/${product.slug}`}
                          className="relative block aspect-[3/4] w-full overflow-hidden"
                        >
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            sizes="180px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFavorite({
                                id: product.slug,
                                slug: product.slug,
                                name: product.name,
                                price: product.price,
                                image_url: product.image_url,
                              });
                            }}
                            className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[var(--anthracite)] transition-colors hover:bg-white"
                            aria-label={isFavorite(product.slug) ? "Favorilerden çıkar" : "Favorilere ekle"}
                          >
                            {isFavorite(product.slug) ? (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                              </svg>
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                              </svg>
                            )}
                          </button>
                        </Link>
                        <div className="flex flex-col p-4">
                          <Link
                            href={`/urun/${product.slug}`}
                            className="font-[family-name:var(--font-cormorant)] text-base font-medium text-[var(--anthracite)] transition-colors hover:text-[var(--anthracite-soft)]"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-1 font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite-soft)]">
                            {formatPrice(product.price)}
                          </p>
                          <Link
                            href={`/urun/${product.slug}`}
                            className="mt-3 inline-block w-fit border border-[var(--anthracite)]/40 px-4 py-2 font-[family-name:var(--font-cormorant)] text-xs uppercase tracking-wider text-[var(--anthracite)] transition-colors hover:bg-[var(--anthracite)] hover:text-[var(--cream)]"
                          >
                            İncele
                          </Link>
                        </div>
                      </article>
                    ))}
                  </motion.div>
                </div>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={recommendedOffset >= maxOffset}
                  className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--anthracite)]/60 transition-colors hover:text-[var(--anthracite)] disabled:opacity-30"
                  aria-label="Sonraki"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </motion.main>
  );
}
