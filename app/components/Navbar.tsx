"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, useScroll } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cartStore";
import { useFavorites } from "@/lib/favoritesStore";
import { getAllProducts } from "@/lib/products";
import SideNav from "./SideNav";

type SearchProduct = { slug: string; name: string };

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { count: favoritesCount } = useFavorites();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastYRef = useRef(0);
  const sideNavCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allProducts: SearchProduct[] = getAllProducts().map((p) => ({
    slug: p.slug,
    name: p.name,
  }));

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => {
      const delta = y - lastYRef.current;
      lastYRef.current = y;
      setVisible((prev) => {
        if (y < 80) return true;
        if (delta > 5) return false;
        if (delta < -5) return true;
        return prev;
      });
    });
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) { setSearchResults([]); return; }
    const filtered = allProducts.filter(
      (p) => p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)
    );
    setSearchResults(filtered.slice(0, 6));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const handleResultClick = useCallback(
    (slug: string) => {
      setSearchOpen(false);
      setSearchQuery("");
      router.push(`/urun/${slug}`);
    },
    [router]
  );

  const openSideNav = () => {
    if (sideNavCloseTimer.current) clearTimeout(sideNavCloseTimer.current);
    setSideNavOpen(true);
  };

  const closeSideNav = () => {
    sideNavCloseTimer.current = setTimeout(() => setSideNavOpen(false), 220);
  };

  return (
    <>
      <SideNav
        open={sideNavOpen}
        onClose={() => setSideNavOpen(false)}
        onMouseEnter={openSideNav}
      />

      <motion.header
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 top-0 z-40 w-full border-b border-[var(--stone)]/30 bg-[var(--cream)]/90 backdrop-blur-[8px]"
      >
        {/* Invisible hover trigger strip on the left edge */}
        <div
          className="absolute left-0 top-0 z-50 h-full w-8"
          onMouseEnter={openSideNav}
          onMouseLeave={closeSideNav}
          aria-hidden
        />

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            {/* Hamburger — reliable click trigger for SideNav */}
            <button
              type="button"
              onClick={() => setSideNavOpen(true)}
              onMouseEnter={openSideNav}
              aria-label="Menüyü aç"
              className="flex h-10 w-10 shrink-0 items-center justify-center text-[var(--anthracite)] transition-opacity hover:opacity-70"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {pathname !== "/" && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => router.back()}
                  aria-label="Geri"
                  className="flex h-10 w-10 shrink-0 items-center justify-center text-[var(--anthracite)] transition-opacity hover:opacity-70"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => router.forward()}
                  aria-label="İleri"
                  className="flex h-10 w-10 shrink-0 items-center justify-center text-[var(--anthracite)] transition-opacity hover:opacity-70"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            <Link
              href="/"
              className="font-[family-name:var(--font-playfair)] text-xl font-light tracking-[0.15em] text-[var(--anthracite)] transition-opacity hover:opacity-80 sm:text-2xl"
            >
              M&apos;ÉTERNELLE
            </Link>
          </div>

          <div className="flex items-center gap-5">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                type="button"
                onClick={() => setSearchOpen((o) => !o)}
                aria-label="Ara"
                className="flex h-10 w-10 items-center justify-center text-[var(--anthracite)] transition-opacity hover:opacity-70"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-72 border border-[var(--stone)]/50 bg-[var(--cream)] shadow-sm">
                  <input
                    ref={inputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ürün ara..."
                    className="w-full border-b border-[var(--stone)]/30 bg-transparent px-4 py-3 font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite)] placeholder:text-[var(--anthracite-soft)]/70 focus:outline-none"
                  />
                  <div className="max-h-64 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      searchResults.map((p) => (
                        <button
                          key={p.slug}
                          type="button"
                          onClick={() => handleResultClick(p.slug)}
                          className="flex w-full items-center gap-3 px-4 py-3 text-left font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite)] transition-colors hover:bg-[var(--anthracite)]/5"
                        >
                          {p.name}
                        </button>
                      ))
                    ) : searchQuery.trim() ? (
                      <p className="px-4 py-6 font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite-soft)]">
                        Sonuç bulunamadı
                      </p>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/koleksiyon"
              className="hidden font-[family-name:var(--font-cormorant)] text-sm tracking-[0.15em] text-[var(--anthracite-soft)] transition-colors hover:text-[var(--anthracite)] md:block"
            >
              Koleksiyon
            </Link>

            <Link
              href="/favoriler"
              aria-label={`Favoriler (${favoritesCount} ürün)`}
              className="relative hidden items-center gap-1.5 font-[family-name:var(--font-cormorant)] text-sm tracking-[0.15em] text-[var(--anthracite-soft)] transition-colors hover:text-[var(--anthracite)] md:flex"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Favoriler
              {favoritesCount > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--anthracite)] px-1 text-[10px] font-medium text-[var(--cream)]">
                  {favoritesCount > 99 ? "99+" : favoritesCount}
                </span>
              )}
            </Link>

            <Link
              href="/sepet"
              aria-label={`Sepet (${itemCount} ürün)`}
              className="relative flex h-10 w-10 items-center justify-center text-[var(--anthracite)] transition-opacity hover:opacity-70"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--anthracite)] px-1 text-[10px] font-medium text-[var(--cream)]">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
