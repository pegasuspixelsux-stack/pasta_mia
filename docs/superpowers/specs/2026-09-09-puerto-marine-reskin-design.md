# Puerto — reskin marino + reescritura de contenido

**Fecha:** 2026-09-09
**Tipo:** Arquitectónico (rediseño transversal + reescritura de contenido)
**Estado:** Aprobado el diseño en chat; pendiente revisión del spec.

## Contexto

El repo es un sitio Next.js App Router completo y funcional, originalmente un
template de pizzería napolitana en Punta del Este, en proceso de adaptación a
"Puerto" — un restaurante de mar. Incluye:

- **Home** (`app/page.tsx`): `SiteHeader` · `Hero` · `Narrative` · `Experiences`
  · `Atmosphere` · `Reviews` · `Gallery` · `Reservation` · `SiteFooter`.
- **Carta pública** (`app/menu/page.tsx` + `MenuBrowser`).
- **Panel admin** maqueta (`app/admin` + `app/components/admin/*`): login demo,
  tabs Reservas / Carta / Configuración. Sin backend; nada persiste.
- Contenido estático en `app/lib/content.ts`, `app/lib/menu.ts`,
  `app/lib/admin-demo.ts`, `app/lib/menu-import.ts`.

El sistema visual es **token-driven**: `app/globals.css` define tokens de color
semánticos bajo `@theme`, y los componentes usan casi exclusivamente las
utilidades de Tailwind v4 generadas desde ellos (`bg-canvas`, `text-ink`,
`text-gold`, `border-line`, …). Un remapeo de valores reskinea la mayor parte
del sitio sin tocar componentes.

## Objetivo

1. **Reskin visual** de todo el sitio (home + `/menu` + admin) a una paleta
   marina oscura — navy profundo con texto claro y acento celeste —
   manteniendo la estructura y la estética "dark" actual (misma jerarquía de
   superficies que hoy, sólo que en tonos de mar).
2. **Tipografía display** Playfair Display → Cormorant Garamond.
3. **Reescritura de contenido** de pizzería napolitana a restaurante de mar,
   en español rioplatense con voseo, incluida la metadata y `DESIGN.md`.

Decisiones tomadas:
- Estrategia de tokens: **remapear valores, mantener nombres** (no renombrar).
- Acento: celeste **`#79c2e3`** (no el azul acero del mockup — poco contraste
  sobre navy).
- Sucursales: **un solo local** (Muelle Principal). Se colapsa `locations` a
  una entrada.

## No-objetivos

- No hay cambios de backend ni de arquitectura de datos — sigue siendo una
  maqueta estática.
- No se reestructura la composición de la home (mismas secciones, mismo orden).
- No se tocan animaciones ni comportamiento de componentes salvo strings.
- `favicon.ico` queda como está (binario genérico).
- Las fotos siguen siendo placeholders de Unsplash (se cambian los IDs por
  imágenes costeras/de mar, no se suben fotos propias).

## Diseño

### 1. Paleta (`app/globals.css` → `@theme`)

Se remapean los valores; los nombres de token y su rol no cambian. Superficies
en capas: `canvas` > `mist` > `sand`, de adelante hacia atrás.

