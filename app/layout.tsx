import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--ff-display",
  display: "swap",
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--ff-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pastamia.uy"),
  title: "Pasta Mia | Trattoria de Pasta Fresca y Vino",
  description:
    "Pasta fresca hecha a mano, recetas de familia y vinos italianos en una trattoria de barrio en Pocitos, Montevideo. Amasamos todos los días, cocina hasta tarde.",
  openGraph: {
    title: "Pasta Mia — Montevideo",
    description:
      "Pasta fresca hecha a mano, salsas a fuego lento y vino. Reservá tu mesa.",
    type: "website",
    locale: "es_UY",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${montserrat.variable} antialiased`}
    >
      <body className="min-h-dvh bg-canvas font-sans text-ink">{children}</body>
    </html>
  );
}
