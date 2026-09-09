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
    image: IMG("1579670039509-e21e75007e4c"),
  },
  {
    id: "e2",
    name: "Mejillones a la provenzal",
    description: "Ajo, perejil, vino blanco y pan tostado",
    price: 590,
    category: "entradas",
    tags: ["dinner", "bar"],
    image: IMG("1516687773447-14c58c40816e"),
  },
  {
    id: "f1",
    name: "Pesca del Día a la Sal",
    description:
      "Corvina negra entera en costra de sal marina, papas al romero y manteca de hierbas del puerto",
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
    image: IMG("1519233991914-26a44330ccd7"),
  },
  {
    id: "m1",
    name: "Cazuela de mariscos",
    description:
      "Mejillones, chipirones, langostinos y almejas en fumet de azafrán",
    price: 940,
    category: "mariscos",
    tags: ["dinner"],
    image: IMG("1571167366136-b57e07761625"),
  },
  {
    id: "pa1",
    name: "Linguine Frutti di Mare",
    description:
      "Pasta artesanal al huevo salteada con mejillones frescos, chipirones tiernos, langostinos y vino blanco",
    price: 760,
    category: "pastas",
    tags: ["lunch", "dinner"],
    image: IMG("1569494315581-abddb8d41cfe"),
  },
  {
    id: "pr1",
    name: "Pulpo a la parrilla",
    description: "Tentáculo grillado, puré de papa ahumada y pimentón",
    price: 880,
    category: "parrilla",
    tags: ["dinner"],
    image: IMG("1575840925760-d98bb91c7f7b"),
  },
  {
    id: "en1",
    name: "Ensalada Costera de Pulpo",
    description:
      "Pulpo a la brasa sobre hojas verdes estivales, tomates cherry confitados y vinagreta de limón y alcaparras",
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
