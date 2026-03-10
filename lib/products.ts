// lib/products.ts — M'ÉTERNELLE
// Güncelleme: collection + is_monogram ayrımı yapıldı
// Tüm fotoğraflar görsel olarak incelenerek eşleştirildi
// Kullanılmayan 10 fotoğraf ilgili ürünlere eklendi

export type Collection = 'PAVO' | 'ROSEA' | 'VAS' | 'VIRIDIS'
export type Category = 'kimono' | 'gomlek' | 'kaftan' | 'bluz' | 'atlet' | 'sort' | 'pantolon' | 'elbise'

export type Product = {
  id: string
  slug: string
  code: string
  name: string
  description: string
  price: number
  collection: Collection        // renk ailesine göre koleksiyon — HER ZAMAN mevcut
  is_monogram: boolean          // logo/isim tekrar eden desen mi?
  pattern: string               // kumaş desen açıklaması
  category: Category
  beden: string[]
  image: string                 // ana görsel (koleksiyon önizlemede kullanılır)
  images: string[]              // tüm görseller
  in_stock: boolean
}

const BASE = '/images/products/cekimler'
const p = (num: string) => `${BASE}/Méternelle Çekim${num}-Edit.jpg`
const p2 = (num: string) => `${BASE}/Méternelle Çekim${num}-Edit-2.jpg`
// Bazı çekimler -Edit-Edit-2 formatında
const p3 = (num: string) => `${BASE}/Méternelle Çekim${num}-Edit-Edit-2.jpg`

