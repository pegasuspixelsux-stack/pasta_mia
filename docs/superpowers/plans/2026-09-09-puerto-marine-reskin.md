# Puerto — Marine Reskin + Content Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-theme the whole site (home, `/menu`, `/admin`) from a warm-terracotta Neapolitan-pizzeria template to a dark marine palette with Cormorant Garamond display type, and rewrite all copy from pizzeria to a Punta del Este seafood restaurant ("Puerto").

**Architecture:** The visual system is token-driven — `app/globals.css` defines semantic color tokens under Tailwind v4's `@theme`, and components use the generated utilities (`bg-canvas`, `text-ink`, `text-gold`, …) almost exclusively. Remapping token *values* (names unchanged) reskins ~90% of the site with no component edits. The remainder is a short list of hardcoded hex values, a display-font swap in `app/layout.tsx`, and copy that lives in `app/lib/*.ts` plus a handful of inline strings.

**Tech Stack:** Next.js 16.3.4 (App Router), React 19.2, Tailwind CSS v4 (`@theme` tokens, no config file), `next/font/google`, `motion` (Framer Motion successor). No test framework in the repo — verification is `npx tsc --noEmit`, `npm run lint`, `npm run build`, and manual visual review in `npm run dev`.

**Spec:** `docs/superpowers/specs/2026-09-09-puerto-marine-reskin-design.md`

## Global Constraints

- **Language:** Spanish (Uruguay) / español rioplatense. `<html lang="es">` (already set). **Voseo** in every CTA and direct address ("reservá", "contanos", "disfrutá") — never tuteo.
- **Local vocabulary:** "porción" (not "rebanada"), "refrescos" (not "gaseosa"), "entradas"/"minutas" for appetizers, "para retirar" for takeaway.
- **Token names never change** — only their values. `--color-gold` will hold a light blue after this work; that is intentional and documented in `DESIGN.md`.
- **Images:** only `images.unsplash.com` is allowed (`next.config.ts` `remotePatterns`). Use only the photo IDs listed in this plan — they are known to resolve (already used in the repo, or taken from the approved mockup). Do not invent new IDs.
- **No backend.** The reservation form and admin panel stay static mockups; do not add persistence.
- **AGENTS.md block in this file's directory:** `next dev` rewrites an agent-instructions block into `AGENTS.md`. If it reappears as an uncommitted change, commit it with the surrounding work — do not fight it.

---

### Task 1: Marine color tokens

**Files:**
- Modify: `app/globals.css:3-39` (the `@theme` block), `app/globals.css:89` (scrollbar hover)

**Interfaces:**
- Consumes: nothing.
- Produces: the full marine palette. Every later task's visual verification depends on these token values being live. Token utility names are unchanged (`bg-canvas`, `text-ink`, `text-gold`, `text-ocean`, `border-line`, `bg-shell`, `text-muted`, `text-faint`, `bg-mist`, `bg-sand`, `bg-gold-soft`, and the `adm-*` equivalents).

- [ ] **Step 1: Replace the color tokens in `@theme`**

In `app/globals.css`, replace lines 4-30 (the color-token comment block through `--color-adm-sidebar-deep`) with:

```css
  /* Marine palette — deep navy surfaces, cool near-white text, a light
     beacon-blue accent. Surfaces layer navy > deep navy > trench, front to
     back. NOTE: --color-gold and --color-ocean hold a light blue in this
     theme; the token names are kept for churn reasons — see DESIGN.md. */
  --color-canvas: #0d2a4d; /* primary surface — body, cards, nav */
  --color-mist: #0a2140; /* deeper section tint — Hero, Experiences, Footer */
  --color-sand: #071a33; /* deepest section — Reservation (card floats on it) */
  --color-shell: #1c3d63; /* steel — image placeholder, disabled fill */

  --color-ink: #f2f7fb; /* cool near-white — headings, primary text, solid buttons */
  --color-ink-soft: #dbe6f1; /* soft blue-white — secondary text */
  --color-muted: #aec3d8; /* cool grey-blue — body / supporting text */
  --color-faint: #89a1ba; /* dim slate — placeholders, fine print */
  --color-line: #22406a; /* steel hairline borders, dividers */

  --color-gold: #79c2e3; /* accent — brand dot, datelines, chevrons, stars, focus */
  --color-gold-soft: #a5dbef; /* lighter accent — accent hover */
  --color-ocean: #79c2e3; /* interactive — text links, active controls, focus ring */
  --color-ocean-deep: #a5dbef; /* link / control hover */

  /* Admin workspace — light management surface with the navy sidebar */
  --color-adm-bg: #fdfefe; /* soft-white workspace */
  --color-adm-panel: #ffffff; /* white cards, forms, tables */
  --color-adm-ink: #1b2a3d; /* cool near-black text */
  --color-adm-muted: #5a6b7d; /* secondary text */
  --color-adm-faint: #8a99a8; /* fine print, placeholders */
  --color-adm-border: #e2e8ef; /* hairlines, dividers */
  --color-adm-sidebar: #0d2a4d; /* navy sidebar */
  --color-adm-sidebar-deep: #0a2140; /* sidebar hover / active */
```

- [ ] **Step 2: Fix the scrollbar hover color**

In `app/globals.css`, line ~89, inside `::-webkit-scrollbar-thumb:hover`:

```css
  ::-webkit-scrollbar-thumb:hover {
    background: #2f5a86;
  }
```

(was `#b5604d`)

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors (CSS is not type-checked; this just confirms nothing else broke). Then run `npm run build` — Expected: build succeeds.

- [ ] **Step 4: Visual check**