| Token | Valor actual | Valor nuevo | Rol |
| --- | --- | --- | --- |
| `--color-canvas` | `#8b3a2b` | `#0d2a4d` | superficie primaria — body, cards, nav |
| `--color-mist` | `#7c2d12` | `#0a2140` | tinte de sección — Hero, Experiences, Reviews, Footer |
| `--color-sand` | `#6b2410` | `#071a33` | sección más profunda — Reservation |
| `--color-shell` | `#a04735` | `#1c3d63` | placeholder de imagen, fill deshabilitado |
| `--color-ink` | `#fdfbf7` | `#f2f7fb` | títulos, texto primario, botones sólidos |
| `--color-ink-soft` | `#f0e6da` | `#dbe6f1` | texto secundario |
| `--color-muted` | `#e5d5c5` | `#aec3d8` | cuerpo / texto de apoyo |
| `--color-faint` | `#d9c6b2` | `#89a1ba` | placeholders, fine print |
| `--color-line` | `#9e5140` | `#22406a` | hairlines, divisores |
| `--color-gold` | `#f5c542` | `#79c2e3` | acento — brand dot, datelines, chevrons, estrellas, focus |
| `--color-gold-soft` | `#ffd166` | `#a5dbef` | hover del acento / acento más claro |
| `--color-ocean` | `#ffd166` | `#79c2e3` | interactivo — links, controles activos, focus ring |
| `--color-ocean-deep` | `#f5c542` | `#a5dbef` | hover de link / control |
| `--color-adm-bg` | `#fdfbf7` | *(sin cambio)* | workspace claro del admin |
| `--color-adm-panel` | `#ffffff` | *(sin cambio)* | cards / forms / tablas del admin |
| `--color-adm-ink` | `#33251e` | `#1b2a3d` | texto near-black (frío) del admin |
| `--color-adm-muted` | `#6e5f55` | `#5a6b7d` | texto secundario del admin |
| `--color-adm-faint` | `#9c8c81` | `#8a99a8` | fine print del admin |
| `--color-adm-border` | `#ebe4dc` | `#e2e8ef` | hairlines del admin |
| `--color-adm-sidebar` | `#8b3a2b` | `#0d2a4d` | sidebar del admin |
| `--color-adm-sidebar-deep` | `#7c2d12` | `#0a2140` | hover / activo del sidebar |

Notas:
- `--color-gold` conserva el nombre aunque ahora contiene un celeste. Se
  documenta explícitamente en `DESIGN.md` para que nadie lo lea como error.
