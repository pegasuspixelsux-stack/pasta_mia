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
| `mist` | `#f7f0e4` | Deeper warm tint (Hero, Experiences, Reviews, Footer) |
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
  scale, `-0.02em` elsewhere. Hero clamps to `5.5rem`; section headings to
  ~`3.1rem`. Used only for large headings and the wordmark.
- **Body / UI** — Montserrat (`font-sans`). Body `1rem`/relaxed, `muted`.
  Small-caps markers: `0.7–0.76rem`, weight 600, tracking `0.18–0.3em`,
  uppercase — used only for datelines and time ranges that carry real
  information, never as a decorative kicker.
- Both self-hosted via `next/font/google` in `app/layout.tsx`.

## Surfaces & motion

- **Nav** (`SiteHeader`) — fixed; transparent over the hero, transitioning to
  `bg-canvas/80 backdrop-blur-md` with a `border-line` hairline and a faint
  shadow past 24px scroll. Espresso text, terracotta brand dot, outline
  Reserve pill. Wordmark "Pasta Mia".
- **Photography** — full-bleed, under cream gradients (`.scrim-hero`,
  `.scrim-soft`) that settle the photo into the warm surface tones. Experience
  images: rounded `14px`, `ring-1 ring-ink/[0.06]`, `bg-shell` placeholder,
  hover `scale-[1.04]`.
- **Hero entrance** — CSS keyframes only (`hero-settle`, `line-rise`): image
  settles from `scale(1.08)`, headline lines rise in stagger. Visible without
  JS; disabled under `prefers-reduced-motion`.
- **Hero review block** (`HeroReviews`) — transparent, sits over the photo in
  the hero's right column on `lg`, stacked under the CTA on smaller screens.
  Rotates through the first three `reviews` every 5s (paused under
  `prefers-reduced-motion`); pill dots jump to a review. Sample text, styled as
  a "Reseña Google" block — not real Google data.
- **Scroll reveal** (`Reveal`) — IntersectionObserver, content visible by
  default, only below-the-fold elements ease up 16px once.
- **Accordions** (`Experiences`) — one open at a time, `max-h` transition
  (`max-h-0` → `max-h-96`, 500ms), chevron rotates 180°.
- Browser surfaces (selection, scrollbar, focus ring) themed from the palette
  in `app/globals.css`.

## Layout

`app/page.tsx` composes: `SiteHeader` · `Hero` (full viewport, two-column on
`lg` — copy left, `HeroReviews` block right) · `Intro`
(two-column band — kicker + statement left, two teasers right; `#nosotros`) ·
`Experiences` (el mediodía / la cena / la barra as
alternating image/text rows + accordions) · `Atmosphere` (split image/text) ·
`Reviews` (3-col quote cards on mist) · `Reservation` (static form, card on
sand) · `SiteFooter` (multi-column + one location). Max content width `84rem`;
nav links smooth-scroll to section ids.

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
