/**
 * Contenido estático para la maqueta de la home de Pasta Mia.
 *
 * Pasta Mia no es un negocio real. La dirección, el teléfono, el horario y los
 * precios de abajo son marcadores plausibles para una trattoria de barrio en
 * Montevideo — reemplazalos por datos reales antes de cualquier uso en
 * producción.
 *
 * Fotografía: Unsplash (unsplash.com/license). Los IDs `photo` de abajo son
 * marcadores — VERIFICÁ cada imagen y reemplazala por fotos con licencia o
 * propias del local, y acreditá a los fotógrafos según haga falta.
 */

const U = "https://images.unsplash.com/photo-";
const q = "&q=80&auto=format&fit=crop";

export const img = {
  hero: `${U}1473093226795-af9932fe5856?w=2200&ar=16:10${q}`,
  midday: `${U}1551183053-bf91a1d81141?w=1400&ar=1:1${q}`,
  dinner: `${U}1481931098730-318b6f776db0?w=1400&ar=1:1${q}`,
  bar: `${U}1510812431401-41d2bd2722f3?w=1400&ar=1:1${q}`,
  atmosphere: `${U}1414235077428-338989a2e8c0?w=1700&ar=4:3${q}`,
};

export const nav = [
  { label: "La Carta", href: "/menu" },
  { label: "La Casa", href: "/#nosotros" },
  { label: "Reservas", href: "/#reserve" },
] as const;

export const hero = {
  place: "Trattoria de barrio — Pocitos",
  title: "Pasta Mia",
  subtitle:
    "Amasamos todos los días, las salsas se cocinan a fuego lento y el pan sale caliente a la mesa. Una carta corta de clásicos italianos, hecha como en casa.",
  cta: "Ver la carta de pastas",
};

export const intro = {
  kicker: "Cocina de familia",
  title: "Una trattoria de barrio donde se amasa a mano todas las mañanas.",
  columns: [
    {
      title: "La masa, cada mañana",
      body: "Harina, huevos y tiempo. Estiramos la pasta del día temprano — tagliatelle, ravioli, gnocchi — y se cocina apenas la pedís.",
    },
    {
      title: "Salsas a fuego lento",
      body: "El ragù se cocina por horas y el tomate San Marzano se hace despacio. Recetas que pasaron de nonna a nieta sin cambiar una coma.",
    },
  ],
};

export const craft = {
  kicker: "El arte del detalle",
  title: "Pastas y salsas caseras",
  lede: "Cada variedad de pasta se elabora a diario con sémola de grano duro y se combina con salsas tradicionales que honran nuestras raíces italianas.",
  columns: [
    {
      title: "Nuestras pastas",
      note: "Estiradas a mano y cortadas todos los días en nuestra cocina.",
      image: `${U}1556761223-4c4282c73f77?w=900&ar=16:10${q}`,
      alt: "Manos amasando pasta fresca sobre la mesa de trabajo enharinada.",
      items: [
        "Tagliatelle y fettuccine al huevo",
        "Sorrentinos de calabaza y muzzarella",
        "Ravioles de ricota, nuez y espinaca",
        "Ñoquis caseros de papa rústica",
        "Pappardelle de sémola de grano duro",
        "Panzerotti rellenos de osobuco",
      ],
    },
    {
      title: "Nuestras salsas",
      note: "Preparadas a fuego lento con ingredientes frescos de estación.",
      image: `${U}1481931098730-318b6f776db0?w=900&ar=16:10${q}`,
      alt: "Pasta salseada a fuego lento en una cazuela humeante.",
      items: [
        "Ragù bolognese estofado por seis horas",
        "Pomodoro fresco con albahaca y oliva",
        "Pesto genovés de albahaca y piñones",
        "Crema de hongos porcini y trufa",
        "Caruso clásica con jamón, champiñones y crema",
        "Putanesca con anchoas, alcaparras y aceitunas negras",
        "Cuatro formaggi: provolone, gorgonzola, fontina y parmesano",
      ],
    },
  ],
};

