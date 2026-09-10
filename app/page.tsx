import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { Craft } from "./components/Craft";
import { Cellar } from "./components/Cellar";
import { Atmosphere } from "./components/Atmosphere";
import { Reviews } from "./components/Reviews";
import { Gallery } from "./components/Gallery";
import { Reservation } from "./components/Reservation";
import { SiteFooter } from "./components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader onDark />
      <main>
        <Hero />
        <Intro />
        <Craft />
        <Cellar />
        <Atmosphere />
        <Reviews />
        <Gallery />
        <Reservation />
      </main>
      <SiteFooter />
    </>
  );
}