export const products: Product[] = [

  // ══════════════════════════════════════
  // PAVO — şeftali/turuncu + tavuskuşu desen
  // ══════════════════════════════════════

  {
    // 0120-0243: beyaz+yeşil kenarlı kısa kimono — PAV Orta Boy Kimono
    id: 'pav-td-ok',
    slug: 'pav-kimono-orta-tavuskusu',
    code: 'S2-TD-OK-M-5',
    name: 'Pavo Orta Boy Kimono',
    description: 'Tavuskuşu desenli, yeşil kenar detaylı orta boy kimono. Bel bağcıklı, rahat kesim.',
    price: 2800,
    collection: 'PAVO',
    is_monogram: false,
    pattern: 'Tavuskuşu Desen',
    category: 'kimono',
    beden: ['M'],
    image: p('0120'),
    images: [p('0120'), p('0127'), p('0171'), p('0197'), p('0243')],
    in_stock: true,
  },
  {
    // 0348+0362: beyaz+yeşil kenarlı uzun kimono solo
    id: 'pav-td-uk',
    slug: 'pav-kimono-uzun-tavuskusu',
    code: 'S2-TD-UK-M-5',
    name: 'Pavo Uzun Boy Kimono',
    description: 'Tavuskuşu desenli, yeşil kenar detaylı uzun boy kimono. Bel bağcıklı, akıcı silüet.',
    price: 3200,
    collection: 'PAVO',
    is_monogram: false,
    pattern: 'Tavuskuşu Desen',
    category: 'kimono',
    beden: ['M'],
    image: p('0348'),
    images: [p('0348'), p('0362'), p('0341'), p('0329')],
    in_stock: true,
  },
  {
    // 1919+1900: şeftali hakim yaka gömlek
    id: 'pav-td-st',
    slug: 'pav-gomlek-hakim-tavuskusu',
    code: 'S2-TD-ST-S/M-5',
    name: 'Pavo Hakim Yaka Gömlek',
    description: 'Tavuskuşu desenli hakim yaka gömlek. Şeftali kenar detaylı, düğmeli ön kapama.',
    price: 2400,
    collection: 'PAVO',
    is_monogram: false,
    pattern: 'Tavuskuşu Desen',
    category: 'gomlek',
    beden: ['S/M', 'L/XL'],
    image: p('1919'),
    images: [p('1919'), p('1900')],
    in_stock: true,
  },
  {
    // 1559+1580: şeftali atlet solo
    // 1545: şeftali atlet + Vas şort cross-combo (atlet baskın)
    id: 'pav-ya-at',
    slug: 'pav-atlet-yavruagzi',
    code: 'S2-YA-AT-S/M-5',
    name: 'Pavo Atlet',
    description: 'Düz yavruağzı rengi, saten dokulu atlet. İnce askılı, V yaka.',
    price: 1200,
    collection: 'PAVO',
    is_monogram: false,
    pattern: 'Düz Yavruağzı',
    category: 'atlet',
    beden: ['S/M', 'L/XL'],
    image: p('1559'),
    images: [p('1559'), p('1580'), p('1545'), p('2128'), p('1630')],
    in_stock: true,
  },
  {
    // 2128: şeftali şort baskın combo
    id: 'pav-ya-sh',
    slug: 'pav-sort-yavruagzi',
    code: 'S2-YA-SH-S/M-5',
    name: 'Pavo Şort',
    description: 'Düz yavruağzı rengi, saten dokulu şort. Elastik bel, rahat kesim.',
    price: 1400,
    collection: 'PAVO',
    is_monogram: false,
    pattern: 'Düz Yavruağzı',
    category: 'sort',
    beden: ['S/M', 'L/XL'],
    image: p('2128'),
    images: [p('2128'), p('1630'), p('1559'), p('1580')],
    in_stock: true,
  },
  {
    // 1970+1959: şeftali pantolon solo
    id: 'pav-ya-pt',
    slug: 'pav-pantolon-yavruagzi',
    code: 'S2-YA-PT-S/M-5',
    name: 'Pavo Pantolon',
    description: 'Düz yavruağzı rengi, saten dokulu bol paça pantolon. Elastik bel, ipli bağcık.',
    price: 1800,
    collection: 'PAVO',
    is_monogram: false,
    pattern: 'Düz Yavruağzı',
    category: 'pantolon',
    beden: ['S/M', 'L/XL'],
    image: p('1970'),
    images: [p('1970'), p('1959'), p('2128'), p('1919')],
    in_stock: true,
  },
  {
    // 2054+2099: şeftali monogram elbise
    // 2426: monogram elbise önden (eklendi)
    // 2488: monogram elbise arkadan (eklendi)
    id: 'pav-ya-dr',
    slug: 'pav-elbise-yavruagzi-monogram',
    code: 'S2-YA-DR-S/M-5',
    name: 'Pavo Monogram Kalın Askılı V Yaka Elbise',
    description: "Yavruağzı monogram desenli, kalın askılı V yaka elbise. Midi boy, M'Éternelle imzalı baskı.",
    price: 2200,
    collection: 'PAVO',
    is_monogram: true,
    pattern: 'Yavruağzı Monogram',
    category: 'elbise',
    beden: ['S/M', 'L/XL'],
    image: p('2054'),
    images: [p('2054'), p('2099'), p('2426'), p('2488')],
    in_stock: true,
  },

  // ══════════════════════════════════════
  // ROSEA — fuşya/pembe
  // ══════════════════════════════════════

  {
    // 1081+1047+1102+1132: fuşya kaftan
    id: 'rosea-bd-cf',
    slug: 'rosea-kaftan-hakim-balikli',
    code: 'S2-BD-CF-S/M-5',
    name: 'Rosea Hakim Yaka Kaftan',
    description: 'Eteği sulu balıklı desenli, fuşya kenar detaylı hakim yaka kaftan. Uzun boy, düğmeli ön kapama.',
    price: 3600,
    collection: 'ROSEA',
    is_monogram: false,
    pattern: 'Eteği Sulu Balıklı Desen',
    category: 'kaftan',
    beden: ['S/M', 'L/XL'],
    image: p('1081'),
    images: [p('1081'), p('1047'), p('1102'), p('1132')],
    in_stock: true,
  },
  {
    // 0840+0878+0892: pembe çizgisel kısa kimono
    // 0952: arkadan görünüm (eklendi)
    id: 'rosea-pcd-kk',
    slug: 'rosea-kimono-kisa-pembe-cizgisel',
    code: 'S2-PCD-KK-M-5',
    name: 'Rosea Kısa Boy Kimono',
    description: 'Pembe çizgisel desenli, fuşya kenar detaylı kısa boy kimono. Bel bağcıklı.',
    price: 2600,
    collection: 'ROSEA',
    is_monogram: false,
    pattern: 'Pembe Çizgisel Desen',
    category: 'kimono',
    beden: ['M'],
    image: p('0840'),
    images: [p('0840'), p('0878'), p('0892'), p('0952')],
    in_stock: true,
  },
  {
    // 1029+1034+1138: pembe çizgisel uzun kimono
    id: 'rosea-pcd-uk',
    slug: 'rosea-kimono-uzun-pembe-cizgisel',
    code: 'S2-PCD-UK-M-5',
    name: 'Rosea Uzun Boy Kimono',
    description: 'Pembe çizgisel desenli, fuşya kenar detaylı uzun boy kimono. Bel bağcıklı, görkemli silüet.',
    price: 3000,
    collection: 'ROSEA',
    is_monogram: false,
    pattern: 'Pembe Çizgisel Desen',
    category: 'kimono',
    beden: ['M'],
    image: p('1029'),
    images: [p('1029'), p('1034'), p('1138')],
    in_stock: true,
  },
  {
    // 0780+0802+0769: pembe çizgisel şort
    // 0952: kısa kimono+şort arkadan combo (eklendi)
    id: 'rosea-pcd-sh',
    slug: 'rosea-sort-pembe-cizgisel',
    code: 'S2-PCD-SH-S/M-5',
    name: 'Rosea Şort',
    description: 'Pembe çizgisel desenli şort. Elastik bel, paisley baskılı kumaş.',
    price: 1600,
    collection: 'ROSEA',
    is_monogram: false,
    pattern: 'Pembe Çizgisel Desen',
    category: 'sort',
    beden: ['S/M', 'L/XL'],
    image: p('0780'),
    images: [p('0780'), p('0802'), p('0769'), p('0952')],
    in_stock: true,
  },
  {
    // 1193: fuşya bluz solo
    // 1197: fuşya bluz+pantolon combo (eklendi)
    id: 'rosea-dp-bl',
    slug: 'rosea-bluz-duz-pembe',
    code: 'S2-DP-BL-S/M-5',
    name: 'Rosea Bluz',
    description: 'Düz fuşya pembe, saten dokulu bluz. Kayık yaka, rahat kesim.',
    price: 1400,
    collection: 'ROSEA',
    is_monogram: false,
    pattern: 'Düz Pembe',
    category: 'bluz',
    beden: ['S/M', 'L/XL'],
    image: p('1193'),
    images: [p('1193'), p('1197'), p('1205'), p('1258')],
    in_stock: true,
  },
  {
    // 1205: fuşya bluz+PANTOLON combo — pantolon baskın
    // 1197: bluz+pantolon combo (eklendi)
    id: 'rosea-dp-pt',
    slug: 'rosea-pantolon-duz-pembe',
    code: 'S2-DP-PT-S/M-5',
    name: 'Rosea Pantolon',
    description: 'Düz fuşya pembe, saten dokulu bol paça pantolon. Elastik bel.',
    price: 1800,
    collection: 'ROSEA',
    is_monogram: false,
    pattern: 'Düz Pembe',
    category: 'pantolon',
    beden: ['S/M', 'L/XL'],
    image: p('1205'),
    images: [p('1205'), p('1197'), p('1193')],
    in_stock: true,
  },
  {
    // 0769: rosea atlet combo (atlet baskın, çizgisel şort ile)
    id: 'rosea-dp-at',
    slug: 'rosea-atlet-duz-pembe',
    code: 'S2-DP-AT-S/M-5',
    name: 'Rosea Atlet',
    description: 'Düz fuşya pembe, saten dokulu atlet. İnce askılı, yuvarlak yaka.',
    price: 1200,
    collection: 'ROSEA',
    is_monogram: false,
    pattern: 'Düz Pembe',
    category: 'atlet',
    beden: ['S/M', 'L/XL'],
    image: p('0769'),
    images: [p('0769'), p('0780'), p('1193'), p('1205')],
    in_stock: true,
  },
  {
    // 1254: fuşya V yaka elbise (tent dress)
    id: 'rosea-dp-dr',
    slug: 'rosea-elbise-duz-pembe',
    code: 'S2-DP-DR-S/M-5',
    name: 'Rosea Kalın Askılı V Yaka Elbise',
    description: 'Düz fuşya pembe, saten dokulu kalın askılı V yaka elbise. Midi boy.',
    price: 2200,
    collection: 'ROSEA',
    is_monogram: false,
    pattern: 'Düz Pembe',
    category: 'elbise',
    beden: ['S/M', 'L/XL'],
    image: p('1254'),
    images: [p('1254'), p2('1311')],
    in_stock: true,
  },

  // ══════════════════════════════════════
  // VAS — lila/mor
  // ══════════════════════════════════════

  {
    // 1349+1365: paisley şal desenli kısa kimono
    // 2389: yandan görünüm (eklendi)
    id: 'vas-sd-kk',
    slug: 'vas-kimono-kisa-sal',
    code: 'S2-SD-KK-M-5',
    name: 'Vas Kısa Boy Kimono',
    description: 'Şal desenli, lila kenar detaylı kısa boy kimono. Bel bağcıklı, renkli paisley baskı.',
    price: 2600,
    collection: 'VAS',
    is_monogram: false,
    pattern: 'Şal Desen',
    category: 'kimono',
    beden: ['M'],
    image: p('1349'),
    images: [p('1349'), p('1365'), p('2389')],
    in_stock: true,
  },
  {
    // 2101+2275+2237+2337+2355: paisley şal desenli uzun kimono
    // 2198: Pavo outfit üstüne açık önden (eklendi)
    // 2289: arkadan görünüm (eklendi)
    id: 'vas-sd-uk',
    slug: 'vas-kimono-uzun-sal',
    code: 'S2-SD-UK-M-5',
    name: 'Vas Uzun Boy Kimono',
    description: 'Şal desenli, lila kenar detaylı uzun boy kimono. Bel bağcıklı, görkemli akış.',
    price: 3000,
    collection: 'VAS',
    is_monogram: false,
    pattern: 'Şal Desen',
    category: 'kimono',
    beden: ['M'],
    image: p('2101'),
    images: [p('2101'), p('2275'), p('2237'), p('2337'), p('2355'), p2('2198'), p3('2289')],
    in_stock: true,
  },
  {
    // 1460+1465+1520+1535: şal desenli bluz
    id: 'vas-sd-bl',
    slug: 'vas-bluz-sal',
    code: 'S2-SD-BL-S/M-5',
    name: 'Vas Bluz',
    description: 'Şal desenli bluz. Asimetrik kesim, saten dokulu, renkli paisley baskı.',
    price: 1600,
    collection: 'VAS',
    is_monogram: false,
    pattern: 'Şal Desen',
    category: 'bluz',
    beden: ['S/M', 'L/XL'],
    image: p('1460'),
    images: [p('1460'), p('1465'), p('1520'), p('1535')],
    in_stock: true,
  },
  {
    // 1405: şal desenli şort+bluz combo — şort baskın
    // 1545: Pavo atlet + Vas şort cross-combo (eklendi)
    id: 'vas-sd-sh',
    slug: 'vas-sort-sal',
    code: 'S2-SD-SH-S/M-5',
    name: 'Vas Şort',
    description: 'Şal desenli şort. Elastik bel, renkli paisley baskılı kumaş.',
    price: 1600,
    collection: 'VAS',
    is_monogram: false,
    pattern: 'Şal Desen',
    category: 'sort',
    beden: ['S/M', 'L/XL'],
    image: p('1405'),
    images: [p('1405'), p('1545'), p('1349'), p('1365')],
    in_stock: true,
  },
  {
    // 1709+1713: lila bluz solo
    id: 'vas-dl-bl',
    slug: 'vas-bluz-duz-lila',
    code: 'S2-DL-BL-S/M-5',
    name: 'Vas Bluz',
    description: 'Düz lila, saten dokulu bluz. Kayık yaka, rahat kesim.',
    price: 1400,
    collection: 'VAS',
    is_monogram: false,
    pattern: 'Düz Lila',
    category: 'bluz',
    beden: ['S/M', 'L/XL'],
    image: p('1709'),
    images: [p('1709'), p('1713'), p('1738'), p('1789')],
    in_stock: true,
  },
  {
    // 1789+1769: lila atlet solo
    id: 'vas-dl-at',
    slug: 'vas-atlet-duz-lila',
    code: 'S2-DL-AT-S/M-5',
    name: 'Vas Atlet',
    description: 'Düz lila, saten dokulu atlet. İnce askılı, yuvarlak yaka.',
    price: 1200,
    collection: 'VAS',
    is_monogram: false,
    pattern: 'Düz Lila',
    category: 'atlet',
    beden: ['S/M', 'L/XL'],
    image: p('1789'),
    images: [p('1789'), p('1769'), p('1738')],
    in_stock: true,
  },
  {
    // 1738+1663+1670: lila pantolon solo
    id: 'vas-dl-pt',
    slug: 'vas-pantolon-duz-lila',
    code: 'S2-DL-PT-S/M-5',
    name: 'Vas Pantolon',
    description: 'Düz lila, saten dokulu bol paça pantolon. Elastik bel.',
    price: 1800,
    collection: 'VAS',
    is_monogram: false,
    pattern: 'Düz Lila',
    category: 'pantolon',
    beden: ['S/M', 'L/XL'],
    image: p('1738'),
    images: [p('1738'), p('1663'), p('1670'), p('1709'), p('1713')],
    in_stock: true,
  },
  {
    // 1670+1663: lila monogram pantolon
    id: 'vas-lm-pt',
    slug: 'vas-pantolon-lila-monogram',
    code: 'S2-LM-PT-S/M-5',
    name: 'Vas Monogram Pantolon',
    description: "Lila monogram desenli bol paça pantolon. Elastik bel, M'Éternelle imzalı baskı.",
    price: 2000,
    collection: 'VAS',
    is_monogram: true,
    pattern: 'Lila Monogram',
    category: 'pantolon',
    beden: ['S/M', 'L/XL'],
    image: p('1670'),
    images: [p('1670'), p('1663'), p('1738')],
    in_stock: true,
  },
  {
    // 1852+1633: lila monogram elbise
    id: 'vas-lm-dr',
    slug: 'vas-elbise-lila-monogram',
    code: 'S2-LM-DR-S/M-5',
    name: 'Vas Monogram Kalın Askılı V Yaka Elbise',
    description: "Lila monogram desenli kalın askılı V yaka elbise. Midi boy, M'Éternelle imzalı baskı.",
    price: 2200,
    collection: 'VAS',
    is_monogram: true,
    pattern: 'Lila Monogram',
    category: 'elbise',
    beden: ['S/M', 'L/XL'],
    image: p('1852'),
    images: [p('1852'), p('1633')],
    in_stock: true,
  },

  // ══════════════════════════════════════
  // VİRİDİS — koyu yeşil
  // ══════════════════════════════════════

  {
    // Viridis balıklı kimono — elbise görseli proxy
    id: 'viridis-bd-ok',
    slug: 'viridis-kimono-orta-balikli',
    code: 'S2-BD-OK-M-5',
    name: 'Viridis Orta Boy Kimono',
    description: 'Eteği sulu balıklı desenli, viridis yeşil kenar detaylı orta boy kimono. Bel bağcıklı.',
    price: 2800,
    collection: 'VIRIDIS',
    is_monogram: false,
    pattern: 'Eteği Sulu Balıklı Desen',
    category: 'kimono',
    beden: ['M'],
    image: p('0461'),
    images: [p('0461'), p('0501'), p('0690')],
    in_stock: true,
  },
  {
    // 0378+0399+0413+0454: yeşil monogram hakim yaka gömlek
    // 0740: arkadan görünüm (eklendi)
    id: 'viridis-ym-st',
    slug: 'viridis-gomlek-yesil-monogram',
    code: 'S2-YM-ST-S/M-5',
    name: 'Viridis Monogram Hakim Yaka Gömlek',
    description: "Yeşil monogram desenli hakim yaka gömlek. Viridis yeşil kenar detaylı, düğmeli ön kapama. M'Éternelle imzalı baskı.",
    price: 2400,
    collection: 'VIRIDIS',
    is_monogram: true,
    pattern: 'Yeşil Monogram',
    category: 'gomlek',
    beden: ['S/M', 'L/XL'],
    image: p('0378'),
    images: [p('0378'), p('0399'), p('0413'), p('0454'), p('0740'), p('0681'), p('0690'), p('0699')],
    in_stock: true,
  },
  {
    // 0529+0521+0604: yeşil monogram elbise
    id: 'viridis-ym-dr',
    slug: 'viridis-elbise-yesil-monogram',
    code: 'S2-YM-DR-S/M-5',
    name: 'Viridis Monogram Kalın Askılı V Yaka Elbise',
    description: "Yeşil monogram desenli kalın askılı V yaka elbise. Midi boy, M'Éternelle imzalı baskı.",
    price: 2200,
    collection: 'VIRIDIS',
    is_monogram: true,
    pattern: 'Yeşil Monogram',
    category: 'elbise',
    beden: ['S/M', 'L/XL'],
    image: p('0529'),
    images: [p('0529'), p('0521'), p('0604')],
    in_stock: true,
  },
  {
    // 0639+0641: yeşil bluz solo
    id: 'viridis-dy-bl',
    slug: 'viridis-bluz-duz-yesil',
    code: 'S2-DY-BL-S/M-5',
    name: 'Viridis Bluz',
    description: 'Düz viridis yeşil, saten dokulu bluz. Kayık yaka, rahat kesim.',
    price: 1400,
    collection: 'VIRIDIS',
    is_monogram: false,
    pattern: 'Düz Yeşil',
    category: 'bluz',
    beden: ['S/M', 'L/XL'],
    image: p('0639'),
    images: [p('0639'), p('0641'), p2('0655'), p('0676')],
    in_stock: true,
  },
  {
    // 0676: yeşil pantolon baskın combo
    id: 'viridis-dy-pt',
    slug: 'viridis-pantolon-duz-yesil',
    code: 'S2-DY-PT-S/M-5',
    name: 'Viridis Pantolon',
    description: 'Düz viridis yeşil, saten dokulu bol paça pantolon. Elastik bel, ipli bağcık.',
    price: 1800,
    collection: 'VIRIDIS',
    is_monogram: false,
    pattern: 'Düz Yeşil',
    category: 'pantolon',
    beden: ['S/M', 'L/XL'],
    image: p('0676'),
    images: [p('0676'), p('0641'), p('0639'), p2('0655')],
    in_stock: true,
  },
  {
    // 0309+0318: yeşil atlet solo
    // 0279: atlet+şort combo (eklendi)
    id: 'viridis-dy-at',
    slug: 'viridis-atlet-duz-yesil',
    code: 'S2-DY-AT-S/M-5',
    name: 'Viridis Atlet',
    description: 'Düz viridis yeşil, saten dokulu atlet. İnce askılı, yuvarlak yaka.',
    price: 1200,
    collection: 'VIRIDIS',
    is_monogram: false,
    pattern: 'Düz Yeşil',
    category: 'atlet',
    beden: ['S/M', 'L/XL'],
    image: p('0309'),
    images: [p('0309'), p('0318'), p('0279'), p('0641'), p('0639')],
    in_stock: true,
  },
  {
    // 0318: yeşil şort solo
    // 0279: atlet+şort combo (eklendi)
    id: 'viridis-dy-sh',
    slug: 'viridis-sort-duz-yesil',
    code: 'S2-DY-SH-S/M-5',
    name: 'Viridis Şort',
    description: 'Düz viridis yeşil, saten dokulu şort. Elastik bel, rahat kesim.',
    price: 1400,
    collection: 'VIRIDIS',
    is_monogram: false,
    pattern: 'Düz Yeşil',
    category: 'sort',
    beden: ['S/M', 'L/XL'],
    image: p('0318'),
    images: [p('0318'), p('0309'), p('0279'), p('0641'), p('0639')],
    in_stock: true,
  },
  {
    // 0461+0501: yeşil V yaka elbise solo
    id: 'viridis-dy-dr',
    slug: 'viridis-elbise-duz-yesil',
    code: 'S2-DY-DR-S/M-5',
    name: 'Viridis Kalın Askılı V Yaka Elbise',
    description: 'Düz viridis yeşil, saten dokulu kalın askılı V yaka elbise. Midi boy.',
    price: 2200,
    collection: 'VIRIDIS',
    is_monogram: false,
    pattern: 'Düz Yeşil',
    category: 'elbise',
    beden: ['S/M', 'L/XL'],
    image: p('0461'),
    images: [p('0461'), p('0501')],
    in_stock: true,
  },
]