Run `npm run dev`, open `http://localhost:3000`. Expected: the whole page is deep navy instead of terracotta; text is cool near-white; the brand dot after "Pizzeria" and the review stars are light blue. Hairlines are steel. (Copy still says "Pizzeria" — that is fixed later.)

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "Reskin: marine color tokens"
```

---

### Task 2: Display font → Cormorant Garamond + layout metadata

**Files:**
- Modify: `app/layout.tsx` (whole file), `app/globals.css:32-34` (`--font-display` fallback)

**Interfaces:**
- Consumes: nothing.
- Produces: `--ff-display` now resolves to Cormorant Garamond; `font-display` utility unchanged. Site metadata now describes Puerto.

- [ ] **Step 1: Rewrite `app/layout.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--ff-display",
  display: "swap",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--ff-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://puerto.example"),
  title: "Puerto — Cocina de mar sobre el muelle, Punta del Este",
  description:
    "Un restaurante de mar en el puerto de Punta del Este, Uruguay. Pesca del día, mariscos, pastas marineras y parrilla, frente a los barcos. Mediodía en la terraza, cocina hasta tarde.",
  openGraph: {
    title: "Puerto — Punta del Este",
    description:
      "Cocina de mar sobre el muelle. Reservá una mesa frente al puerto.",
    type: "website",
    locale: "es_UY",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-dvh bg-canvas font-sans text-ink">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Update the font fallback stack in `app/globals.css`**

Lines ~32-34, replace the `--font-display` declaration with:

```css
  --font-display: var(--ff-display), "Cormorant Garamond", ui-serif, Georgia,
    serif;
```

- [ ] **Step 3: Verify build (fetches the font)**

Run: `npm run build`
Expected: build succeeds; no `next/font` error about missing `weight`. If it fails with a weight/style error, confirm the `weight` array is `["400", "600", "700"]` and `style` is `["normal", "italic"]`.

- [ ] **Step 4: Visual check**

`npm run dev` → the hero headline and all section headings now render in Cormorant Garamond (a high-contrast serif, thinner strokes than the previous Playfair). Headings may look light — that is fixed in Task 4.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "Reskin: Cormorant Garamond display font + Puerto metadata"
```

---

### Task 3: Hardcoded hex cleanup

**Files:**
- Modify: `app/components/Reservation.tsx:215,219`, `app/components/Gallery.tsx:44`, `app/components/admin/AdminLogin.tsx:34,36,110,118`

**Interfaces:**
- Consumes: Task 1 token values (for matching tones).
- Produces: no warm hex left in rendered surfaces.

- [ ] **Step 1: `Reservation.tsx` — `<option>` colors**

Line ~215 and ~219, the two `<option>` elements. Change `bg-[#2b1710]` → `bg-[#0a2140]` and `text-[#fdfbf7]` → `text-[#f2f7fb]`:

```tsx
        <option value="" disabled className="bg-[#0a2140] text-faint">
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0a2140] text-[#f2f7fb]">
            {o}
          </option>
        ))}
```

- [ ] **Step 2: `Gallery.tsx` — caption text color**

Line ~44, `text-[#fdfbf7]` → `text-[#f2f7fb]`:

```tsx
                <span className="text-[0.82rem] font-semibold tracking-wide text-[#f2f7fb]">
```

- [ ] **Step 3: `AdminLogin.tsx` — warm overlays and error/button colors**

- Line ~34: `from-[#2a140d]/55 via-[#2a140d]/55 to-[#2a140d]/85` → `from-[#071a33]/55 via-[#071a33]/55 to-[#071a33]/85`
- Line ~36: both `bg-[#1f0f0a]/70` and `md:bg-[#1f0f0a]/80` → `bg-[#0a2140]/70` and `md:bg-[#0a2140]/80`
- Line ~110: `text-[#f0a789]` → `text-[#f0a9a9]`
- Line ~118: `text-[#2a140d]` → `text-[#0d2a4d]`

- [ ] **Step 4: Confirm nothing warm remains**

Run: `rg -n "#(2b1710|fdfbf7|2a140d|1f0f0a|f0a789|b5604d|8b3a2b|7c2d12|6b2410|a04735|f5c542|ffd166|f0e6da|e5d5c5|d9c6b2|9e5140)" app/`
Expected: **no matches.** (The `rgba(15,23,42,…)` shadows in `SiteHeader.tsx` and `Reservation.tsx` are neutral slate and intentionally kept — they are not in this list.)

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` — Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add app/components/Reservation.tsx app/components/Gallery.tsx app/components/admin/AdminLogin.tsx
git commit -m "Reskin: replace hardcoded warm hex with marine equivalents"
```

---

### Task 4: Bump display heading weight to 600

**Files:**
- Modify: `app/components/Hero.tsx:30`, `app/components/Narrative.tsx:11`, `app/components/Experiences.tsx:19,60`, `app/components/Atmosphere.tsx:29`, `app/components/Reviews.tsx:12`, `app/components/Gallery.tsx:20`, `app/components/Reservation.tsx:45`, `app/components/MenuBrowser.tsx:51`, `app/menu/page.tsx:19`, `app/components/admin/AdminLogin.tsx:48`

**Interfaces:**
- Consumes: Task 2 (Cormorant loaded at weight 600).
- Produces: headings render at semibold. No API change.

Cormorant Garamond is lighter than Playfair at the same weight; every heading that pairs `font-display` with `font-medium` moves to `font-semibold`.

- [ ] **Step 1: Replace `font-medium` → `font-semibold` on display headings**

In each file/line below, the heading element combines `font-display` with `font-medium`. Change only that one class to `font-semibold`. Leave body text and non-display elements alone.

- `Hero.tsx:30` — the `<h1>` (`font-display text-[clamp(2.7rem,7.6vw,5.5rem)] font-medium …`)
- `Narrative.tsx:11` — the `<p class="font-display …">`
- `Experiences.tsx:19` — the section `<h2>`
- `Experiences.tsx:60` — the per-item `<h3>`
- `Atmosphere.tsx:29` — the `<h2>`
- `Reviews.tsx:12` — the `<h2>`
- `Gallery.tsx:20` — the `<h2>`
- `Reservation.tsx:45` — the `<h2>`
- `MenuBrowser.tsx:51` — the `<span class="font-display …">`
- `menu/page.tsx:19` — the `<h1>`
- `admin/AdminLogin.tsx:48` — the `<h1>` (`font-display text-[2rem] font-medium …`)

- [ ] **Step 2: Confirm no stray `font-display …font-medium` pairs remain**

Run: `rg -n "font-display" app/ | rg "font-medium"`
Expected: no matches. (If a match appears in `SiteHeader.tsx` / `SiteFooter.tsx` wordmarks — those use `font-display` with no weight class, so they will not match; leave them.)

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — Expected: no errors. Visual: `npm run dev` → headings read solid, not spindly.

- [ ] **Step 4: Commit**

```bash
git add app/components app/menu/page.tsx
git commit -m "Reskin: heading weight 600 for Cormorant Garamond"
```

---

### Task 5: Rewrite `app/lib/content.ts` for a seafood restaurant

**Files:**
- Modify: `app/lib/content.ts` (whole file)

**Interfaces:**
- Consumes: nothing (pure data).
- Produces: same exported names and shapes as before — `img`, `nav`, `hero`, `narrative`, `experiences`, `atmosphere`, `reviewsIntro`, `reviews`, `galleryIntro`, `gallery`, `reservation`, `contact`, `locations`, `footerLinks`. `locations` stays an **array** (now length 1). `experiences` keeps ids `the-midday` / `the-dinner` / `the-bar`. `gallery` item `size` values unchanged (`hero`/`square`/`tall`/`wide`).

- [ ] **Step 1: Replace the entire file with:**

```ts
/**
 * Contenido estático para la maqueta de la home de Puerto.
 *
 * Puerto no es un negocio real. La dirección, el teléfono, el horario y los
 * precios de abajo son marcadores plausibles para el puerto de Punta del Este
 * — reemplazalos por datos reales antes de cualquier uso en producción.
 *
 * Fotografía: Unsplash (unsplash.com/license). Reemplazá los IDs `photo` por
 * imágenes con licencia o propias y acreditá a los fotógrafos según haga falta.
 */

const U = "https://images.unsplash.com/photo-";
const q = "&q=80&auto=format&fit=crop";

export const img = {
  hero: `${U}1507525428034-b723cf961d3e?w=2200&ar=16:10${q}`,
  midday: `${U}1534422298391-e4f8c172dddb?w=1400&ar=1:1${q}`,
  dinner: `${U}1563379091339-03b21ab4a4f8?w=1400&ar=1:1${q}`,
  bar: `${U}1590947132387-155cc02f3212?w=1400&ar=1:1${q}`,
  atmosphere: `${U}1600628421055-4d30de868b8f?w=1700&ar=4:3${q}`,
};

export const nav = [
  { label: "La Carta", href: "/menu" },
  { label: "La Cocina", href: "/#experiences" },
  { label: "Bar", href: "/#bar" },
  { label: "Eventos", href: "/#atmosphere" },
] as const;

export const hero = {
  place: "Punta del Este — Uruguay",
  title: ["Pesca del día,", "olor a puerto,", "y sal en el aire."],
  subtitle:
    "Una cocina de mar sobre el muelle — pescado que entra a la mañana, mariscos, pastas marineras y parrilla, frente a los barcos de Punta del Este.",
  cta: "Ver la cocina",
};

export const narrative = "Un puerto, una carta que cambia con lo que entra.";

export const experiences = [
  {
    id: "the-midday",
    kicker: "12:30 — 16:00",
    title: "El Mediodía",
    body: "Mesas abiertas al agua, una carta corta que sale de lo que trajeron los botes a la mañana, y vino por copa hasta que se termina la tarde.",
    image: img.midday,
    alt: "Un pescado a la plancha con limón y papas al romero sobre una mesa de mármol junto a la ventana.",
    link: "Reservá una mesa para el mediodía",
    detail: {
      trigger: "Hoy en la carta",
      lead: "La carta del mediodía es corta y se arma con la pesca de la mañana. Un día reciente fue así:",
      items: [
        "Corvina a la plancha — papas al romero y alioli de ajo asado",
        "Chipirones a la andaluza — rebozados finos, limón y sal marina",
        "Rabas con salsa criolla — clásicas, para compartir",
        "Ensalada de pulpo — papa, aceituna, cherry confitado, vinagreta de limón",
      ],
    },
  },
  {
    id: "the-dinner",
    kicker: "20:00 — 00:00",
    title: "La Cena",
    body: "La sala baja la luz y se pone cálida. La carta entera — entradas, pescados al horno, cazuelas de mariscos y cortes de la parrilla — velas sobre las copas, y el puerto oscureciéndose del otro lado de las ventanas.",
    image: img.dinner,
    alt: "Una cazuela de mariscos humeante sobre una mesa oscura con luz de vela.",
    link: "Reservá una mesa para la cena",
    detail: {
      trigger: "Bueno saber",
      lead: "Algunas notas antes de reservar el servicio de la noche:",
      items: [
        "El pescado del día se anuncia en la mesa — según lo que entró",
        "Última comanda a la cocina 23:30; la cocina cierra a medianoche",
        "La barra del puerto (seis lugares) se reserva solo por teléfono",
        "Avisá por alergias a mariscos — se cocina mucho marisco en la misma cocina",
      ],
    },
  },
  {
    id: "the-bar",
    kicker: "19:00 — tarde",
    title: "El Bar",
    body: "Mariscos y sfizi en la barra de mármol — rabas, mejillones a la provenzal, croquetas de merluza — una carta de blancos y espumantes que vale quedarse, y cocina del mismo mar hasta cerrar.",
    image: img.bar,
    alt: "Una mano levantando una copa de vino blanco sobre una barra de mármol junto a una fuente de mejillones.",
    link: "Ver el bar",
    detail: {
      trigger: "Desde la barra",
      lead: "La carta se mueve con la temporada. Los fijos que se quedan:",
      items: [
        "Mejillones a la provenzal — ajo, perejil, vino blanco, pan tostado",
        "Rabas y una copa de albariño",
        "Croquetas de merluza con alioli",
        "Spritz de pomelo, borde con sal de mar",
      ],
    },
  },
] as const;

export const atmosphere = {
  title: ["Seguimos el horario", "que marca el muelle."],
  paragraphs: [
    "El pescado llega fresco cada mañana y la carta se arma con lo que entró, así que cambia un poco con el día y con la marea. Armamos el lugar mirando al agua — ventanales abiertos, una terraza que sigue el sol, y una barra desde donde se ven los barcos.",
    "Cenas privadas, degustaciones y celebraciones chicas toman la sala este o toda la terraza. Contanos la ocasión y cuántos son, y armamos un menú alrededor de la pesca del día.",
  ],
  cta: "Consultá por eventos",
};

export const reviewsIntro = {
  title: "Opiniones",
  lede: "Testimonios ilustrativos para la demo — texto de muestra, no reseñas reales.",
};

export const reviews = [
  {
    author: "Comensal local",
    rating: 5,
    quote:
      "Una joya para quien busca pescado fresco y bien hecho. La corvina a la plancha estaba impecable y la vista al puerto no falla.",
    meta: "$900–1.100",
  },
  {
    author: "Pareja de Montevideo",
    rating: 5,
    quote:
      "Excelente cocina de mar. Casi siempre se llena, así que conviene reservar. El albariño por copa, buenísimo.",
    meta: "$1.600–1.800",
  },
  {
    author: "Visitante de temporada",
    rating: 5,
    quote:
      "Probamos la cazuela de mariscos y las rabas y estaban para repetir. Súper recomendable si visitás Punta del Este.",
    meta: "Cena",
  },
  {
    author: "Turista de Buenos Aires",
    rating: 5,
    quote:
      "Por lejos el mejor pescado que comimos en la costa. Ambiente relajado y atención de primera.",
    meta: "Comer allí",
  },
  {
    author: "Familia, Punta del Este",
    rating: 5,
    quote:
      "Cuando estés en Punta no te podés perder este lugar. Terraza sobre el muelle y mariscos espectaculares. El pulpo, buenísimo.",
    meta: "$1.000–1.200",
  },
  {
    author: "Cliente habitual",
    rating: 5,
    quote:
      "Pescado del día a precio razonable y gran ambiente. Con una entrada para compartir y un pescado alcanza perfecto para dos.",
    meta: "Cena",
  },
] as const;

export const galleryIntro = {
  title: "Un vistazo al local",
  lede: "La barra, los platos y algunos momentos frente al agua.",
};

export const gallery = [
  { src: img.hero, alt: "El puerto desde la terraza", size: "hero" },
  { src: img.midday, alt: "Pescado apenas salido de la plancha", size: "square" },
  {
    src: `${U}1590534247854-e97d5e3feef6?w=1400&ar=3:4${q}`,
    alt: "La mesa cuando baja la luz",
    size: "tall",
  },
  {
    src: `${U}1536935338788-846bb9981813?w=1200&ar=1:1${q}`,
    alt: "De la barra",
    size: "square",
  },
  {
    src: `${U}1509440159596-0249088772ff?w=1800&ar=21:9${q}`,
    alt: "Entradas para compartir",
    size: "wide",
  },
  {
    src: `${U}1571877227200-a0d98ea607e9?w=1200&ar=1:1${q}`,
    alt: "Postres de la casa",
    size: "square",
  },
  {
    src: `${U}1544982503-9f984c14501a?w=1200&ar=1:1${q}`,
    alt: "Una copa y el puerto",
    size: "square",
  },
] as const;

export const reservation = {
  title: "Reservá una mesa",
  lede: "Decinos cuándo y para cuántos. Guardamos la terraza y el salón por separado, así que elegí la sala donde querés estar.",
  note: "Maqueta de diseño — el formulario no envía nada. Para una reserva real, llamá al número de abajo.",
  times: ["12:30", "13:30", "15:00", "20:00", "20:30", "21:15", "22:00"],
  guests: [
    "1 persona",
    "2 personas",
    "3 personas",
    "4 personas",
    "5 personas",
    "6 personas",
    "7+ — llamanos",
  ],
  seatings: ["Terraza", "Salón", "Barra del puerto"],
};

export const contact = {
  phoneLabel: "+598 42 44 88 99",
  phoneHref: "tel:+59842448899",
  emailLabel: "hola@puerto.uy",
  emailHref: "mailto:hola@puerto.uy",
};

export const locations = [
  {
    id: "puerto",
    name: "Muelle Principal",
    address: "Rambla del Puerto esq. Calle 27, Punta del Este",
    phoneLabel: "+598 42 44 88 99",
    phoneHref: "tel:+59842448899",
    hours: "Martes a domingo · 12:00 – 00:00",
  },
];

export const footerLinks = [
  {
    heading: "Visitá",
    items: [
      { label: "La Carta", href: "/menu" },
      { label: "La Cocina", href: "/#experiences" },
      { label: "Bar", href: "/#bar" },
      { label: "Eventos privados", href: "/#atmosphere" },
      { label: "Galería", href: "/#galeria" },
      { label: "Opiniones", href: "/#opiniones" },
      { label: "Reservá una mesa", href: "/#reserve" },
    ],
  },
  {
    heading: "Cocina",
    items: [
      { label: "La Carta completa", href: "/menu" },
      { label: "Vinos y cócteles", href: "/#bar" },
      { label: "Notas dietéticas", href: "/#reserve" },
      { label: "Tarjetas de regalo", href: "/#reserve" },
    ],
  },
];
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors. (`ConfigPanel.tsx` reads `locations[i].hours` via `.replace(...)` and `SiteFooter.tsx` maps `locations` — both work with a 1-element array.)

- [ ] **Step 3: Visual check**

`npm run dev` → home hero reads "Pesca del día, / olor a puerto, / y sal en el aire."; Experiences section shows the three seafood services; footer shows one location ("Muelle Principal"). Header/footer wordmark still says "Pizzeria" — fixed in Task 8.

- [ ] **Step 4: Commit**

```bash
git add app/lib/content.ts
git commit -m "Content: rewrite home copy for Puerto seafood restaurant"
```

---

### Task 6: Seafood menu categories + import defaults

**Files:**
- Modify: `app/lib/menu.ts` (whole file), `app/lib/menu-import.ts:20,34,151-156`, `app/components/admin/MenuManager.tsx:37`

**Interfaces:**
- Consumes: nothing.
- Produces: `MenuItem["category"]` union = `"entradas" | "pescados" | "mariscos" | "pastas" | "parrilla" | "ensaladas" | "postres" | "vinos" | "cervezas" | "cocteles" | "sin_alcohol"`. Exports unchanged in name: `MenuItem`, `sectionLabels`, `sectionOrder`, `categoryLabels`, `categoryOrder`, `MENU_DATA`, `formatPrice`. `sectionLabels`/`sectionOrder` (lunch/dinner/bar → Almuerzo/Cena/Bar) are **unchanged**.

- [ ] **Step 1: Replace `app/lib/menu.ts` with:**

```ts
/**
 * Carta de Puerto (página /menu).
 *
 * PARCIAL — sembrado con algunos platos de muestra. Completar `MENU_DATA`
 * cuando llegue la carta entera del local.
 *
 * Precios en pesos uruguayos. `tags` controla el filtro Almuerzo/Cena/Bar.
 */

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  unit?: string; // "500cc", "1/2 Pinta", "Pinta", "Copa", "Botella"
  priceSecondary?: number; // p. ej. precio de botella cuando hay precio de copa
  category:
    | "entradas"
    | "pescados"
    | "mariscos"
    | "pastas"
    | "parrilla"
    | "ensaladas"
    | "postres"
    | "vinos"
    | "cervezas"
    | "cocteles"
    | "sin_alcohol";
  tags: ("lunch" | "dinner" | "bar")[];
  /** Ausente o true = visible en la carta pública. false = despublicado sin borrar. */
  published?: boolean;
  image?: string;
}

/** Unsplash helper — reemplazar por fotos propias del local. */
const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=75&auto=format&fit=crop`;

export const sectionLabels: Record<MenuItem["tags"][number], string> = {
  lunch: "Almuerzo",
  dinner: "Cena",
  bar: "Bar",
};

export const sectionOrder: MenuItem["tags"][number][] = ["lunch", "dinner", "bar"];

export const categoryLabels: Record<MenuItem["category"], string> = {
  entradas: "Entradas y minutas",
  pescados: "Pescados",
  mariscos: "Mariscos",
  pastas: "Pastas",
  parrilla: "Parrilla de mar",
  ensaladas: "Ensaladas",
  postres: "Postres",
  vinos: "Vinos",
  cervezas: "Cervezas",
  cocteles: "Cócteles",
  sin_alcohol: "Sin alcohol",
};

export const categoryOrder: MenuItem["category"][] = [
  "entradas",
  "pescados",
  "mariscos",
  "pastas",
  "parrilla",
  "ensaladas",
  "postres",
  "vinos",
  "cervezas",
  "cocteles",
  "sin_alcohol",
];

export const MENU_DATA: MenuItem[] = [
  {
    id: "e1",
    name: "Rabas a la andaluza",
    description:
      "Anillas de calamar rebozadas finas, limón y sal marina, alioli de ajo asado",
    price: 640,
    category: "entradas",
    tags: ["lunch", "dinner", "bar"],
    image: IMG("1568901346375-23c9450c58cd"),
  },
  {
    id: "e2",
    name: "Mejillones a la provenzal",
    description: "Ajo, perejil, vino blanco y pan tostado",
    price: 590,
    category: "entradas",
    tags: ["dinner", "bar"],
    image: IMG("1574071318508-1cdbab80d002"),
  },
  {
    id: "f1",
    name: "Pesca a la Sal",
    description:
      "Corvina negra entera horneada en costra de sal marina, papas rústicas al romero",
    price: 890,
    category: "pescados",
    tags: ["lunch", "dinner"],
    image: IMG("1534422298391-e4f8c172dddb"),
  },
  {
    id: "f2",
    name: "Corvina a la plancha",
    description: "Con papas al romero, alioli y limón asado",
    price: 860,
    category: "pescados",
    tags: ["lunch", "dinner"],
    image: IMG("1593560708920-61dd98c46a4e"),
  },
  {
    id: "m1",
    name: "Cazuela de mariscos",
    description:
      "Mejillones, chipirones, langostinos y almejas en fumet de azafrán",
    price: 940,
    category: "mariscos",
    tags: ["dinner"],
    image: IMG("1590534247854-e97d5e3feef6"),
  },
  {
    id: "pa1",
    name: "Linguine Frutti di Mare",
    description:
      "Pasta al huevo artesanal, mejillones, chipirones, langostinos y reducción de vino blanco",
    price: 760,
    category: "pastas",
    tags: ["lunch", "dinner"],
    image: IMG("1563379091339-03b21ab4a4f8"),
  },
  {
    id: "pr1",
    name: "Pulpo a la parrilla",
    description: "Tentáculo grillado, puré de papa ahumada y pimentón",
    price: 880,
    category: "parrilla",
    tags: ["dinner"],
    image: IMG("1585238342024-78d387f4a707"),
  },
  {
    id: "en1",
    name: "Ensalada Costera de Pulpo",
    description:
      "Pulpo grillado, brotes tiernos, tomates cherry confitados, alcaparras, vinagreta de limón",
    price: 680,
    category: "ensaladas",
    tags: ["lunch", "dinner"],
    image: IMG("1540420773420-3366772f4999"),
  },
  {
    id: "v1",
    name: "Albariño",
    description: "Rías Baixas — cítrico y salino, va con todo lo de mar",
    price: 320,
    priceSecondary: 1480,
    unit: "Copa",
    category: "vinos",
    tags: ["lunch", "dinner", "bar"],
  },
  {
    id: "c1",
    name: "Spritz de pomelo",
    description: "Aperol, pomelo, espumante, borde con sal de mar",
    price: 420,
    category: "cocteles",
    tags: ["bar", "dinner"],
  },
];

export function formatPrice(n: number): string {
  return `$ ${new Intl.NumberFormat("es-UY").format(n)}`;
}
```

- [ ] **Step 2: Update `app/lib/menu-import.ts`**

- Line ~20: `const DRINK_CATS = new Set(["vinos", "cervezas", "cocteles", "sin_alcohol"]);` (was `"tragos"` → now `"cocteles"`)
- Line ~34: in `toCategory`, `return (CATS.has(s) ? s : "entradas") as MenuItem["category"];` (was `"pizzas"`)
- Lines ~151-156: replace `CSV_TEMPLATE` with:

```ts
export const CSV_TEMPLATE = [
  "name,description,price,category,tags,image,published",
  '"Rabas a la andaluza","Calamar rebozado, limón y sal marina",640,entradas,lunch dinner bar,,true',
  '"Corvina a la plancha","Papas al romero y alioli",860,pescados,lunch dinner,,true',
  '"Spritz de pomelo","Aperol, pomelo, espumante, sal de mar",420,cocteles,bar,,true',
].join("\n");
```

- [ ] **Step 3: Update `app/components/admin/MenuManager.tsx`**

Line ~37, in the `empty` draft object: `category: "entradas",` (was `"pizzas"`).

- [ ] **Step 4: Verify the union change caught everything**

Run: `npx tsc --noEmit`
Expected: no errors. If it reports a remaining `"pizzas"` or `"tragos"` literal anywhere, fix that reference to a valid category and re-run.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: succeeds. Visual: `/menu` shows sections Almuerzo / Cena / Bar with the new seafood categories; `/admin` → Carta tab lists the items grouped by the new category labels.

- [ ] **Step 6: Commit**

```bash
git add app/lib/menu.ts app/lib/menu-import.ts app/components/admin/MenuManager.tsx
git commit -m "Content: seafood menu categories and sample dishes"
```

---

### Task 7: Admin demo data + admin inline strings

**Files:**
- Modify: `app/lib/admin-demo.ts:11-14,52,101,113`, `app/components/admin/AdminLogin.tsx:9,46-47,71`, `app/components/admin/AdminDashboard.tsx:85,126`, `app/components/admin/ReservationsPanel.tsx:38,154`, `app/components/admin/ConfigPanel.tsx:24-26,138`

**Interfaces:**
- Consumes: Task 5 (`locations`).
- Produces: `DEMO_CREDENTIALS.email` = `admin@puerto.uy`; `ADMIN_SESSION_KEY` = `"puerto-admin-demo"`. Shapes unchanged.

- [ ] **Step 1: `app/lib/admin-demo.ts`**

- Lines ~11-14:

```ts
export const DEMO_CREDENTIALS = {
  email: "admin@puerto.uy",
  password: "demo1234",
};

export const ADMIN_SESSION_KEY = "puerto-admin-demo";
```

- Line ~52, seed `r1` note: `note: "Cumpleaños — si se puede, mesa contra la ventana para ver los barcos.",`
- Line ~101, seed `r5` note: `note: "Una comensal con alergia a mariscos — consulta opciones de pescado.",`
- Line ~113, seed `r6` note: `note: "Pedían las 8 en terraza un viernes — sin lugar.",` (unchanged — no pizza reference; leave it)

- [ ] **Step 2: `app/components/admin/AdminLogin.tsx`**

- Line ~9, `BG` constant → a marine photo:

```ts
const BG =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format&fit=crop";
```

- Line ~46-47, the wordmark:

```tsx
          <p className="font-display text-2xl tracking-[-0.01em] text-ink">
            Puerto<span className="text-gold">.</span>
          </p>
```

- Line ~71, the email input placeholder: `placeholder="admin@puerto.uy"`

- [ ] **Step 3: `app/components/admin/AdminDashboard.tsx`**

Lines ~85 and ~126, both occurrences of `Pizzería · Panel` → `Puerto · Panel`.

- [ ] **Step 4: `app/components/admin/ReservationsPanel.tsx`**

- Line ~38, inside `confirmMessage`: `return \`Hola ${firstName(r.name)}, te escribimos de Puerto. Confirmamos tu reserva para el ${when} a las ${r.time}, ${people} (${r.seating}). ¡Te esperamos!\`;`
- Line ~154, the mail subject: `"Tu reserva en Puerto"`

- [ ] **Step 5: `app/components/admin/ConfigPanel.tsx`**

- Lines ~24-26, the `local` state initializer:

```ts
  const [local, setLocal] = useState({
    name: "Puerto",
    phone: "+598 42 44 88 99",
    email: "hola@puerto.uy",
  });
```

- Line ~138, the correo placeholder: `placeholder="Ej. puerto@puerto.uy"`
- Line ~97, the section title: `<Section title="Ubicación">` (was `"Sucursales"`)

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit` then `npm run build` — Expected: both succeed.

- [ ] **Step 7: Visual check**

`npm run dev` → `/admin`. Log in with `admin@puerto.uy` / `demo1234`. Sidebar reads "Puerto · Panel"; Configuración tab shows "Ubicación" with one entry; Reservas tab WhatsApp/email links carry "de Puerto" text.

- [ ] **Step 8: Commit**

```bash
git add app/lib/admin-demo.ts app/components/admin
git commit -m "Content: Puerto branding and copy in the admin panel"
```

---

### Task 8: Home inline strings

**Files:**
- Modify: `app/components/SiteHeader.tsx:47`, `app/components/SiteFooter.tsx:13,16-18,70,95`, `app/components/Experiences.tsx:20`, `app/components/Atmosphere.tsx:19`, `app/components/Reservation.tsx:66`

**Interfaces:**
- Consumes: Task 5 (`locations`).
- Produces: no API change.

- [ ] **Step 1: `SiteHeader.tsx:47`** — the wordmark:

```tsx
            Puerto<span className="text-gold">.</span>
```

- [ ] **Step 2: `SiteFooter.tsx`**

- Line ~13, wordmark: `Puerto<span className="text-gold">.</span>`
- Lines ~16-18, the description paragraph:

```tsx
            <p className="mt-4 text-[0.92rem] leading-relaxed text-muted">
              Una cocina de mar sobre el muelle de Punta del Este. Pesca del
              día, mariscos y parrilla, y una barra desde donde se ven los
              barcos.
            </p>
```

- Line ~70, the heading `Sucursales` → `Dónde estamos`
- Line ~95, footer line: `© {year} Puerto. Una maqueta de diseño — no es un negocio real.`

- [ ] **Step 3: `Experiences.tsx:20`** — the section heading text:

```tsx
            Tres servicios, una cocina de mar
```

- [ ] **Step 4: `Atmosphere.tsx:19`** — the image `alt`:

```tsx
            alt="Amigos compartiendo mariscos en una mesa al aire libre sobre el puerto."
```

- [ ] **Step 5: `Reservation.tsx:66`** — the location line under the phone:

```tsx
            <p className="mt-1 text-[0.85rem] text-muted">
              Muelle Principal · Punta del Este
            </p>
```

- [ ] **Step 6: Confirm no "pizz" / "horno" / "leña" strings remain in `app/`**

Run: `rg -in "pizz|horno a le|napolitan|muzzarella|fain[aá]|le[ñn]a" app/`
Expected: no matches. (If `menu.ts` sample data or a comment still trips this, fix it.)

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit` then `npm run build` — Expected: both succeed.

- [ ] **Step 8: Commit**

```bash
git add app/components
git commit -m "Content: Puerto branding and copy across the homepage"
```

---

### Task 9: `/menu` and `/admin` page metadata + menu page copy

**Files:**
- Modify: `app/menu/page.tsx:6-10,18,23-25`, `app/admin/page.tsx:4-7`

**Interfaces:**
- Consumes: nothing.
- Produces: no API change.

- [ ] **Step 1: `app/menu/page.tsx`**

- Lines ~6-10, the `metadata`:

```tsx
export const metadata: Metadata = {
  title: "La Carta — Puerto, Punta del Este",
  description:
    "La carta de Puerto — pescados del día, mariscos, pastas marineras, parrilla y la barra. Filtrá por Almuerzo, Cena o Bar.",
};
```

- Line ~18, the intro `<p>` above the `<h1>` stays (`Punta del Este — Uruguay`).
- Lines ~23-25, the descriptive paragraph:

```tsx
          <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed text-muted">
            Elegí el servicio y mirá lo que hay. La carta cambia con la
            temporada y con lo que trae la pesca del día.
          </p>
```

- [ ] **Step 2: `app/admin/page.tsx:4-7`** — the `metadata`:

```tsx
export const metadata: Metadata = {
  title: "Panel — Puerto",
  robots: { index: false, follow: false },
};
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/menu/page.tsx app/admin/page.tsx
git commit -m "Content: Puerto metadata and copy for /menu and /admin"
```

---

### Task 10: `DESIGN.md` + surface brief

**Files:**
- Modify: `DESIGN.md` (whole file), `.impeccable/surfaces/app-page-tsx.md` (intro + palette lines)

**Interfaces:**
- Consumes: Tasks 1, 2, 5, 6.
- Produces: documentation only.

- [ ] **Step 1: Replace `DESIGN.md` with:**

```markdown
# Puerto — Design system

Ground truth for the homepage as built (`app/`). Marine editorial — one room
on the main pier at Punta del Este, in the deep tones of the harbour at night,
seen through the three services of a day. Copy is Spanish (Uruguay), voseo.

## Tokens

Defined in `app/globals.css` under `@theme`. Use the Tailwind utilities they
generate (`bg-canvas`, `text-ink`, `text-muted`, `border-line`, …).

Surfaces layer navy > deep navy > trench, front to back.

NOTE: `--color-gold` and `--color-ocean` hold a light blue in this theme — the
token names were kept when the palette moved from terracotta to marine to avoid
a rename sweep across every component. Read `gold` as "the accent", not a colour.

| Token | Value | Role |
| --- | --- | --- |
| `canvas` | `#0d2a4d` | Primary surface — body, cards, nav |
| `mist` | `#0a2140` | Deeper section tint (Hero, Experiences, Footer) |
| `sand` | `#071a33` | Reservation section — the form card floats on it |
| `shell` | `#1c3d63` | Steel — image placeholder, disabled control fill |
| `ink` | `#f2f7fb` | Cool near-white — headings, primary text, solid buttons |
| `ink-soft` | `#dbe6f1` | Secondary headings, list copy |
| `muted` | `#aec3d8` | Cool grey-blue — body / supporting text |
| `faint` | `#89a1ba` | Dim slate — placeholders, fine print |
| `line` | `#22406a` | Steel hairline borders, dividers |
| `gold` | `#79c2e3` | Accent — brand dot, datelines, chevrons, hairlines, focus |
| `gold-soft` | `#a5dbef` | Lighter accent / accent hover |
| `ocean` | `#79c2e3` | Interactive — text links, active form controls, focus ring |
| `ocean-deep` | `#a5dbef` | Link / control hover |

Spacing rhythm: `--spacing-section` (`clamp(4.5rem, 10vw, 8.5rem)`) between
major sections; `--spacing-section-tight` for the narrative interlude.
Standard easing: `cubic-bezier(0.16, 1, 0.3, 1)` (exponential out).

## Type

- **Display** — Cormorant Garamond (`font-display`), semibold (600) for
  headings, 700 where extra weight is needed, 400 italic for the narrative
  accent. High-contrast serif — reads elegantly at hero scale, gets fragile
  below ~1.5rem, so it is only used for large headings and the wordmark.
  Tracking `-0.022em` at hero scale, `-0.02em` elsewhere. Hero clamps to
  `5.5rem`; section headings to ~`3.1rem`.
- **Body / UI** — Plus Jakarta Sans (`font-sans`). Body `1rem`/relaxed,
  `muted`. Small-caps markers: `0.7–0.76rem`, weight 600, tracking `0.18–0.3em`,
  uppercase — used only for datelines and time ranges that carry real
  information, never as a decorative kicker.
- Both self-hosted via `next/font/google` in `app/layout.tsx`.

## Surfaces & motion

- **Nav** (`SiteHeader`) — fixed; transparent over the hero, transitioning to
  `bg-canvas/80 backdrop-blur-md` with a `border-line` hairline and a faint
  shadow past 24px scroll. Ink text, accent brand dot, outline Reserve pill.
- **Photography** — full-bleed, under navy gradients (`.scrim-hero`,
  `.scrim-soft`) that settle the photo into the harbour tones. Experience
  images: rounded `14px`, `ring-1 ring-ink/[0.06]`, `bg-shell` placeholder,
  hover `scale-[1.04]`.
- **Hero entrance** — CSS keyframes only (`hero-settle`, `line-rise`): image
  settles from `scale(1.08)`, headline lines rise in stagger. Visible without
  JS; disabled under `prefers-reduced-motion`.
- **Scroll reveal** (`Reveal`) — IntersectionObserver, content visible by
  default, only below-the-fold elements ease up 16px once.
- **Accordions** (`Experiences`) — one open at a time, `max-h` transition
  (`max-h-0` → `max-h-96`, 500ms), chevron rotates 180°.
- Browser surfaces (selection, scrollbar, focus ring) themed from the palette
  in `app/globals.css`.

## Layout

`app/page.tsx` composes: `SiteHeader` · `Hero` (full viewport) · `Narrative`
(centred interlude) · `Experiences` (el mediodía / la cena / el bar as
alternating image/text rows + accordions) · `Atmosphere` (split image/text) ·
`Reviews` (3-col quote cards on mist) · `Reservation` (static form, card on
sand) · `SiteFooter` (multi-column + one location). Max content width `84rem`;
nav links smooth-scroll to section ids.

## Notes

- All content is static; the reservation form does not submit (see
  `app/lib/content.ts`).
- Contact details, hours and menu items are plausible placeholders for a
  seafood restaurant on the Punta del Este pier — replace before production.
- Imagery is Unsplash; only `images.unsplash.com` is allowlisted in
  `next.config.ts`.
- The admin panel (`app/admin`) keeps a light workspace with the navy sidebar;
  its status colours (green ok / amber pending / red danger) are role-based and
  not part of the marine palette.
```

- [ ] **Step 2: Update `.impeccable/surfaces/app-page-tsx.md`**

This is a design-provenance brief, not code. Update only the parts that now
misdescribe the build:

- Line ~8 heading: `# Surface brief — app/page.tsx (Puerto homepage)`
- Line ~10: replace "Pizzeria, a Neapolitan pizzeria & bar" → "Puerto, a seafood restaurant & bar"
- Line ~22 (OWN-WORLD): replace the light-palette description with: "Marine dark — deep navy surfaces (#0d2a4d / #0a2140), cool near-white text (#f2f7fb), grey-blue secondary (#aec3d8). Light beacon-blue (#79c2e3) as accent and text links. Cormorant Garamond display to 5.5rem tracking -0.022em; Plus Jakarta Sans body/UI. Full-bleed photography under navy gradients."
- Anywhere else "pizza" / "wood-fired oven" / "Neapolitan" appears in prose, swap for the seafood equivalent ("the pier", "the day's catch", "seafood"). Keep the FORM / FINISH / STORY structure.

- [ ] **Step 3: Commit**

```bash
git add DESIGN.md .impeccable/surfaces/app-page-tsx.md
git commit -m "Docs: rewrite design system and surface brief for Puerto marine"
```

---

### Task 11: Final verification

**Files:** none (verification only).

- [ ] **Step 1: Typecheck**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors (warnings acceptable if pre-existing).

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: succeeds, all routes (`/`, `/menu`, `/admin`) compile.

- [ ] **Step 4: No warm hex, no pizzeria copy**

Run:
```
rg -in "pizz|napolitan|muzzarella|horno a le|le[ñn]a|fain[aá]" app/ DESIGN.md
rg -n "#(8b3a2b|7c2d12|6b2410|a04735|f5c542|ffd166|f0e6da|e5d5c5|d9c6b2|9e5140|2b1710|fdfbf7|2a140d|1f0f0a|b5604d)" app/
```
Expected: no matches in either.

- [ ] **Step 5: Visual walkthrough (`npm run dev`)**

- `/` — navy throughout; hero photo legible under the scrim; headline in Cormorant at solid weight; brand dot + review stars in beacon-blue; footer shows one location; no "Pizzeria" anywhere.
- `/menu` — sections Almuerzo / Cena / Bar; seafood categories; prices formatted `$ 1.480`.
- `/admin` — login page navy; sign in `admin@puerto.uy` / `demo1234`; Reservas / Carta / Configuración tabs all render; sidebar navy; "Ubicación" section has one entry.
- Keyboard-tab a few controls — focus ring is beacon-blue and visible on navy.

- [ ] **Step 6: Commit any residual fixes**

```bash
git add -A
git commit -m "Reskin: final verification fixes"
```

(Skip if steps 1–5 produced no changes.)

---

## Self-Review

**Spec coverage:**
- §1 Paleta → Task 1. ✅
- §2 Hexes hardcodeados → Task 3 (components) + Task 1 (scrollbar). Admin status colors intentionally kept, noted in Task 10. ✅
- §3 Tipografía → Task 2 (font + fallback + metadata) + Task 4 (weights) + Task 10 (DESIGN.md Type). ✅
- §4 Contenido: `content.ts` → Task 5; `menu.ts` → Task 6; `menu-import.ts` → Task 6; `MenuManager` empty → Task 6; `admin-demo.ts` → Task 7; metadata → Tasks 2, 9; inline strings home → Task 8; inline strings admin → Task 7. ✅
- §4 single location → Task 5 (`locations` array length 1) + Task 7 (ConfigPanel "Ubicación") + Task 8 (SiteFooter "Dónde estamos"). ✅
- §5 DESIGN.md → Task 10 (plus surface brief, an addition beyond the spec — flagged there as adjacent). ✅
- §6 Testing → Task 11. ✅

**Placeholder scan:** No "TBD"/"TODO"/"handle edge cases" in steps. Every code step has literal content. ✅

**Type consistency:** `MenuItem["category"]` union defined in Task 6 Step 1; every string used in `MENU_DATA` (`entradas`, `pescados`, `mariscos`, `pastas`, `parrilla`, `ensaladas`, `vinos`, `cocteles`) is a member of that union. `categoryOrder` and `categoryLabels` list exactly the 11 union members. `menu-import.ts` `DRINK_CATS` members (`vinos`, `cervezas`, `cocteles`, `sin_alcohol`) are union members. `toCategory` fallback `"entradas"` is a union member. `MenuManager` `empty.category: "entradas"` is a union member. `locations` stays `Array` in Task 5 — consumers (`SiteFooter.tsx` `.map`, `ConfigPanel.tsx` `SEED_LOCATIONS.map` + `.hours.replace`) are compatible with length 1. ✅

**Ordering:** Task 1 (tokens) before all visual checks; Task 2 (font) before Task 4 (weights); Task 5 (`content.ts` incl. `locations`) before Task 7 & 8 which depend on it; Task 6 (union) before Task 11 build. ✅
