"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full items-end overflow-hidden bg-[var(--anthracite)]">

      {/* Arka plan görseli */}
      <div className="absolute inset-0">
        <Image
          src="/images/products/cekimler/Méternelle Çekim0171-Edit.jpg"
          alt="M'Éternelle"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-20 sm:px-14 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 font-[family-name:var(--font-cormorant)] text-xs tracking-[0.4em] text-[var(--cream)]/60 uppercase"
        >
          Koleksiyon 2025
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 font-[family-name:var(--font-playfair)] text-5xl font-light tracking-[0.15em] text-[var(--cream)] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          M&apos;ÉTERNELLE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 font-[family-name:var(--font-cormorant)] text-xl tracking-[0.2em] text-[var(--cream)]/75 md:text-2xl"
        >
          Touch the body and soul
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-3 border border-[var(--cream)] px-8 py-3.5 font-[family-name:var(--font-cormorant)] text-sm tracking-[0.2em] text-[var(--cream)] transition-all duration-300 uppercase hover:bg-[var(--cream)] hover:text-[var(--anthracite)]"
          >
            Koleksiyonu Keşfet
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="h-6 w-px bg-[var(--cream)]/40"
        />
        <span className="font-[family-name:var(--font-cormorant)] text-[10px] tracking-[0.3em] text-[var(--cream)]/40 uppercase">
          Keşfet
        </span>
      </motion.div>
    </section>
  );
}
