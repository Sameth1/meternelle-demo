"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[var(--cream)]">
      {/* Monogram watermark - luxury brand signature */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-end pr-[5%]"
        aria-hidden
      >
        <span
          className="font-[family-name:var(--font-playfair)] text-[25vw] font-extralight tracking-[0.15em] text-[var(--anthracite)]"
          style={{ opacity: 0.035 }}
        >
          M&apos;É
        </span>
      </div>
      {/* Subtle grain texture - premium tactile feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      {/* Soft gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f5e8e8]/25 via-transparent to-[#eae5dc]/35"
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14"
        >
          <Link
            href="/koleksiyon"
            className="inline-block border border-[#3d3d3d]/40 bg-transparent px-10 py-4 font-[family-name:var(--font-cormorant)] text-sm uppercase tracking-[0.25em] text-[#3d3d3d] transition-colors hover:border-[#3d3d3d] hover:bg-[#3d3d3d]/5"
          >
            Koleksiyonu Keşfet
          </Link>
        </motion.div>
      </div>

      {/* Scroll down arrow */}
      <motion.button
        type="button"
        onClick={() =>
          document.getElementById("felsefemiz")?.scrollIntoView({ behavior: "smooth" })
        }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[var(--anthracite)]/50"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </motion.div>
        <span className="font-[family-name:var(--font-cormorant)] text-xs tracking-[0.1em] text-[var(--anthracite)]/50">
          ↓ Aşağı kaydır
        </span>
      </motion.button>
    </section>
  );
}
