# Puerto — Design system

Ground truth for the homepage as built (`app/`). Marine editorial — one room
on the main pier at Punta del Este, in the deep tones of the harbour at night,
seen through the three services of a day. Copy is Spanish (Uruguay), voseo.

## Tokens

Defined in `app/globals.css` under `@theme`. Use the Tailwind utilities they
generate (`bg-canvas`, `text-ink`, `text-muted`, `border-line`, …).

Surfaces layer deep indigo > deeper indigo > trench, front to back.

NOTE: `--color-gold` and `--color-ocean` hold a light blue in this theme — the
token names were kept when the palette moved from terracotta to marine to avoid
a rename sweep across every component. Read `gold` as "the accent", not a colour.

| Token | Value | Role |
| --- | --- | --- |
| `canvas` | `#03045e` | Primary surface — body, cards, nav |
| `mist` | `#02033f` | Deeper section tint (Hero, Experiences, Footer) |
| `sand` | `#01012a` | Reservation section — the form card floats on it |
| `shell` | `#26306e` | Steel — image placeholder, disabled control fill |
| `ink` | `#f2f7fb` | Cool near-white — headings, primary text, solid buttons |
| `ink-soft` | `#dbe6f1` | Secondary headings, list copy |
| `muted` | `#aec3d8` | Cool grey-blue — body / supporting text |
| `faint` | `#89a1ba` | Dim slate — placeholders, fine print |
| `line` | `#2a2f70` | Steel hairline borders, dividers |
| `gold` | `#79c2e3` | Accent — brand dot, datelines, chevrons, hairlines, focus |
| `gold-soft` | `#a5dbef` | Lighter accent / accent hover |
| `ocean` | `#79c2e3` | Interactive — text links, active form controls, focus ring |
| `ocean-deep` | `#a5dbef` | Link / control hover |

Spacing rhythm: `--spacing-section` (`clamp(4.5rem, 10vw, 8.5rem)`) between
major sections; `--spacing-section-tight` for the intro band.
Standard easing: `cubic-bezier(0.16, 1, 0.3, 1)` (exponential out).

## Type

- **Display** — Playfair Display (`font-display`), variable, medium (500) for
  headings, 400 italic for accents. Tracking `-0.022em` at hero
  scale, `-0.02em` elsewhere. Hero clamps to `5.5rem`; section headings to
  ~`3.1rem`. Used only for large headings and the wordmark.
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
`Experiences` (el mediodía / la cena / el bar as
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
