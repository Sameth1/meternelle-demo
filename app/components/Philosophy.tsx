"use client";

import { motion } from "framer-motion";

const philosophyText = `Bir dokunuş ruhunuzu sarabiliyorsa, o dokunuş sonsuza dek sizinle kalır. M'Éternelle, bedeninize ve ruhunuza dokunan özenle seçilmiş ürünlerle, günlük ritüellerinizi birer sanat eserine dönüştürür. Her temas, her an, hatırlanmaya değer.`;

export default function Philosophy() {
  return (
    <section className="relative py-24 sm:py-32 md:py-40 lg:py-48">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-light tracking-[0.15em] text-[#3d3d3d] sm:text-3xl">
            Felsefemiz
          </h2>
          <p className="font-[family-name:var(--font-cormorant)] text-xl leading-relaxed text-[#5a5a5a] sm:text-2xl sm:leading-loose">
            {philosophyText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