- Comentarios en `@theme`: actualizar la descripción de la paleta ("Warm brick
  palette — wood-fired oven tones…" → paleta marina) y el rol de cada token
  que menciona color cálido.
- `.scrim-hero`, `.scrim-soft`, `::selection` referencian `--color-canvas` /
  `--color-gold` con `color-mix`, así que siguen la paleta automáticamente.
- Scrollbar: el hover hardcodeado `#b5604d` (línea ~89) → un steel más claro,
  `#2f5a86`.

### 2. Hexes hardcodeados a corregir

Buscar con `rg '#[0-9a-fA-F]{3,8}|rgba?\('` en `app/`. Casos:

| Archivo | Actual | Acción |
| --- | --- | --- |
| `globals.css` ~89 | `#b5604d` (scrollbar hover) | `#2f5a86` |
| `components/SiteHeader.tsx` ~35 | `rgba(15,23,42,0.25)` shadow | dejar (sombra neutra, funciona sobre navy) |
| `components/Reservation.tsx` ~76,177 | `rgba(15,23,42,...)` shadow | dejar |
| `components/Reservation.tsx` ~215,219 | `bg-[#2b1710]` (fondo `<option>`) | `bg-[#0a2140]` |
| `components/Reservation.tsx` ~219 | `text-[#fdfbf7]` | `text-[#f2f7fb]` |
| `components/Gallery.tsx` ~44 | `text-[#fdfbf7]` (caption sobre foto) | `text-[#f2f7fb]` |
| `components/admin/AdminLogin.tsx` ~34,36 | `#2a140d`, `#1f0f0a` (overlays cálidos) | `#071a33` / `#0a2140` |
| `components/admin/AdminLogin.tsx` ~110 | `text-[#f0a789]` (error) | `text-[#f0a9a9]` (rojo suave neutro) |
| `components/admin/AdminLogin.tsx` ~118 | `text-[#2a140d]` (texto de botón claro) | `text-[#0d2a4d]` |
| `components/admin/*` status | `#7FB37E`, `#F5C542`/`#E0A82E`, `#b0442e`, `#2f8f45`/`#256f37`, `#3f7d3c`, `#8a5c10` | **dejar** — colores por rol (ok/pendiente/peligro/WhatsApp) sobre panel claro; siguen leyéndose. Opcional: ámbar pendiente a `#E0A82E` ya está bien. |

### 3. Tipografía (`app/layout.tsx`, `app/globals.css`, `DESIGN.md`)

- `layout.tsx`: reemplazar el import y la instancia:
  ```ts
  import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";

  const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    variable: "--ff-display",
    display: "swap",
    weight: ["400", "600", "700"],
    style: ["normal", "italic"],
  });
  ```
  Renombrar la const `playfair` → `cormorant` y actualizar `className`.
- `globals.css`: `--font-display` fallback `"Playfair Display"` → `"Cormorant
  Garamond"`.
- Headings: Cormorant es más fina y de alto contraste. Subir el peso de display
  de `font-medium` (500) a `font-semibold` (600) donde hoy se usa `font-medium`
  junto a `font-display` (Hero, section headings, Narrative, Atmosphere,
  Experiences, MenuBrowser, menu/page, AdminLogin). El tracking negativo actual
  (`-0.022em` / `-0.02em`) se mantiene; Cormorant lo tolera bien a escala
  grande.
- `DESIGN.md` sección Type: reescribir para Cormorant Garamond (pesos 600/700,
  nota sobre fragilidad a tamaño chico).

### 4. Contenido → restaurante de mar

Concepto: **Puerto — cocina de mar en el puerto de Punta del Este.** Pescados
del día, mariscos, pastas marineras, parrilla de mar, y un bar frente a los
yates. Se mantiene la estructura de tres servicios (El Mediodía / La Cena / El
Bar), re-tematizada. Voseo en todo CTA y trato directo.

#### `app/lib/content.ts` — reescritura completa (misma forma, mismas claves)

- Comentario de cabecera: actualizar (IDs de foto nuevos).
- `img`: nuevos IDs Unsplash costeros/de mar (hero de puerto/mar, midday plato
  de pescado, dinner mariscos, bar, atmosphere terraza al agua).
- `nav`: `"La Carta"` (queda), `"La Pizza"` → `"La Cocina"` (`/#experiences`),
  `"Bar"` (queda), `"Eventos"` (queda).
- `hero`: `place` queda; `title` → tres líneas de mar; `subtitle` → pesca del
  día, mariscos, frente a los yates; `cta` → `"Ver la cocina"`.
- `narrative`: frase sobre el mar / la pesca del día.
- `experiences` (×3): re-tematizar `El Mediodía` / `La Cena` / `El Bar` —
  `body`, `alt`, `detail.lead`, `detail.items` con platos de mar. IDs (`id`),
  `kicker` (horarios), `title`, `link` se mantienen en forma.
- `atmosphere`: `title` + `paragraphs` sobre cocina de mar y el puerto; `cta`
  queda.
- `reviews` (×6): reescribir las citas para un restaurante de mar; `author`,
  `rating`, `meta` en la misma forma.
- `galleryIntro` + `gallery`: `alt` de cada imagen a escenas de mar; IDs de
  foto nuevos.
- `reservation`: `seatings` `["Terraza", "Salón", "Barra junto al horno"]` →
  `["Terraza", "Salón", "Barra del puerto"]`. `times`, `guests` quedan.
- `contact`: `emailLabel`/`emailHref` → `hola@puerto.uy`. Teléfono queda
  (placeholder plausible).
- `locations`: **colapsar a un solo objeto** — Muelle Principal (Calle 27 y
  Las Focas, Punta del Este), un teléfono, horario "Martes a domingo ·
  12:00 – 00:00". `id: "puerto"`.
- `footerLinks`: actualizar labels de pizza (`"La Pizza"` → `"La Cocina"`,
  `"Vinos y amari"` → `"Vinos y cócteles"`, etc.). Hrefs quedan.

#### `app/lib/menu.ts`

- Comentario de cabecera: actualizar (carta de mar, parcial).
- `MenuItem["category"]` union → `"entradas" | "pescados" | "mariscos" |
  "pastas" | "parrilla" | "ensaladas" | "postres" | "vinos" | "cervezas" |
  "cocteles" | "sin_alcohol"`.
- `categoryLabels`: etiquetas nuevas (`entradas` → "Entradas y minutas",
  `pescados` → "Pescados", `mariscos` → "Mariscos", `parrilla` → "Parrilla de
  mar", `ensaladas` → "Ensaladas", `cocteles` → "Cócteles", resto directo).
- `categoryOrder`: `["entradas", "pescados", "mariscos", "pastas", "parrilla",
  "ensaladas", "postres", "vinos", "cervezas", "cocteles", "sin_alcohol"]`.
- `MENU_DATA`: reescribir los ~6 ítems a platos de mar, ~8–10 total,
  incluyendo los tres del mockup (Pesca a la Sal / `pescados` $890,
  Linguine Frutti di Mare / `pastas` $760, Ensalada Costera de Pulpo /
  `ensaladas` $680) + entradas, mariscos y un par de cócteles. Nuevos IDs de
  imagen. `tags`
  (`lunch`/`dinner`/`bar`) se mantienen.
- `sectionLabels` / `sectionOrder` (Almuerzo / Cena / Bar): **sin cambio**.
- `formatPrice`: sin cambio.

#### `app/lib/menu-import.ts`

- `DRINK_CATS`: `["vinos", "cervezas", "tragos", "sin_alcohol"]` →
  `["vinos", "cervezas", "cocteles", "sin_alcohol"]`.
- `toCategory` fallback: `"pizzas"` → `"entradas"`.
- `CSV_TEMPLATE`: ejemplos de mar (p. ej. una entrada, un pescado, un cóctel);
  columna `category` con los slugs nuevos.
- Comentario de cabecera: sin cambio material (sigue describiendo columnas).

#### `app/components/admin/MenuManager.tsx`

- `empty.category`: `"pizzas"` → `"entradas"`.
- Placeholders de ejemplo en inputs (`"Margherita"`, `"Salsa de tomate, Fior
  di Latte, albahaca…"`, `"590"`) → ejemplos de mar. Cosmético, opcional pero
  recomendado por coherencia.

#### `app/lib/admin-demo.ts`

- `DEMO_CREDENTIALS.email`: `admin@pizzeria.uy` → `admin@puerto.uy`.
- `ADMIN_SESSION_KEY`: `"pizzeria-admin-demo"` → `"puerto-admin-demo"`.
- `SEED_RESERVATIONS`: notas que mencionan pizza/gluten/horno → notas de mar
  (p. ej. "Alergia a mariscos — consultan opciones", "Mesa contra la ventana
  para ver los barcos"). Fechas, nombres, teléfonos quedan.

#### Metadata

- `app/layout.tsx`: `metadataBase` `https://pizzeria.example` →
  `https://puerto.example`; `title`, `description`, `openGraph.title/description`
  a texto de restaurante de mar; `locale` queda `es_UY`.
- `app/menu/page.tsx`: `metadata.title` `"La Carta — Pizzeria…"` →
  `"La Carta — Puerto…"`; `description` de mar. Copy inline de la página
  (`<h1>La Carta`, el párrafo introductorio) a texto de mar.
- `app/admin/page.tsx`: `metadata.title` `"Panel — Pizzeria"` →
  `"Panel — Puerto"`.

#### Strings inline en componentes

| Archivo | String | Nuevo |
| --- | --- | --- |
| `SiteHeader.tsx` ~47 | `Pizzeria` | `Puerto` |
| `SiteFooter.tsx` ~13 | `Pizzeria` | `Puerto` |
| `SiteFooter.tsx` ~16-18 | párrafo "Una pizzería napolitana…" | párrafo de mar |
| `SiteFooter.tsx` ~70 | heading `"Sucursales"` | `"Dónde estamos"` (un local) |
| `SiteFooter.tsx` ~95 | `© … Pizzeria. Una maqueta…` | `© … Puerto. Una maqueta…` |
| `Experiences.tsx` ~20 | `"Tres servicios, un horno"` | `"Tres servicios, una cocina de mar"` |
| `Atmosphere.tsx` ~19 | `alt` "Amigos compartiendo pizza…" | alt de mesa al agua |
| `Reservation.tsx` ~66 | `"Península · Maldonado · Solanas"` | `"Muelle Principal · Punta del Este"` |
| `Reservation.tsx` ~57 | `"O llamá al salón"` | queda |
| `AdminLogin.tsx` ~9 | `BG` (foto de pizza) | foto de mar / puerto |
| `AdminLogin.tsx` ~46 | `Pizzeria` | `Puerto` |
| `AdminLogin.tsx` ~71 | placeholder `admin@pizzeria.uy` | `admin@puerto.uy` |
| `AdminDashboard.tsx` ~85,126 | `"Pizzería · Panel"` | `"Puerto · Panel"` |
| `ReservationsPanel.tsx` ~38 | `confirmMessage` "…de Pizzeria." | "…de Puerto." |
| `ReservationsPanel.tsx` ~154 | asunto `"Tu reserva en Pizzeria"` | `"Tu reserva en Puerto"` |
| `ConfigPanel.tsx` ~24 | `name: "Pizzeria"` | `name: "Puerto"` |
| `ConfigPanel.tsx` ~26,138 | `hola@pizzeria.uy`, `puntadeleste@pizzeria.uy` | `@puerto.uy` |
| `ConfigPanel.tsx` ~97 | `<Section title="Sucursales">` | `title="Ubicación"` |

Nota `ConfigPanel`: `locs` deriva de `SEED_LOCATIONS` (`content.ts` `locations`).
Al colapsar `locations` a un elemento, la sección "Ubicación" muestra una sola
tarjeta — funciona sin cambios de lógica.

### 5. `DESIGN.md`

Reescribir:
- Título y párrafo de intro: "Pizzeria — Design system" → "Puerto — Design
  system"; concepto de cocina de mar en el puerto.
- Tabla de tokens: valores marinos nuevos, roles, nota sobre `gold` = celeste.
- Sección Type: Cormorant Garamond.
- Sección Surfaces & motion, Layout, Notes: reemplazar menciones de horno /
  pizza / Unsplash pizza por equivalentes de mar; actualizar la lista de
  sucursales → un local.

## Plan de implementación (alto nivel)

Orden sugerido, cada paso verificable:

1. **Tokens + fuente** — `globals.css` (`@theme`, scrollbar, comentarios),
   `layout.tsx` (Cormorant + metadata). Verificar: `next dev`, home carga con
   paleta marina, tipografía nueva.
2. **Hexes hardcodeados** — barrido `rg`, aplicar tabla §2. Verificar: no
   quedan tonos cálidos en home / `/menu` / `/admin`.
3. **Pesos de display** — subir `font-medium` → `font-semibold` en headings
   con `font-display`. Verificar visualmente.
4. **`content.ts`** — reescritura completa + un solo `location`. Verificar:
   home y footer con texto de mar, sin referencias a pizza.
5. **`menu.ts` + `menu-import.ts` + `MenuManager` `empty`** — union type nuevo,
   labels, `MENU_DATA`, `DRINK_CATS`, fallback, template. Verificar:
   `npx tsc --noEmit` limpio; `/menu` y admin → Carta renderizan.
6. **`admin-demo.ts` + strings inline admin** — credenciales, session key,
   seeds, marca. Verificar: login demo funciona con `admin@puerto.uy`.
7. **Strings inline home** — `SiteHeader`, `SiteFooter`, `Experiences`,
   `Atmosphere`, `Reservation`.
8. **Metadata** `menu/page.tsx`, `admin/page.tsx` + copy inline de `menu/page`.
9. **`DESIGN.md`**.
10. **Verificación final** — `npm run build` + `npm run lint`; recorrido visual
    home / `/menu` / `/admin` (login + Reservas + Carta + Configuración);
    chequeo de contraste de texto sobre navy y focus rings.

## Testing

- `npx tsc --noEmit` — obligatorio tras el cambio de union `MenuItem["category"]`
  (atrapa cualquier referencia a `"pizzas"` / `"tragos"` que quede).
- `npm run lint`.
- `npm run build` — sin errores.
- Revisión visual manual en `next dev` de las tres superficies. No hay tests
  automatizados en el repo; no se agregan en este trabajo (reskin + copy).

## Riesgos

- **Contraste**: `muted` `#aec3d8` sobre `canvas` `#0d2a4d` ≈ 7:1 (ok AA). Los
  scrims del hero oscurecen el fondo — verificar que el texto del Hero (sobre
  foto + scrim) siga legible; ajustar opacidad del scrim si hace falta.
- **`gold` = celeste**: confuso al leer el código. Mitigado documentándolo en
  `DESIGN.md` y en los comentarios de `@theme`.
- **Cormorant a tamaño chico**: los markers `label-track` (0.72rem) y kickers
  usan `font-sans`, no display, así que no afectados. Los headings son grandes.
  Riesgo bajo.
- **Cambio de union type**: `tsc` lo cubre; el paso 5 lo verifica antes de
  seguir.
