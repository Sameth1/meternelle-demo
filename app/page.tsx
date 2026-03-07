"use client";

import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import ProductShowcase from "./components/ProductShowcase";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Philosophy />
      <ProductShowcase />
      <Footer />
    </main>
  );
}
