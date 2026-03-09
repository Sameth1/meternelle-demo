"use client";

import { motion } from "framer-motion";

const philosophyText = `Bir dokunuş ruhunuzu sarabiliyorsa, o dokunuş sonsuza dek sizinle kalır. M'Éternelle, bedeninize ve ruhunuza dokunan özenle seçilmiş ürünlerle, günlük ritüellerinizi birer sanat eserine dönüştürür. Her temas, her an, hatırlanmaya değer.`;

export default function Philosophy() {
  return (
    <section
      id="felsefemiz"
      className="relative overflow-hidden bg-[var(--anthracite)] py-24 sm:py-32 md:py-40 lg:py-48"
    >
      {/* Brand watermark - full company name, thin font */}
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-[family-name:var(--font-cormorant)] text-[160px] font-light leading-none tracking-[0.15em] text-[var(--cream)] sm:text-[200px] md:text-[240px]"
        style={{ opacity: 0.04 }}
        aria-hidden
      >
        M&apos;ÉTERNELLE
      </span>
      {/* Soft radial gradient - Dior-inspired shaded depth */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(247,244,239,0.03)_0%,transparent_60%)]"
        aria-hidden
      />
      {/* Subtle grain - premium tactile texture on dark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        {/* Corner ornaments */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-[30px] w-[30px] border-l-2 border-t-2 border-[var(--pastel-pink)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-[30px] w-[30px] border-r-2 border-t-2 border-[var(--pastel-pink)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[30px] w-[30px] border-b-2 border-l-2 border-[var(--pastel-pink)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[30px] w-[30px] border-b-2 border-r-2 border-[var(--pastel-pink)]"
          aria-hidden
        />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10 text-center"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-light tracking-[0.15em] text-[var(--cream)] sm:text-3xl">
            Felsefemiz
          </h2>
          <p className="font-[family-name:var(--font-cormorant)] text-xl leading-relaxed text-[var(--cream)]/90 sm:text-2xl sm:leading-loose">
            {philosophyText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
