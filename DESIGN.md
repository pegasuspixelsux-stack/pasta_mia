# Pasta Mia — Design system

Ground truth for the homepage as built (`app/`). Warm editorial — one
neighbourhood trattoria in Pocitos, Montevideo, seen through the three services
of a day, in the warm tones of cream, wheat and terracotta. Copy is Spanish
(Uruguay), voseo.

## Tokens

Defined in `app/globals.css` under `@theme`. Use the Tailwind utilities they
generate (`bg-canvas`, `text-ink`, `text-muted`, `border-line`, …).

Surfaces layer cream > warm cream > wheat, front to back.

NOTE: `--color-gold` and `--color-ocean` hold the terracotta accent — the token
names were kept when the palette moved (terracotta → marine → terracotta) to
avoid a rename sweep across every component. Read `gold` as "the accent".

| Token | Value | Role |
| --- | --- | --- |
| `canvas` | `#fdfbf7` | Primary surface — body, nav, base sections, is the ground for white cards |
| `mist` | `#f7f0e4` | Deeper warm tint (Hero base, Craft, Reviews, Footer) |
| `sand` | `#f1e7d6` | Reservation section — the form card floats on it |
| `shell` | `#e8dac2` | Wheat — image placeholder, disabled control fill |
| `ink` | `#2c221e` | Espresso — headings, primary text, solid buttons |
| `ink-soft` | `#4a3a32` | Secondary headings, list copy |
| `muted` | `#6f5d51` | Warm brown-grey — body / supporting text |
| `faint` | `#9c8a7b` | Dim taupe — placeholders, fine print |
| `line` | `#e6dac6` | Warm hairline borders, dividers |
| `gold` | `#bc4749` | Accent — brand dot, datelines, chevrons, hairlines, stars, focus |
| `gold-soft` | `#d08c6a` | Warm clay — lighter accent / accent hover / light text on dark admin surfaces |
| `ocean` | `#bc4749` | Interactive — text links, active form controls, focus ring |
| `ocean-deep` | `#9e3a3c` | Link / control hover |

Cards (`Reviews`, the `Reservation` form) are `bg-white` with a `border-line`
hairline, so they lift off the cream/`mist` sections.

Spacing rhythm: `--spacing-section` (`clamp(4.5rem, 10vw, 8.5rem)`) between
major sections; `--spacing-section-tight` for the intro band.
Standard easing: `cubic-bezier(0.16, 1, 0.3, 1)` (exponential out).

## Type

- **Display** — Playfair Display (`font-display`), variable, medium (500) for
  headings, 400 italic for accents. Tracking `-0.022em` at hero
  scale, `-0.02em` elsewhere. Hero wordmark clamps to `6.5rem`; section
  headings to ~`3.1rem`. Used only for large headings and the wordmark.
- **Body / UI** — Montserrat (`font-sans`). Body `1rem`/relaxed, `muted`.
  Small-caps markers: `0.7–0.76rem`, weight 600, tracking `0.18–0.3em`,
  uppercase — used only for datelines and time ranges that carry real
  information, never as a decorative kicker.
- Both self-hosted via `next/font/google` in `app/layout.tsx`.

## Surfaces & motion

- **Nav** (`SiteHeader`) — fixed; transparent over the hero (light text, via
  the `onDark` prop), transitioning to `bg-canvas/80 backdrop-blur-md` with a
  `border-line` hairline and a faint shadow past 24px scroll (espresso text).
  Terracotta brand dot, outline Reserve pill. Wordmark "Pasta Mia". Pages
  without a dark hero (`/menu`) omit `onDark` and stay dark-on-transparent.
- **Photography** — full-bleed. The hero photo sits under `.scrim-hero`, a
  darker-tan (`#3d2c1b`) overlay so the light headline holds contrast; the
  wordmark/nav go light while the header is transparent (`SiteHeader onDark`).
  Experience images sit under the cream `.scrim-soft`, rounded `14px`,
  `ring-1 ring-ink/[0.06]`, `bg-shell` placeholder, hover `scale-[1.04]`.
- **Hero entrance** — CSS keyframes only (`hero-settle`, `line-rise`): image
  settles from `scale(1.08)`, copy rises in stagger. Visible without JS;
  disabled under `prefers-reduced-motion`.
- **Hero headline** (`Typewriter`) — the "Pasta Mia" wordmark types out, holds,
  deletes and loops with a blinking caret. Full text is reserved (invisible
  copy) so the centred heading never jitters; renders whole on the server and
  first paint (no flash), loop starts after mount, still under reduced motion.
- **Hero review ticker** — the first `reviews` scroll left as transparent,
  border-less boxes along the bottom of the hero (`@keyframes ticker`, content
  duplicated so `-50%` loops seamlessly; paused under reduced motion). Styled as
  "Reseña Google" text — not real Google data.
- **Scroll reveal** (`Reveal`) — IntersectionObserver, content visible by
  default, only below-the-fold elements ease up 16px once.
- **Card hover** — `Craft`, `Cellar` and `Reviews` cards lift / shift their
  border on hover; card and `Cellar` images slow-zoom (`scale-[1.04–1.05]`,
  900ms) on the `group`.
- Browser surfaces (selection, scrollbar, focus ring) themed from the palette
  in `app/globals.css`.

## Layout

`app/page.tsx` composes: `SiteHeader` (`onDark`) · `Hero` (full viewport —
centred `Typewriter` heading + subtitle over a darker-tan scrim, review ticker
along the bottom) · `Intro` (two-column band — kicker + statement left, two
teasers right; `#nosotros`) · `Craft` (`#despensa` — centred heading + two
"Nuestras pastas / salsas" cards with image and bullet list, on `mist`) ·
`Cellar` (`#barra` — dark section, "La Barra" wine groups as alternating
text/image rows) · `Atmosphere` (split image/text) · `Reviews` (3-col quote
cards on mist) · `Reservation` (static form, card on sand) · `SiteFooter`
(brand + Visitá / Dónde estamos / Reservas columns, legal links). Max content
width `84rem`; nav links smooth-scroll to section ids. `/menu` keeps the
filterable `MenuBrowser`.

## Notes

- All content is static; the reservation form does not submit (see
  `app/lib/content.ts`).
- Contact details, hours and menu items are plausible placeholders for a
  neighbourhood pasta trattoria in Pocitos, Montevideo — replace before
  production.
- Imagery is Unsplash; only `images.unsplash.com` is allowlisted in
  `next.config.ts`. **The `photo` IDs in `content.ts` / `menu.ts` are markers —
  verify each image and replace with licensed or in-house photography.**
- The admin panel (`app/admin`) keeps a light workspace with an espresso
  sidebar; its dark sidebar/login surfaces use explicit `text-white/*` rather
  than the theme ink tokens. Status colours (green ok / amber pending / red
  danger) are role-based and not part of the trattoria palette.
