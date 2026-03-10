"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { collections } from "@/lib/collections";

const BASE = "/images/products/cekimler";

const CATEGORY_STORIES = [
  {
    key: "kimono",
    label: "Kimono",
    href: "/products/kimono",
    image: `${BASE}/Méternelle Çekim0171-Edit.jpg`,
    text: "Doğu zarafeti, Batı özgürlüğü. Her sabah giyildiğinde bir ritüel.",
  },
  {
    key: "gomlek",
    label: "Gömlek & Kaftan",
    href: "/products/gomlek",
    image: `${BASE}/Méternelle Çekim0378-Edit.jpg`,
    text: "Hakim yaka, gücün sessiz ifadesidir.",
  },
  {
    key: "elbise",
    label: "Elbise",
    href: "/products/elbise",
    image: `${BASE}/Méternelle Çekim1254-Edit.jpg`,
    text: "Bir elbise giymek, bir karar vermektir.",
  },
  {
    key: "pantolon",
    label: "Pantolon & Şort",
    href: "/products/pantolon",
    image: `${BASE}/Méternelle Çekim0639-Edit.jpg`,
    text: "Geniş paçalı pantolonun her adımda yarattığı dalga — zamanı yavaşlatır.",
  },
  {
    key: "bluz",
    label: "Bluz & Atlet",
    href: "/products/bluz",
    image: `${BASE}/Méternelle Çekim1460-Edit.jpg`,
    text: "En saf form. Minimalizmi lükse dönüştüren kesim.",
  },
];