export const cellar = {
  kicker: "Cava y coctelería",
  title: "La Barra",
  lede: "Selección de vinos de bodega por copa y botella para maridar nuestras pastas. Mirá la carta completa para precios y cosechas.",
  groups: [
    {
      tag: "Tintos",
      title: "Vinos tintos",
      image: `${U}1510812431401-41d2bd2722f3?w=1100&ar=4:3${q}`,
      alt: "Dos copas de vino tinto sobre una mesa de madera con luz cálida.",
      items: [
        { name: "Tannat Reserva", note: "Corte robusto de Maldonado", serve: "Copa · Botella" },
        { name: "Chianti Classico DOCG", note: "Toscana, Italia", serve: "Copa · Botella" },
        { name: "Malbec Valle de Uco", note: "Mendoza, Argentina", serve: "Copa · Botella" },
      ],
    },
    {
      tag: "Blancos y rosados",
      title: "Blancos y frescos",
      image: `${U}1474722883778-792e7990302f?w=1100&ar=4:3${q}`,
      alt: "Una copa de vino blanco servida junto a un racimo de uvas sobre lino claro.",
      items: [
        { name: "Pinot Grigio delle Venezie", note: "Véneto, Italia", serve: "Copa · Botella" },
        { name: "Albariño costero", note: "Garzón, Uruguay", serve: "Copa · Botella" },
        { name: "Rosé de Sangiovese", note: "Toscana, Italia", serve: "Copa · Botella" },
      ],
    },
    {
      tag: "Espumosos y digestivos",
      title: "Burbujas y amari",
      image: `${U}1553361371-9b22f78e8b1d?w=1100&ar=4:3${q}`,
      alt: "Botellas de vino en fila sobre un estante de madera.",
      items: [
        { name: "Prosecco DOC Extra Dry", note: "Véneto, Italia", serve: "Copa · Botella" },
        { name: "Limoncello della casa", note: "Artesanal, bien frío", serve: "Copa" },
        { name: "Grappa Riserva", note: "Digestivo tradicional", serve: "Copa" },
      ],
    },
  ],
};

export const atmosphere = {
  title: ["Cocinamos al ritmo", "que marca la masa."],
  paragraphs: [
    "La pasta se amasa cada mañana y el menú del día se arma con lo que salió de la mesa de trabajo, así que cambia un poco según el día. Armamos el lugar como una casa — mesas de madera, mantel a cuadros, la cocina a la vista y una barra desde donde se ve hervir la olla.",
    "Cenas privadas, cumpleaños y sobremesas largas toman la sala del fondo o el salón entero. Contanos la ocasión y cuántos son, y armamos un menú alrededor de la pasta del día.",
  ],
  cta: "Consultá por eventos",
};

export const reviewsIntro = {
  title: "Opiniones",
  lede: "Testimonios ilustrativos para la demo — texto de muestra, no reseñas reales.",
};

export const reviews = [
  {
    author: "Comensal del barrio",
    rating: 5,
    quote:
      "La pasta al huevo se nota que es del día. Los tagliatelle al ragù estaban como los de mi abuela y el pan caliente no paraba de venir.",
    meta: "$700–900",
  },
  {
    author: "Pareja de Pocitos",
    rating: 5,
    quote:
      "Los ravioli de ricota y espinaca con manteca de salvia, una locura. Buena carta de tintos italianos por copa. Siempre lleno, conviene reservar.",
    meta: "$1.400–1.700",
  },
  {
    author: "Visitante de Buenos Aires",
    rating: 5,
    quote:
      "Los gnocchi alla sorrentina salen del horno burbujeando y la salsa de tomate San Marzano está hecha con paciencia. Volvimos dos veces en el viaje.",
    meta: "Cena",
  },
  {
    author: "Familia, Montevideo",
    rating: 5,
    quote:
      "Nos quedamos tres horas. Pan casero, pasta fresca, un tinto de la casa buenísimo y de postre un tiramisú que todavía recuerdo.",
    meta: "$900–1.100",
  },
  {
    author: "Clienta habitual",
    rating: 5,
    quote:
      "Vengo cada semana. La masa siempre igual de buena, las salsas a fuego lento y te tratan como de la familia. El ragù del domingo es sagrado.",
    meta: "Comer allí",
  },
  {
    author: "Turista de Santiago",
    rating: 5,
    quote:
      "Trattoria de verdad: mantel a cuadros, cocina a la vista y pasta hecha a mano. Pedí los tagliatelle y una copa de Chianti y salí feliz.",
    meta: "$800–1.000",
  },
] as const;

