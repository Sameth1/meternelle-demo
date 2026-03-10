"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const PRODUCTS_CATEGORIES = [
  { label: "Kimonolar", href: "/products/kimono" },
  { label: "Gömlekler & Kaftanlar", href: "/products/gomlek" },
  { label: "Bluzlar", href: "/products/bluz" },
  { label: "Atletler", href: "/products/atlet" },
  { label: "Pantolonlar", href: "/products/pantolon" },
  { label: "Şortlar", href: "/products/sort" },
  { label: "Elbiseler", href: "/products/elbise" },
];

const COLLECTIONS = [
  { label: "Pavo", href: "/koleksiyon?desen=pavo" },
  { label: "Vas", href: "/koleksiyon?desen=vas" },
  { label: "Viridis", href: "/koleksiyon?desen=viridis" },
  { label: "Rosea", href: "/koleksiyon?desen=rosea" },
  { label: "Monogram", href: "/koleksiyon?desen=monogram" },
];

const PAGES = [
  { label: "Our Story", href: "#" },
  { label: "Vegan Sertifikası", href: "#" },
  { label: "Goals", href: "#" },
  { label: "Kumaş Bakım Felsefesi", href: "#" },
  { label: "Blog", href: "#" },
];

interface SideNavProps {
  open: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
}

export default function SideNav({ open, onClose, onMouseEnter }: SideNavProps) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => onClose(), 220);
  };

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    onMouseEnter();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay — click to close on mobile */}
          <motion.div
            key="sidenav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] md:pointer-events-none md:hidden"
            aria-hidden
          />

          {/* Panel */}
          <motion.nav
            key="sidenav-panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed inset-y-0 left-0 z-50 flex w-80 max-w-full flex-col bg-[var(--anthracite)] shadow-2xl"
            aria-label="Site navigasyonu"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--cream)]/10 px-6 py-5">
              <Link
                href="/"
                onClick={onClose}
                className="font-[family-name:var(--font-playfair)] text-lg font-light tracking-[0.2em] text-[var(--cream)]"
              >
                M&apos;ÉTERNELLE
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Menüyü kapat"
                className="flex h-9 w-9 items-center justify-center text-[var(--cream)]/70 transition-colors hover:text-[var(--cream)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Nav body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">

              {/* Products — link + separate accordion toggle */}
              <div className="mb-1">
                <div className="flex items-center justify-between">
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="flex-1 py-3 font-[family-name:var(--font-cormorant)] text-base tracking-[0.1em] text-[var(--cream)] transition-colors hover:text-[var(--cream)]/80"
                  >
                    Products
                  </Link>
                  <button
                    type="button"
                    onClick={() => setProductsOpen((o) => !o)}
                    aria-label="Products alt menüsünü aç"
                    className="flex h-10 w-10 items-center justify-center rounded text-[var(--cream)]/60 transition-all hover:bg-[var(--cream)]/10 hover:text-[var(--cream)]"
                  >
                    <motion.svg
                      animate={{ rotate: productsOpen ? 90 : 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </motion.svg>
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {productsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-l border-[var(--cream)]/10 pb-2 pl-4 pt-1">
                        {PRODUCTS_CATEGORIES.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="block py-2 font-[family-name:var(--font-cormorant)] text-sm tracking-wider text-[var(--cream)]/70 transition-colors hover:text-[var(--cream)]"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Koleksiyonlar — same pattern */}
              <div className="mb-1">
                <div className="flex items-center justify-between">
                  <Link
                    href="/koleksiyon"
                    onClick={onClose}
                    className="flex-1 py-3 font-[family-name:var(--font-cormorant)] text-base tracking-[0.1em] text-[var(--cream)] transition-colors hover:text-[var(--cream)]/80"
                  >
                    Koleksiyonlar
                  </Link>
                  <button
                    type="button"
                    onClick={() => setCollectionsOpen((o) => !o)}
                    aria-label="Koleksiyonlar alt menüsünü aç"
                    className="flex h-10 w-10 items-center justify-center rounded text-[var(--cream)]/60 transition-all hover:bg-[var(--cream)]/10 hover:text-[var(--cream)]"
                  >
                    <motion.svg
                      animate={{ rotate: collectionsOpen ? 90 : 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </motion.svg>
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {collectionsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-l border-[var(--cream)]/10 pb-2 pl-4 pt-1">
                        {COLLECTIONS.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="block py-2 font-[family-name:var(--font-cormorant)] text-sm tracking-wider text-[var(--cream)]/70 transition-colors hover:text-[var(--cream)]"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div className="my-4 h-px bg-[var(--cream)]/10" />

              {/* Pages */}
              {PAGES.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="block py-3 font-[family-name:var(--font-cormorant)] text-base tracking-[0.1em] text-[var(--cream)]/70 transition-colors hover:text-[var(--cream)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
