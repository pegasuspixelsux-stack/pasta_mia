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
  hero: `${U}1701906876373-54a5452b149f?w=2200&ar=16:10${q}`,
  midday: `${U}1534422298391-e4f8c172dddb?w=1400&ar=1:1${q}`,
  dinner: `${U}1571167366136-b57e07761625?w=1400&ar=1:1${q}`,
  bar: `${U}1590947132387-155cc02f3212?w=1400&ar=1:1${q}`,
  atmosphere: `${U}1559339352-11d035aa65de?w=1700&ar=4:3${q}`,
};

export const nav = [
  { label: "La Carta Náutica", href: "/menu" },
  { label: "Nuestra Esquina", href: "/#nosotros" },
  { label: "Amarre & Reservas", href: "/#reserve" },
] as const;

export const hero = {
  place: "Frente al Muelle Principal",
  title: ["El sabor del mar,", "directo a tu mesa."],
  subtitle:
    "Pescados del día, mariscos frescos de roca, pastas marineras y ensaladas estivales con la postal más hermosa de la bahía.",
  cta: "Ver la carta de mar",
};

export const intro = {
  kicker: "Tradición costera",
  title: "Un refugio de mar en el corazón del puerto de Punta del Este.",
  columns: [
    {
      title: "Almuerzos al sol",
      body: "Pesca del día y ensaladas frescas en la terraza abierta, mientras entran y salen los botes.",
    },
    {
      title: "Cenas y atardeceres",
      body: "La sala baja la luz, salen las pastas marineras y la coctelería de autor, y el puerto se apaga del otro lado de las ventanas.",
    },
  ],
};

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
  { src: img.hero, alt: "Los yates en el Muelle Principal", size: "hero" },
  { src: img.midday, alt: "Pescado apenas salido de la plancha", size: "square" },
  {
    src: `${U}1467003909585-2f8a72700288?w=1400&ar=3:4${q}`,
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
    src: `${U}1615141982883-c7ad0e69fd62?w=1200&ar=1:1${q}`,
    alt: "Lo que entró hoy",
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
  phoneLabel: "+598 4244 8899",
  phoneHref: "tel:+59842448899",
  emailLabel: "reservas@puertopuntadeleste.com",
  emailHref: "mailto:reservas@puertopuntadeleste.com",
};

export const locations = [
  {
    id: "puerto",
    name: "Muelle Principal",
    address: "Calle 27 y Las Focas, Muelle Principal, Punta del Este",
    phoneLabel: "+598 4244 8899",
    phoneHref: "tel:+59842448899",
    hours: "Martes a domingo · 12:00 – 00:00 · Lunes cerrado",
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
