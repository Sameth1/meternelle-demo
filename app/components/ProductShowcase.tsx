"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Meternelle.com erişilemediği için Unsplash'ten premium uyku bandı/kişisel bakım görselleri kullanılıyor.
// Site erişildiğinde aşağıdaki URL'leri meternelle.com görselleriyle değiştirin.
const products = [
  {
    id: 1,
    name: "İpek Uyku Bandı",
    price: "2.400 ₺",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: 2,
    name: "Saten Maske Seti",
    price: "1.890 ₺",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
  },
  {
    id: 3,
    name: "Lüks Bakım Koleksiyonu",
    price: "3.200 ₺",
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
  },
  {
    id: 4,
    name: "Yastık Kılıfı & Band Seti",
    price: "4.500 ₺",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
  },
];

export default function ProductShowcase() {
  return (
    <section
      id="collection"
      className="border-t border-[#d6d1c8]/50 bg-[#fcfaf7] py-20 sm:py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center font-[family-name:var(--font-playfair)] text-3xl font-light tracking-[0.2em] text-[#3d3d3d] sm:text-4xl"
        >
          Koleksiyon
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              <div
                className="block overflow-hidden rounded-sm bg-white transition-shadow duration-500 hover:shadow-[0_20px_60px_-15px_rgba(61,61,61,0.12)]"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-medium text-[#3d3d3d]">
                    {product.name}
                  </h3>
                  <p className="mt-2 font-[family-name:var(--font-cormorant)] text-[#5a5a5a]">
                    {product.price}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="inline-block border border-[#3d3d3d]/40 px-4 py-2 text-xs uppercase tracking-wider text-[#3d3d3d] transition-colors hover:border-[#3d3d3d]"
                    >
                      İncele
                    </button>
                    <button
                      type="button"
                      className="inline-block bg-[#3d3d3d] px-4 py-2 text-xs uppercase tracking-wider text-[#f7f4ef] transition-opacity hover:opacity-90"
                    >
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