export const galleryIntro = {
  title: "Un vistazo a la casa",
  lede: "La barra, los platos y la masa del día.",
};

export const gallery = [
  { src: img.hero, alt: "Tagliatelle recién servidos", size: "hero" },
  { src: img.midday, alt: "La pasta del mediodía junto a la ventana", size: "square" },
  {
    src: `${U}1467003909585-2f8a72700288?w=1400&ar=3:4${q}`,
    alt: "La sala a media luz",
    size: "tall",
  },
  {
    src: `${U}1536935338788-846bb9981813?w=1200&ar=1:1${q}`,
    alt: "Desde la barra",
    size: "square",
  },
  {
    src: `${U}1509440159596-0249088772ff?w=1800&ar=21:9${q}`,
    alt: "Antipasti para compartir",
    size: "wide",
  },
  {
    src: `${U}1571877227200-a0d98ea607e9?w=1200&ar=1:1${q}`,
    alt: "Tiramisú de la casa",
    size: "square",
  },
  {
    src: `${U}1615141982883-c7ad0e69fd62?w=1200&ar=1:1${q}`,
    alt: "Lo que salió del horno hoy",
    size: "square",
  },
] as const;

export const reservation = {
  title: "Reservá una mesa",
  lede: "Decinos cuándo y para cuántos. Guardamos el salón y la sala del fondo por separado, así que elegí dónde querés sentarte.",
  note: "Maqueta de diseño — el formulario no envía nada. Para una reserva real, llamá al número de abajo.",
  times: ["12:00", "13:00", "14:30", "20:00", "20:30", "21:15", "22:00"],
  guests: [
    "1 persona",
    "2 personas",
    "3 personas",
    "4 personas",
    "5 personas",
    "6 personas",
    "7+ — llamanos",
  ],
  seatings: ["Salón", "Sala del fondo", "Barra"],
};

export const contact = {
  phoneLabel: "+598 2709 4412",
  phoneHref: "tel:+59827094412",
  whatsappLabel: "+598 91 234 567",
  whatsappHref: "https://wa.me/59891234567",
  emailLabel: "hola@pastamia.uy",
  emailHref: "mailto:hola@pastamia.uy",
};

export const locations = [
  {
    id: "pocitos",
    name: "La casa",
    address: "Juan Benito Blanco 1234, Pocitos, Montevideo",
    phoneLabel: "+598 2709 4412",
    phoneHref: "tel:+59827094412",
    hours: "Martes a domingo · 12:00 – 00:00 · Lunes cerrado para amasar de nuevo",
  },
];

export const footerLinks = [
  {
    heading: "Visitá",
    items: [
      { label: "La Carta", href: "/menu" },
      { label: "Pastas y salsas", href: "/#despensa" },
      { label: "Galería", href: "/#galeria" },
      { label: "Opiniones", href: "/#opiniones" },
    ],
  },
];

export const legalLinks = [
  { label: "Panel", href: "/admin" },
  { label: "Política de cookies", href: "/cookies" },
  { label: "Privacidad", href: "/privacidad" },
];
