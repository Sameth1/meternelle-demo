"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getAllProducts, CATEGORY_LABELS } from "@/lib/products";

const BASE = "/images/products/M_Éternelle Çekimler 161024";
const p = (num: string) => `${BASE}/Méternelle Çekim${num}-Edit.jpg`;

type CategoryKey = keyof typeof CATEGORY_CONFIG;

const CATEGORY_CONFIG = {
  kimono: {
    heroImage: p("0171"),
    philosophy: "Kimono, Doğu'nun zarafetiyle Batı'nın özgürlüğünü buluşturur. M'Éternelle kimonoları; her sabah giyildiğinde bir ritüel, her akşam çıkarıldığında bir anı bırakır. Kumaşın akışı bedeni sarar, desen ruhu besler.",
    editorial: "Her sabah farklı bir hikaye başlatır. Kimono, günlük rutini törene dönüştüren bir çerçevedir.",
  },
  gomlek: {
    heroImage: p("0378"),
    philosophy: "Hakim yaka, gücün sessiz ifadesidir. M'Éternelle gömleği omuzlara konar, özgüveni görünür kılar. Her düğme bir kararlılık, her desen bir kimlik beyanı.",
    editorial: "Gömlek, gardırobun temel taşıdır; ancak M'Éternelle'in elinde bir beyana dönüşür.",
  },
  kaftan: {
    heroImage: p("1081"),
    philosophy: "Kaftan, tarih boyunca kraliyet ve özgürlüğün simgesi olmuştur. M'Éternelle kaftanı bu mirası günümüze taşır — hem bir anın kıyafeti, hem bir ömrün parçası.",
    editorial: "Bir kaftanı giymek, zamanın içinde bir kapı aralamaktır.",
  },
  bluz: {
    heroImage: p("1460"),
    philosophy: "Bluz, her kadının gardırobundaki sessiz devrimcidir. M'Éternelle bluzları sadeliği reddeder; her kesim, her desen bir tutum sergiler.",
    editorial: "Sessiz ama güçlü. Bluz, söylemeksizin anlatır.",
  },
  atlet: {
    heroImage: p("1559"),
    philosophy: "En saf form. M'Éternelle atleti, minimalizmi lükse dönüştürür. Cilde değen kumaş, özgürlüğü hissettirir.",
    editorial: "Az olan çok olduğunda, her detay anlam kazanır.",
  },
  sort: {
    heroImage: p("0840"),
    philosophy: "Hareketin özgürlüğü. M'Éternelle şortları mevsimle dans eder — hafif, özgür, kendine güvenen.",
    editorial: "Hafiflik bir lükstür. Şort, özgürlüğü kumaşa çevirir.",
  },
  pantolon: {
    heroImage: p("0639"),
    philosophy: "Düşen gün ışığında, geniş paçalı pantolonun her adımda yarattığı dalga... M'Éternelle pantolonu zamanı yavaşlatır.",
    editorial: "Bir adım atmak, bir hikaye anlatmaktır.",
  },
  elbise: {
    heroImage: p("1254"),
    philosophy: "Bir elbise giymek, bir karar vermektir. M'Éternelle elbiseleri bu kararı güçlendirir — her midi siluet, her V yaka bir manifesto.",
    editorial: "Elbise, içindekileri dışarıya taşır. Her dikiş bir irade.",
  },
} as const;

const DISPLAY_NAMES: Record<string, string> = {
  kimono: "Kimono",
  gomlek: "Gömlek",
  kaftan: "Kaftan",
  bluz: "Bluz",
  atlet: "Atlet",
  sort: "Şort",
  pantolon: "Pantolon",
  elbise: "Elbise",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("tr-TR").format(price) + " ₺";
}

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = typeof params.category === "string" ? params.category : "";

  if (!CATEGORY_CONFIG[categorySlug as CategoryKey]) {
    notFound();
  }

  const config = CATEGORY_CONFIG[categorySlug as CategoryKey];
  const displayName = DISPLAY_NAMES[categorySlug] ?? categorySlug;
  const allProducts = getAllProducts();
  const categoryProducts = allProducts.filter((p) => p.category === categorySlug);

  return (
    <main className="overflow-x-hidden bg-[var(--cream)]">
      {/* Cinematic Hero */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden bg-[var(--anthracite)]">
        <div className="absolute inset-0">
          <Image
            src={config.heroImage}
            alt={displayName}
            fill
            priority
            className="object-cover object-center opacity-70"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--anthracite)]/20 to-[var(--anthracite)]/60" />
        </div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-playfair)] text-6xl font-light tracking-[0.08em] text-[var(--cream)] md:text-8xl"
          >
            {displayName}
          </motion.h1>
        </div>
        {/* Scroll arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className="text-[var(--cream)]/60"
          >
            <path d="m6 9 6 6 6-6" />
          </motion.svg>
        </motion.div>
      </section>

      {/* Philosophy */}
      <section className="bg-[var(--anthracite)] py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl px-6 text-center sm:px-12"
        >
          <p className="font-[family-name:var(--font-cormorant)] text-xl leading-relaxed text-[var(--cream)]/80 italic md:text-2xl">
            &ldquo;{config.philosophy}&rdquo;
          </p>
        </motion.div>
      </section>

      {/* Editorial Teaser */}
      <section className="border-b border-[var(--stone)]/20 bg-[var(--cream)] py-14">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl px-6 sm:px-12"
        >
          <p className="mb-1 font-[family-name:var(--font-cormorant)] text-xs tracking-[0.3em] text-[var(--anthracite)]/50 uppercase">Editöryal</p>
          <p className="font-[family-name:var(--font-cormorant)] text-lg leading-relaxed text-[var(--anthracite)]/70">
            {config.editorial}
          </p>
          <Link
            href="#"
            className="mt-3 inline-flex items-center gap-2 font-[family-name:var(--font-cormorant)] text-sm tracking-wider text-[var(--anthracite)]/60 transition-colors hover:text-[var(--anthracite)]"
          >
            Devamını Oku →
          </Link>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 font-[family-name:var(--font-playfair)] text-3xl font-light text-[var(--anthracite)]"
        >
          Tüm {displayName}lar
        </motion.h2>

        {categoryProducts.length === 0 ? (
          <p className="font-[family-name:var(--font-cormorant)] text-lg text-[var(--anthracite)]/60">
            Bu kategoride henüz ürün bulunmuyor.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {categoryProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/urun/${product.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[var(--beige)]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:768px) 50vw, (max-width:1280px) 33vw, 25vw"
                    />
                  </div>
                  <div className="mt-4 px-1">
                    <h3 className="font-[family-name:var(--font-cormorant)] text-base text-[var(--anthracite)] line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-cormorant)] text-sm text-[var(--anthracite)]/60">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
