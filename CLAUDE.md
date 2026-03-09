# M'ÉTERNELLE — Meternelle Demo Website

## Project Overview
Premium e-commerce landing page for M'ÉTERNELLE, a luxury women's sleepwear and comfort clothing brand owned by Melike. Built with Next.js (App Router), Tailwind CSS v4, TypeScript, and Framer Motion.

**Local path:** `C:\Users\MSI\OneDrive\Masaüstü\meternelle-demo`
**GitHub:** https://github.com/Sameth1/meternelle-demo
**Target:** Zero-cost build to replace a €22K competitor quote

---

## Brand Identity

**Name:** M'ÉTERNELLE  
**Slogan:** "Touch the body and soul"  
**Philosophy:** "Bir dokunuş ruhunuzu sarabiliyorsa, o dokunuş sonsuza dek sizinle kalır."  
**Vibe:** Warm morning light, soft bossa nova, personal care rituals. Celine / Hermès / Apple-level minimalism.

**Color Palette (CSS vars in globals.css):**
- `--cream: #f7f4ef` — primary background
- `--cream-light: #fcfaf7` — section background
- `--pastel-pink: #f5e8e8` — subtle accent
- `--beige: #eae5dc` — borders/dividers
- `--stone: #d6d1c8` — borders
- `--anthracite: #3d3d3d` — primary text
- `--anthracite-soft: #5a5a5a` — secondary text

**Typography:**
- Headings: `Playfair Display` → `var(--font-playfair)`
- Body/UI: `Cormorant Garamond` → `var(--font-cormorant)`

**Brand files (read-only, do not modify):**
- `Meternelle/Meternelle.docx` — brand story, target audience
- `Meternelle/Marka Çalışmaları.docx` — brand strategy
- `Meternelle/Meternelle_Logo.pdf` — logo
- `Meternelle/Meternelle_Logo-Bodycopy.pdf` — logo with bodycopy

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 16.x (App Router) | Framework |
| React | 19.x | UI |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Framer Motion | 12.x | Animations |
| Supabase | (next task) | Database + Auth |

---

## Current File Structure

```
app/
  components/
    Hero.tsx          ✅ DO NOT TOUCH — complete
    Philosophy.tsx    ✅ DO NOT TOUCH — complete
    ProductShowcase.tsx ✅ DO NOT TOUCH — complete
    Footer.tsx        ✅ DO NOT TOUCH — complete
  globals.css         ✅ DO NOT TOUCH — brand palette set
  layout.tsx          ✅ DO NOT TOUCH — fonts configured
  page.tsx            ✅ DO NOT TOUCH — main page assembly
  aria/
    page.tsx          — ARIA page (separate feature)
components/
  ARIAMentor.jsx      — ARIA component (separate feature)
Meternelle/           — Brand asset files (READ ONLY)
next.config.ts        — Remote image patterns configured
```

---

## Design Rules (NEVER break these)

1. **No new fonts** — only Playfair Display and Cormorant Garamond
2. **No new colors** — only the 6 palette vars above
3. **No heavy shadows or borders** — always use `/50` or `/40` opacity
4. **Animations** — Framer Motion only, smooth ease `[0.22, 1, 0.36, 1]`
5. **All text** — must be UTF-8, Turkish characters must render correctly
6. **Responsive** — mobile-first, test at 375px / 768px / 1280px
7. **No full black** — use `#3d3d3d` for dark text, never `#000000`

---

## Product Images

Currently using Unsplash placeholders. When meternelle.com becomes accessible, update image URLs in `app/components/ProductShowcase.tsx` → `products` array.

`next.config.ts` already has remote patterns for:
- `images.unsplash.com`
- `www.meternelle.com`
- `*.meternelle.com`

---

## Next Agent Task — Supabase Connection

Connect the project to Supabase for product data management.

**Steps:**
1. Install: `npm install @supabase/supabase-js`
2. Create `lib/supabase.ts` with client setup using env vars
3. Create `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Create `products` table in Supabase with columns: `id, name, price, image_url, category, slug`
5. Update `ProductShowcase.tsx` to fetch products from Supabase instead of the hardcoded `products` array
6. Add loading skeleton state while products fetch

**Success criteria:** `npm run build` passes with zero errors. Products render on page from Supabase data.

---

## Commands

```bash
# Development
npm run dev

# Build check (must pass before any commit)
npm run build

# Deploy (via Vercel — auto on push to main)
git add . && git commit -m "feat: description" && git push
```
