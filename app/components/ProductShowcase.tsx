"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedProducts } from "@/lib/products";
import { useFavorites } from "@/lib/favoritesStore";


function formatPrice(centsOrLira: number): string {
  return new Intl.NumberFormat("tr-TR").format(centsOrLira) + " ₺";
}

export default function ProductShowcase() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const displayProducts = getFeaturedProducts().slice(0, 8).map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: formatPrice(p.price),
    priceNum: p.price,
    image: p.image,
  }));

  return (
    <section
      id="collection"
      className="relative overflow-hidden border-t border-[#d6d1c8]/50 bg-[#fcfaf7] py-20 sm:py-28 md:py-36"
    >
      {/* Elegant M monogram watermark */}
      <span
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-[10%] font-[family-name:var(--font-playfair)] text-[25vw] font-extralight leading-none text-[#3d3d3d] opacity-[0.06] sm:text-[22vw] md:text-[20vw]"
        style={{ letterSpacing: "0.2em" }}
        aria-hidden
      >
        M&apos;É
      </span>
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center font-[family-name:var(--font-playfair)] text-3xl font-light tracking-[0.2em] text-[#3d3d3d] sm:text-4xl"
        >
          Öne Çıkan Ürünler
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {displayProducts.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group"
              >
                <div
                  className="block overflow-hidden rounded-sm bg-white transition-shadow duration-500 hover:shadow-[0_20px_60px_-15px_rgba(61,61,61,0.12)]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        toggleFavorite({
                          id: product.slug || product.id,
                          slug: product.slug || "",
                          name: product.name,
                          price: product.priceNum,
                          image_url: product.image,
                        })
                      }
                      className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[var(--anthracite)] shadow-sm transition-colors hover:bg-white"
                      aria-label={isFavorite(product.slug || product.id) ? "Favorilerden çıkar" : "Favorilere ekle"}
                    >
                      {isFavorite(product.slug || product.id) ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                      )}
                    </button>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-medium text-[#3d3d3d]">
                      {product.name}
                    </h3>
                    <p className="mt-2 font-[family-name:var(--font-cormorant)] text-[#5a5a5a]">
                      {product.price}
                    </p>
                    <div className="mt-5">
                      <Link
                        href={product.slug ? `/urun/${product.slug}` : "/#collection"}
                        className="inline-block border border-[#3d3d3d]/40 px-4 py-2 text-xs uppercase tracking-wider text-[#3d3d3d] transition-colors hover:border-[#3d3d3d]"
                      >
                        İncele
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/koleksiyon"
            className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.2em] text-[#3d3d3d] transition-colors hover:text-[#5a5a5a]"
          >
            Koleksiyonu Keşfet →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
