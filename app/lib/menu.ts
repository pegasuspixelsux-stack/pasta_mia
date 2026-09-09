/**
 * Carta de Pasta Mia (página /menu).
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
  unit?: string; // "Copa", "Botella", "1/2 porción"
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

/** Unsplash helper — VERIFICAR y reemplazar por fotos propias del local. */
const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=75&auto=format&fit=crop`;

export const sectionLabels: Record<MenuItem["tags"][number], string> = {
  lunch: "Almuerzo",
  dinner: "Cena",
  bar: "Bar",
};

export const sectionOrder: MenuItem["tags"][number][] = ["lunch", "dinner", "bar"];

export const categoryLabels: Record<MenuItem["category"], string> = {
  entradas: "Antipasti",
  pescados: "Pescados",
  mariscos: "Mariscos",
  pastas: "Pastas",
  parrilla: "Del horno",
  ensaladas: "Ensaladas",
  postres: "Dolci",
  vinos: "Vinos",
  cervezas: "Cervezas",
  cocteles: "Cócteles",
  sin_alcohol: "Sin alcohol",
};

export const categoryOrder: MenuItem["category"][] = [
  "entradas",
  "pastas",
  "parrilla",
  "ensaladas",
  "postres",
  "pescados",
  "mariscos",
  "vinos",
  "cervezas",
  "cocteles",
  "sin_alcohol",
];

export const MENU_DATA: MenuItem[] = [
  {
    id: "a1",
    name: "Burrata con tomates asados",
    description:
      "Burrata fresca, tomates cherry asados, albahaca y aceite de oliva virgen extra",
    price: 520,
    category: "entradas",
    tags: ["lunch", "dinner", "bar"],
    image: IMG("1516687773447-14c58c40816e"),
  },
  {
    id: "a2",
    name: "Arancini de ragù",
    description:
      "Bolas de risotto rellenas de ragù, empanadas y fritas, con parmesano",
    price: 460,
    category: "entradas",
    tags: ["dinner", "bar"],
    image: IMG("1579670039509-e21e75007e4c"),
  },
  {
    id: "pa1",
    name: "Tagliatelle al Ragù Bolognese",
    description:
      "Ragù de carne vacuna y de cerdo cocido a fuego lento por horas con tomate San Marzano",
    price: 790,
    category: "pastas",
    tags: ["lunch", "dinner"],
    image: IMG("1473093226795-af9932fe5856"),
  },
  {
    id: "pa2",
    name: "Ravioli di Ricotta e Spinaci",
    description:
      "Pasta plegada a mano rellena de ricota fresca y espinaca, manteca de salvia tostada",
    price: 740,
    category: "pastas",
    tags: ["lunch", "dinner"],
    image: IMG("1569494315581-abddb8d41cfe"),
  },
  {
    id: "pa3",
    name: "Gnocchi alla Sorrentina",
    description:
      "Ñoquis de papa al horno de leña con fior di latte y albahaca",
    price: 710,
    category: "pastas",
    tags: ["lunch", "dinner"],
    image: IMG("1551183053-bf91a1d81141"),
  },
  {
    id: "pa4",
    name: "Spaghetti alla Carbonara",
    description:
      "Huevo, guanciale, pecorino romano y pimienta negra. Sin crema, como en Roma",
    price: 720,
    category: "pastas",
    tags: ["lunch", "dinner"],
    image: IMG("1481931098730-318b6f776db0"),
  },
  {
    id: "h1",
    name: "Lasagna della Nonna",
    description:
      "Capas de pasta al huevo, ragù, besciamella y parmesano, al horno",
    price: 780,
    category: "parrilla",
    tags: ["dinner"],
    image: IMG("1571167366136-b57e07761625"),
  },
  {
    id: "en1",
    name: "Ensalada Tricolore",
    description:
      "Rúcula, tomate, muzzarella fresca, aceite de oliva y vinagre balsámico",
    price: 480,
    category: "ensaladas",
    tags: ["lunch", "dinner"],
    image: IMG("1540420773420-3366772f4999"),
  },
  {
    id: "d1",
    name: "Tiramisú de la casa",
    description:
      "Mascarpone, café espresso, cacao y bizcochos. Receta de familia",
    price: 380,
    category: "postres",
    tags: ["lunch", "dinner", "bar"],
    image: IMG("1571877227200-a0d98ea607e9"),
  },
  {
    id: "v1",
    name: "Chianti Classico",
    description: "Toscana — sangiovese, fruta roja y final seco, va con el ragù",
    price: 340,
    priceSecondary: 1560,
    unit: "Copa",
    category: "vinos",
    tags: ["lunch", "dinner", "bar"],
  },
  {
    id: "c1",
    name: "Negroni de la casa",
    description: "Gin, Campari, vermut rojo, cáscara de naranja quemada",
    price: 440,
    category: "cocteles",
    tags: ["bar", "dinner"],
  },
];

export function formatPrice(n: number): string {
  return `$ ${new Intl.NumberFormat("es-UY").format(n)}`;
}
