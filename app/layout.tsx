import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--ff-display",
  display: "swap",
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--ff-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://puertopuntadeleste.com"),
  title: "Puerto | Cocina de Mar y Vistas al Muelle",
  description:
    "Gastronomía costera, pescados frescos y frutos de mar en el Puerto de Punta del Este. Terraza náutica frente a los yates, cocina hasta tarde.",
  openGraph: {
    title: "Puerto — Punta del Este",
    description:
      "Cocina de mar y vistas al muelle. Reservá tu mesa frente al puerto.",
    type: "website",
    locale: "es_UY",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-dvh bg-canvas font-sans text-ink">{children}</body>
    </html>
  );
}
