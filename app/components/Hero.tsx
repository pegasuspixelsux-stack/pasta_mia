import Image from "next/image";
import { hero, img, reviews } from "../lib/content";
import { Sprig } from "./icons";
import { Typewriter } from "./Typewriter";

const TICKER = [...reviews, ...reviews];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col overflow-hidden bg-mist"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 motion-safe:animate-[hero-settle_2s_cubic-bezier(0.16,1,0.3,1)_both]">
          <Image
            src={img.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 scrim-hero" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[62rem] flex-1 flex-col items-center justify-center px-5 pb-24 pt-32 text-center sm:px-8">
        <p
          className="label-track text-[#e3caa6] motion-safe:animate-[line-rise_0.8s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ animationDelay: "0.15s" }}
        >
          {hero.place}
        </p>

        <h1 className="mt-6 font-display text-[clamp(3rem,10vw,6.5rem)] font-medium leading-[1.02] tracking-[-0.022em] text-white [text-shadow:0_1px_28px_rgba(20,14,12,0.4)]">
          <Typewriter text={hero.title} />
        </h1>

        <p
          className="mt-7 max-w-[46ch] text-pretty text-[1.05rem] leading-relaxed text-white/85 motion-safe:animate-[line-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_both] sm:text-[1.15rem]"
          style={{ animationDelay: "0.5s" }}
        >
          {hero.subtitle}
        </p>

        <div
          className="mt-10 motion-safe:animate-[line-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ animationDelay: "0.66s" }}
        >
          <a
            href="/menu"
            className="group inline-flex items-center gap-3 border-b border-white/30 pb-1.5 text-[0.95rem] font-medium tracking-wide text-white transition-colors duration-300 hover:border-gold-soft"
          >
            <Sprig className="h-[1.15rem] w-[1.15rem] text-gold-soft transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6" />
            {hero.cta}
          </a>
        </div>
      </div>

      {/* Review ticker — transparent boxes scrolling along the bottom of the hero */}
      <div className="relative overflow-hidden py-5">
        <div className="flex w-max gap-10 px-6 motion-safe:animate-[ticker_60s_linear_infinite]">
          {TICKER.map((r, i) => (
            <figure key={i} className="flex w-[19rem] shrink-0 flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/55">
                  Reseña Google
                </span>
                <span className="font-semibold text-gold-soft">
                  ★ {r.rating.toFixed(1).replace(".", ",")}
                </span>
              </div>
              <blockquote className="line-clamp-2 text-[0.82rem] italic leading-snug text-white/85">
                «{r.quote}»
              </blockquote>
              <figcaption className="text-[0.72rem] font-medium text-gold-soft/80">
                {r.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
