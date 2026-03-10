"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import SectionDivider from "./components/SectionDivider";
import Footer from "./components/Footer";
import { collections } from "@/lib/collections";

const BASE = "/images/products/cekimler";

export default function Home() {
  useEffect(() => {
    const nav = performance.getEntriesByType?.("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type !== "back_forward") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Philosophy />
      <SectionDivider />

      {/* ── Editorial Strip ────────────────────────────────────── */}
      <section className="bg-[var(--anthracite)] py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 sm:px-14 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 font-[family-name:var(--font-cormorant)] text-xs tracking-[0.35em] text-[var(--cream)]/40 uppercase">
              Manifesto
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-light leading-snug text-[var(--cream)] md:text-4xl">
              Her desen bir<br />manifestodur
            </h2>
            <p className="mt-6 font-[family-name:var(--font-cormorant)] text-lg leading-relaxed text-[var(--cream)]/65">
              M&apos;Éternelle beş koleksiyonda beş farklı kadın hikayesini anlatıyor. Tavuskuşunun ihtişamı, şalın dansı, yeşilin derinliği, pembenin cesareti ve imzanın gücü — hepsi aynı ruhu taşıyor.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 font-[family-name:var(--font-cormorant)] text-sm tracking-[0.2em] text-[var(--cream)]/60 transition-colors uppercase hover:text-[var(--cream)]"
            >
              Hikayemiz
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[3/4] overflow-hidden"
          >
            <Image
              src={`${BASE}/Méternelle Çekim1349-Edit.jpg`}
              alt="M'Éternelle Koleksiyon"
              fill
              className="object-cover object-center"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[var(--anthracite)]/10" />
          </motion.div>
        </div>
      </section>

      {/* ── Koleksiyon Spotlight ───────────────────────────────── */}
      <section className="bg-[var(--cream)] px-6 py-24 sm:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 font-[family-name:var(--font-playfair)] text-3xl font-light tracking-wide text-[var(--anthracite)] md:text-4xl"
          >
            Koleksiyonlar
          </motion.h2>

          {/* First row: 2 large cards */}
          <div className="mb-4 grid gap-4 md:grid-cols-2">
            {collections.slice(0, 2).map((col, i) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden"
              >
                {/* Color accent */}
                <div className="absolute top-0 left-0 right-0 z-10 h-0.5" style={{ background: col.color }} />

                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={col.heroImage}
                    alt={col.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-8">
                    <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-light text-[var(--cream)] md:text-4xl">
                      {col.name}
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-cormorant)] text-sm tracking-widest text-[var(--cream)]/60 uppercase">
                      {col.subtitle}
                    </p>
                    <p className="mt-3 font-[family-name:var(--font-cormorant)] text-sm italic leading-relaxed text-[var(--cream)]/70 hidden md:block">
                      &ldquo;{col.philosophy}&rdquo;
                    </p>
                    <Link
                      href={`/koleksiyon?desen=${col.slug}`}
                      className="mt-5 inline-flex items-center gap-2 font-[family-name:var(--font-cormorant)] text-sm tracking-wider text-[var(--cream)] transition-opacity duration-300 hover:opacity-70"
                    >
                      Koleksiyonu Keşfet
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second row: 3 smaller cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {collections.slice(2).map((col, i) => (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.16 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 z-10 h-0.5" style={{ background: col.color }} />

                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={col.heroImage}
                    alt={col.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-light text-[var(--cream)]">
                      {col.name}
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-cormorant)] text-xs tracking-widest text-[var(--cream)]/60 uppercase">
                      {col.subtitle}
                    </p>
                    <Link
                      href={`/koleksiyon?desen=${col.slug}`}
                      className="mt-4 inline-flex items-center gap-2 font-[family-name:var(--font-cormorant)] text-sm tracking-wider text-[var(--cream)] transition-opacity duration-300 hover:opacity-70"
                    >
                      Koleksiyonu Keşfet
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog / Editorial Teaser ────────────────────────────── */}
      <section className="grid md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative flex min-h-64 items-end overflow-hidden bg-[var(--anthracite)] p-10"
        >
          <div className="absolute inset-0">
            <Image
              src={`${BASE}/Méternelle Çekim0529-Edit.jpg`}
              alt="Kumaş Felsefesi"
              fill
              className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
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
          className="group relative flex min-h-64 items-end overflow-hidden bg-[var(--pastel-pink)] p-10"
        >
          <div className="absolute inset-0">
            <Image
              src={`${BASE}/Méternelle Çekim1349-Edit.jpg`}
              alt="Vegan Sertifikası"
              fill
              className="object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
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

      <Footer />
    </main>
  );
}
