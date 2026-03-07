"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#f7f4ef]">
      {/* Subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f5e8e8]/20 via-transparent to-[#eae5dc]/30"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-playfair)] text-5xl font-light tracking-[0.2em] text-[#3d3d3d] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          M&apos;ÉTERNELLE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-[family-name:var(--font-cormorant)] text-lg tracking-[0.3em] text-[#5a5a5a] sm:text-xl md:text-2xl"
        >
          Touch the body and soul
        </motion.p>
        <motion.a
          href="#collection"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-14 inline-block border border-[#3d3d3d]/40 bg-transparent px-10 py-4 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.25em] text-[#3d3d3d] transition-colors hover:border-[#3d3d3d] hover:bg-[#3d3d3d]/5"
        >
          Koleksiyonu Keşfet
        </motion.a>
      </div>
    </section>
  );
}
