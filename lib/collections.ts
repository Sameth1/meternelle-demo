// lib/collections.ts
// M'ÉTERNELLE — Koleksiyon Editöryal Kataloğu

const BASE = '/images/products/M_Éternelle Çekimler 161024'
const p = (num: string) => `${BASE}/Méternelle Çekim${num}-Edit.jpg`

export type Collection = {
  id: string
  slug: string
  desenKey: 'PAV' | 'VAS' | 'VİRİDİS' | 'ROSEA' | 'MONOGRAM'
  name: string
  subtitle: string
  description: string
  philosophy: string
  color: string
  heroImage: string
  galleryImages: string[]
}

export const collections: Collection[] = [
  {
    id: 'pav',
    slug: 'pav',
    desenKey: 'PAV',
    name: 'Pavo',
    subtitle: 'Tavuskuşunun İhtişamı',
    description: 'Doğanın en görkemli kuşundan ilham alan Pavo koleksiyonu, tavuskuşunun büyüleyici tüy desenlerini saten kumaşa işliyor. Şeftali ve krem tonlarının buluşmasında zarafet ve güç bir arada.',
    philosophy: 'Her desen bir hikaye taşır. Pavo, güzelliğin cesaretle var olduğu yerde filizlenir.',
    color: '#e8956d',
    heroImage: p('0171'),
    galleryImages: [p('0120'), p('0197'), p('0329'), p('0840')],
  },
  {
    id: 'vas',
    slug: 'vas',
    desenKey: 'VAS',
    name: 'Vas',
    subtitle: 'Şalın Dansı',
    description: 'Osmanlı şal desenlerinin çağdaş yorumu olan Vas koleksiyonu, lila ve mor tonlarında işlenmiş paisley motifleriyle gelenekle modernin buluştuğu noktada duruyor. Her parça, bir şalın özgür akışını kumaşa yansıtıyor.',
    philosophy: 'Köklere saygı, geleceğe uzanma. Vas, zamansız bir mirasın yaşayan hali.',
    color: '#b8a8c8',
    heroImage: p('1349'),
    galleryImages: [p('1365'), p('1460'), p('2101'), p('1852')],
  },
  {
    id: 'viridis',
    slug: 'viridis',
    desenKey: 'VİRİDİS',
    name: 'Viridis',
    subtitle: 'Yeşilin Derinliği',
    description: "Latince'de \"yeşil\" anlamına gelen Viridis, ormanın koyu gölgelerinden doğan bir koleksiyon. Suyun altındaki dünyadan ilham alan balıklı desenler ve M'Éternelle'in güçlü yeşil tonu, doğayla kurulan derin bağı simgeliyor.",
    philosophy: "Doğa en iyi tasarımcıdır. Viridis, bu bilgeliği bedene giydiriyor.",
    color: '#1a4a3a',
    heroImage: p('0639'),
    galleryImages: [p('0378'), p('0529'), p('0461'), p('0309')],
  },
  {
    id: 'rosea',
    slug: 'rosea',
    desenKey: 'ROSEA',
    name: 'Rosea',
    subtitle: 'Pembenin Cesareti',
    description: 'Rosea, pembeden çok daha fazlasıdır. Fuşyanın tutkusunu, çizgisel desenlerin modernliğini ve suyun altındaki balıkların özgürlüğünü tek bir koleksiyonda buluşturan Rosea; güçlü, özgür ve kadınsı.',
    philosophy: 'Pembe bir seçimdir, bir duruştur. Rosea, cesaretin rengidir.',
    color: '#c8356a',
    heroImage: p('0840'),
    galleryImages: [p('1081'), p('1029'), p('1254'), p('1193')],
  },
  {
    id: 'monogram',
    slug: 'monogram',
    desenKey: 'MONOGRAM',
    name: 'Monogram',
    subtitle: 'İmzanın Gücü',
    description: "M'Éternelle'in kadife imzası kumaşa işlenmiş. Monogram koleksiyonu, markanın özgün logosunu ürünün her köşesine taşıyor — bu yalnızca bir desen değil, bir manifesto.",
    philosophy: "İmzanı taş. M'Éternelle Monogram, seni sen yapanı görünür kılıyor.",
    color: '#2c2c2c',
    heroImage: p('0378'),
    galleryImages: [p('0529'), p('2054'), p('1852'), p('1709')],
  },
]

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find(c => c.slug === slug)
}

export function getCollectionByDesenKey(key: string): Collection | undefined {
  return collections.find(c => c.desenKey === key)
}
