"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { collections } from "@/lib/collections";
import { getAllProducts } from "@/lib/products";

const CATEGORY_SECTIONS = [
  { key: "kimono", label: "Kimonolar", href: "/products/kimono" },
  { key: "gomlek", label: "Gömlekler & Kaftanlar", href: "/products/gomlek", extra: "kaftan" },
  { key: "bluz", label: "Bluzlar & Atletler", href: "/products/bluz", extra: "atlet" },
  { key: "pantolon", label: "Pantolonlar & Şortlar", href: "/products/pantolon", extra: "sort" },
  { key: "elbise", label: "Elbiseler", href: "/products/elbise" },
] as const;

function formatPrice(price: number) {
  return new Intl.NumberFormat("tr-TR").format(price) + " ₺";
}

const BASE = "/images/products/M_Éternelle Çekimler 161024";

export default function ProductsPage() {
  const allProducts = getAllProducts();

  return (
    <main className="overflow-x-hidden bg-[var(--cream)]">
      {/* Hero */}
      <section className="relative flex h-screen items-end overflow-hidden bg-[var(--anthracite)]">
        <div className="absolute inset-0">
          <Image
            src={`${BASE}/Méternelle Çekim0171-Edit.jpg`}
            alt="M'Éternelle Koleksiyon"
            fill
            priority
            className="object-cover object-center opacity-80"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--anthracite)]/80 via-[var(--anthracite)]/20 to-transparent" />
        </div>
        <div className="relative z-10 max-w-3xl px-6 pb-20 sm:px-12 md:pb-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 font-[family-name:var(--font-cormorant)] text-xs tracking-[0.3em] text-[var(--cream)]/70 uppercase"
          >
            Koleksiyon
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 font-[family-name:var(--font-playfair)] text-5xl font-light leading-tight text-[var(--cream)] md:text-7xl"
          >
            Zamanın Ötesinde
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg font-[family-name:var(--font-cormorant)] text-lg leading-relaxed text-[var(--cream)]/80"
          >
            M&apos;Éternelle, dört koleksiyonda dört farklı dünyayı bir araya getiriyor. Her desen bir hikaye, her kumaş bir felsefe.
          </motion.p>
        </div>
        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="font-[family-name:var(--font-cormorant)] text-xs tracking-[0.25em] text-[var(--cream)]/50 uppercase">Keşfet</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="h-5 w-px bg-[var(--cream)]/40"
          />
        </motion.div>
      </section>

      {/* Collection Spotlight */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 font-[family-name:var(--font-playfair)] text-3xl font-light tracking-wide text-[var(--anthracite)] md:text-4xl"
        >
          Koleksiyonlar
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden bg-white ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              {/* Color accent line */}
              <div className="h-0.5 w-full" style={{ background: col.color }} />

              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={col.heroImage}
                  alt={col.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div className="p-6">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-light text-[var(--anthracite)]">
                  {col.name}
                </h3>
                <p className="mt-1 font-[family-name:var(--font-cormorant)] text-sm tracking-wider text-[var(--anthracite)]/60">
                  {col.subtitle}
                </p>
                <p className="mt-3 font-[family-name:var(--font-cormorant)] text-sm italic leading-relaxed text-[var(--anthracite)]/70">
                  {col.philosophy}
                </p>
                <Link
                  href={`/koleksiyon?desen=${col.slug}`}
                  className="mt-4 inline-flex items-center gap-2 font-[family-name:var(--font-cormorant)] text-sm tracking-wider text-[var(--anthracite)] transition-opacity hover:opacity-70"
                  style={{ color: col.color }}
                >
                  Koleksiyonu Keşfet
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Category Sections */}
      {CATEGORY_SECTIONS.map((section, si) => {
        const categoryProducts = allProducts
          .filter((p) => p.category === section.key || ("extra" in section && p.category === section.extra))
          .slice(0, 4);
        if (categoryProducts.length === 0) return null;

        return (
          <section
            key={section.key}
            className={`py-20 ${si % 2 === 1 ? "bg-[var(--pastel-pink)]/20" : "bg-[var(--cream)]"}`}
          >
            <div className="mx-auto max-w-7xl px-6 sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10 flex items-end justify-between"
              >
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-light text-[var(--anthracite)] md:text-4xl">
                  {section.label}
                </h2>
                <Link
                  href={section.href}
                  className="flex items-center gap-2 font-[family-name:var(--font-cormorant)] text-sm tracking-wider text-[var(--anthracite)]/60 transition-colors hover:text-[var(--anthracite)]"
                >
                  Tümünü Gör
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {categoryProducts.map((product, pi) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: pi * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link href={`/urun/${product.slug}`} className="group block">
                      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--beige)]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width:768px) 50vw, 25vw"
                        />
                      </div>
                      <div className="mt-3 px-1">
                        <p className="font-[family-name:var(--font-cormorant)] text-base text-[var(--anthracite)] line-clamp-1">
                          {product.name}
                        </p>
                        <p className="mt-1 font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite)]/60">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Editorial Teaser */}
      <section className="grid md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex min-h-72 items-end overflow-hidden bg-[var(--anthracite)] p-10"
        >
          <div className="absolute inset-0">
            <Image
              src={`${BASE}/Méternelle Çekim0529-Edit.jpg`}
              alt="Kumaş Felsefesi"
              fill
              className="object-cover opacity-40"
              sizes="50vw"
            />
          </div>
          <div className="relative z-10">
            <p className="mb-2 font-[family-name:var(--font-cormorant)] text-xs tracking-[0.3em] text-[var(--cream)]/60 uppercase">Editöryal</p>
            <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-2xl font-light text-[var(--cream)]">Kumaş Felsefemiz</h3>
            <Link href="#" className="font-[family-name:var(--font-cormorant)] text-sm tracking-wider text-[var(--cream)]/70 transition-colors hover:text-[var(--cream)]">
              Devamını Oku →
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative flex min-h-72 items-end overflow-hidden bg-[var(--pastel-pink)] p-10"
        >
          <div className="absolute inset-0">
            <Image
              src={`${BASE}/Méternelle Çekim1349-Edit.jpg`}
              alt="Vegan Sertifikası"
              fill
              className="object-cover opacity-30"
              sizes="50vw"
            />
          </div>
          <div className="relative z-10">
            <p className="mb-2 font-[family-name:var(--font-cormorant)] text-xs tracking-[0.3em] text-[var(--anthracite)]/60 uppercase">Sürdürülebilirlik</p>
            <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-2xl font-light text-[var(--anthracite)]">Vegan Sertifikamız</h3>
            <Link href="#" className="font-[family-name:var(--font-cormorant)] text-sm tracking-wider text-[var(--anthracite)]/70 transition-colors hover:text-[var(--anthracite)]">
              Devamını Oku →
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