// ─── HELPERS ─────────────────────────────────────────────────

export function getAllProducts(): Product[] {
  return products
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

/**
 * Koleksiyona göre filtrele — monogram ürünler DAHİL
 * "Pavo Koleksiyon" tıklandığında Pavo'nun monogramlıları da gelir
 */
export function getProductsByCollection(collection: Collection): Product[] {
  return products.filter(p => p.collection === collection)
}

/**
 * Sadece monogram ürünler — tüm koleksiyonlardan
 * "Monogram" filtresi tıklandığında kullanılır
 */
export function getMonogramProducts(): Product[] {
  return products.filter(p => p.is_monogram)
}

/**
 * Koleksiyon + monogram filtresi birlikte
 * Örn: Viridis koleksiyonundaki monogram ürünler
 */
export function getProductsByCollectionAndMonogram(collection: Collection, monogramOnly?: boolean): Product[] {
  return products.filter(p => {
    if (p.collection !== collection) return false
    if (monogramOnly && !p.is_monogram) return false
    return true
  })
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter(p => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  const slugs = [
    'pav-kimono-orta-tavuskusu',
    'vas-kimono-uzun-sal',
    'viridis-gomlek-yesil-monogram',
    'rosea-kaftan-hakim-balikli',
    'viridis-elbise-duz-yesil',
    'vas-elbise-lila-monogram',
  ]
  return slugs.map(slug => getProductBySlug(slug)).filter(Boolean) as Product[]
}

// ─── KOLEKSIYON RENK & LABEL ─────────────────────────────────

export const COLLECTION_COLORS: Record<Collection, string> = {
  'PAVO': '#e8956d',
  'VAS': '#b8a8c8',
  'VIRIDIS': '#1a4a3a',
  'ROSEA': '#c8356a',
}

export const COLLECTION_LABELS: Record<Collection, string> = {
  'PAVO': 'Pavo',
  'VAS': 'Vas',
  'VIRIDIS': 'Viridis',
  'ROSEA': 'Rosea',
}

export const MONOGRAM_COLOR = '#2c2c2c'
export const MONOGRAM_LABEL = 'Monogram'

export const CATEGORY_LABELS: Record<Category, string> = {
  'kimono': 'Kimono',
  'gomlek': 'Gömlek',
  'kaftan': 'Kaftan',
  'bluz': 'Bluz',
  'atlet': 'Atlet',
  'sort': 'Şort',
  'pantolon': 'Pantolon',
  'elbise': 'Elbise',
}

// ─── BACKWARD COMPAT (eski desen field'ı kullanan componentler için) ───

/** @deprecated collection + is_monogram kullanın */
export type Desen = 'PAV' | 'VAS' | 'VİRİDİS' | 'ROSEA' | 'MONOGRAM'

/** @deprecated getProductsByCollection veya getMonogramProducts kullanın */
export function getProductsByDesen(desen: Desen): Product[] {
  if (desen === 'MONOGRAM') return getMonogramProducts()
  const collectionMap: Record<string, Collection> = {
    'PAV': 'PAVO',
    'VAS': 'VAS',
    'VİRİDİS': 'VIRIDIS',
    'ROSEA': 'ROSEA',
  }
  return getProductsByCollection(collectionMap[desen])
}

/** @deprecated COLLECTION_COLORS kullanın */
export const DESEN_COLORS: Record<Desen, string> = {
  'PAV': '#e8956d',
  'VAS': '#b8a8c8',
  'VİRİDİS': '#1a4a3a',
  'ROSEA': '#c8356a',
  'MONOGRAM': '#2c2c2c',
}

/** @deprecated COLLECTION_LABELS kullanın */
export const DESEN_LABELS: Record<Desen, string> = {
  'PAV': 'Pavo',
  'VAS': 'Vas',
  'VİRİDİS': 'Viridis',
  'ROSEA': 'Rosea',
  'MONOGRAM': 'Monogram',
}