export default function ProductsPage() {
  return (
    <main className="overflow-x-hidden bg-[var(--anthracite)]">

      {/* ── Sinematik Hero ─────────────────────────────────────────── */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <Image
          src={`${BASE}/Méternelle Çekim0171-Edit.jpg`}
          alt="M'Éternelle"
          fill
          priority
          className="object-cover object-center opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        <div className="relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 font-[family-name:var(--font-cormorant)] text-xs tracking-[0.4em] text-[var(--cream)]/60 uppercase"
          >
            M&apos;Éternelle
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-playfair)] text-5xl font-extralight tracking-[0.12em] text-[var(--cream)] md:text-7xl lg:text-8xl"
          >
            Zamanın Ötesinde
          </motion.h1>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="font-[family-name:var(--font-cormorant)] text-[10px] uppercase tracking-[0.4em] text-[var(--cream)]/40">Scroll</span>
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="block h-8 w-px bg-[var(--cream)]/30"
          />
        </motion.div>
      </section>

      {/* ── Manifesto Strip ─────────────────────────────────────────── */}
      <section className="py-28">
        <div className="mx-auto max-w-4xl px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-cormorant)] text-2xl font-light italic leading-relaxed text-[var(--cream)]/70 md:text-3xl"
          >
            &ldquo;Beş koleksiyonda beş farklı kadın hikayesi.
            <br className="hidden md:block" />
            Her desen bir manifesto, her kumaş bir felsefe.&rdquo;
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 h-px w-16 origin-center bg-[var(--cream)]/20"
          />
        </div>
      </section>

      {/* ── Koleksiyon Hikayeleri — alternating full-bleed editorial ── */}
      {collections.map((col, i) => (
        <motion.section
          key={col.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`grid min-h-[80vh] ${i % 2 === 0 ? "md:grid-cols-[55fr_45fr]" : "md:grid-cols-[45fr_55fr]"}`}
        >
          {/* Image — swaps sides */}
          <div className={`relative min-h-[50vh] overflow-hidden ${i % 2 !== 0 ? "md:order-last" : ""}`}>
            <Image
              src={col.heroImage}
              alt={col.name}
              fill
              className="object-cover object-center transition-transform duration-[1200ms] ease-[0.22,1,0.36,1] hover:scale-[1.03]"
              sizes="(max-width:768px) 100vw, 55vw"
            />
            {/* Color accent line at top */}
            <div className="absolute left-0 right-0 top-0 h-0.5" style={{ background: col.color }} />
          </div>

          {/* Text */}
          <div
            className={`flex flex-col justify-center px-10 py-16 md:px-14 lg:px-20 ${i % 2 !== 0 ? "md:order-first" : ""}`}
            style={{ background: i % 2 === 0 ? "var(--anthracite)" : "#2a2a2a" }}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-3 font-[family-name:var(--font-cormorant)] text-xs uppercase tracking-[0.35em]"
              style={{ color: col.color }}
            >
              Koleksiyon
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mb-2 font-[family-name:var(--font-playfair)] text-4xl font-extralight text-[var(--cream)] md:text-5xl"
            >
              {col.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="mb-6 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-widest text-[var(--cream)]/40"
            >
              {col.subtitle}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mb-7 h-px w-10 origin-left"
              style={{ background: col.color + "60" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="mb-5 font-[family-name:var(--font-cormorant)] text-base leading-relaxed text-[var(--cream)]/65 md:text-lg"
            >
              {col.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-10 font-[family-name:var(--font-cormorant)] text-sm italic text-[var(--cream)]/40"
            >
              &ldquo;{col.philosophy}&rdquo;
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.46 }}
            >
              <Link
                href={`/koleksiyon?desen=${col.slug}`}
                className="group inline-flex items-center gap-3 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.2em] transition-opacity hover:opacity-70"
                style={{ color: col.color }}
              >
                Koleksiyonu Keşfet
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      ))}

      {/* ── Kategori Hikayeleri ─────────────────────────────────────── */}
      <section className="bg-[var(--cream)] py-28">
        <div className="mx-auto max-w-7xl px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-3 font-[family-name:var(--font-cormorant)] text-xs uppercase tracking-[0.35em] text-[var(--anthracite)]/50"
          >
            Kategori
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mb-20 font-[family-name:var(--font-playfair)] text-4xl font-extralight text-[var(--anthracite)] md:text-5xl"
          >
            Her Anın Kıyafeti
          </motion.h2>

          <div className="grid gap-1 md:grid-cols-5">
            {CATEGORY_STORIES.map((cat, i) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden"
              >
                <Link href={cat.href} className="block">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-[family-name:var(--font-playfair)] text-lg font-light text-[var(--cream)]">
                        {cat.label}
                      </h3>
                      <p className="mt-1 font-[family-name:var(--font-cormorant)] text-xs italic leading-snug text-[var(--cream)]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {cat.text}
                      </p>
                      <p className="mt-3 font-[family-name:var(--font-cormorant)] text-xs uppercase tracking-widest text-[var(--cream)]/50 transition-colors group-hover:text-[var(--cream)]/80">
                        Keşfet →
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial Teaser ────────────────────────────────────────── */}
      <section className="grid md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="group relative flex min-h-80 items-end overflow-hidden bg-[var(--anthracite)] p-12"
        >
          <div className="absolute inset-0">
            <Image
              src={`${BASE}/Méternelle Çekim0529-Edit.jpg`}
              alt="Kumaş Felsefesi"
              fill
              className="object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
              sizes="50vw"
            />
          </div>
          <div className="relative z-10">
            <p className="mb-2 font-[family-name:var(--font-cormorant)] text-xs uppercase tracking-[0.35em] text-[var(--cream)]/50">Editöryal</p>
            <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-3xl font-extralight text-[var(--cream)]">Kumaş Felsefemiz</h3>
            <Link href="#" className="inline-flex items-center gap-2 font-[family-name:var(--font-cormorant)] text-sm tracking-wider text-[var(--cream)]/60 transition-colors hover:text-[var(--cream)]">
              Devamını Oku
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.12 }}
          className="group relative flex min-h-80 items-end overflow-hidden p-12"
          style={{ background: "#f0e8e0" }}
        >
          <div className="absolute inset-0">
            <Image
              src={`${BASE}/Méternelle Çekim1349-Edit.jpg`}
              alt="Vegan Sertifikası"
              fill
              className="object-cover opacity-25 transition-transform duration-700 group-hover:scale-105"
              sizes="50vw"
            />
          </div>
          <div className="relative z-10">
            <p className="mb-2 font-[family-name:var(--font-cormorant)] text-xs uppercase tracking-[0.35em] text-[var(--anthracite)]/50">Sürdürülebilirlik</p>
            <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-3xl font-extralight text-[var(--anthracite)]">Vegan Sertifikamız</h3>
            <Link href="#" className="inline-flex items-center gap-2 font-[family-name:var(--font-cormorant)] text-sm tracking-wider text-[var(--anthracite)]/60 transition-colors hover:text-[var(--anthracite)]">
              Devamını Oku
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
