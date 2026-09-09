import type { Metadata } from "next";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { MenuBrowser } from "../components/MenuBrowser";

export const metadata: Metadata = {
  title: "La Carta — Pasta Mia, Montevideo",
  description:
    "La carta de Pasta Mia — pasta fresca hecha a mano, antipasti, clásicos al horno, dolci y la barra. Filtrá por Almuerzo, Cena o Bar.",
};

export default function MenuPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-canvas">
        <section className="mx-auto max-w-[72rem] px-5 pb-[var(--spacing-section)] pt-32 sm:px-8 sm:pt-40">
          <p className="label-track">Pocitos — Montevideo</p>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,6vw,4rem)] font-medium leading-[1.04] tracking-[-0.022em] text-ink">
            La Carta
          </h1>
          <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed text-muted">
            Elegí el servicio y mirá lo que hay. La carta cambia con la
            temporada y con la pasta que se amasó esa mañana.
          </p>

          <div className="mt-12 sm:mt-16">
            <MenuBrowser />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
