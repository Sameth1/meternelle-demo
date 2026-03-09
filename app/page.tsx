"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import SectionDivider from "./components/SectionDivider";
import Footer from "./components/Footer";

const BASE = "/images/products/M_Éternelle Çekimler 161024";

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

      {/* CTA — Koleksiyonu Keşfet */}
      <section className="relative overflow-hidden bg-[var(--anthracite)]">
        <div className="absolute inset-0">
          <Image
            src={`${BASE}/Méternelle Çekim0171-Edit.jpg`}
            alt="M'Éternelle Koleksiyon"
            fill
            className="object-cover object-center opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--anthracite)]/80 via-[var(--anthracite)]/40 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-center gap-8 px-8 py-28 sm:px-14 md:py-36">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-cormorant)] text-xs tracking-[0.35em] text-[var(--cream)]/60 uppercase"
          >
            M&apos;Éternelle
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg font-[family-name:var(--font-playfair)] text-4xl font-light leading-tight text-[var(--cream)] sm:text-5xl md:text-6xl"
          >
            Koleksiyonu
            <br />
            Keşfet
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-sm font-[family-name:var(--font-cormorant)] text-lg leading-relaxed text-[var(--cream)]/70"
          >
            Beş desen, sonsuz hikaye. Pavo&apos;nun ihtişamından Monogram&apos;ın cesaretine — M&apos;Éternelle sizi bekliyor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-3 border border-[var(--cream)] px-8 py-3.5 font-[family-name:var(--font-cormorant)] text-sm tracking-[0.2em] text-[var(--cream)] transition-all duration-300 uppercase hover:bg-[var(--cream)] hover:text-[var(--anthracite)]"
            >
              Tüm Koleksiyonu Gör
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/koleksiyon"
              className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.15em] text-[var(--cream)]/60 transition-colors uppercase hover:text-[var(--cream)]"
            >
              Filtrele
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
