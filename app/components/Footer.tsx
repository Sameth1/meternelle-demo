"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-[#d6d1c8]/50 bg-[#f7f4ef] py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-6"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <a
            href="https://instagram.com/meternelle"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#3d3d3d] transition-opacity hover:opacity-70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="mailto:info@meternelle.com"
            className="font-[family-name:var(--font-cormorant)] text-sm tracking-[0.15em] text-[#5a5a5a] transition-colors hover:text-[#3d3d3d]"
          >
            Bize Ulaşın
          </a>
        </div>
        <p className="font-[family-name:var(--font-cormorant)] text-xs tracking-widest text-[#5a5a5a]/80">
          M&apos;ÉTERNELLE
        </p>
      </motion.div>
    </footer>
  );
}
