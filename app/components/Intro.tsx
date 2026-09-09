import { intro } from "../lib/content";
import { Reveal } from "./Reveal";

export function Intro() {
  return (
    <section
      id="nosotros"
      className="scroll-mt-24 bg-canvas py-[var(--spacing-section-tight)]"
    >
      <div className="mx-auto grid max-w-[84rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="label-track">{intro.kicker}</p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.12] tracking-[-0.02em] text-pretty text-ink">
            {intro.title}
          </h2>
        </Reveal>

        <Reveal
          delay={0.08}
          className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:col-span-7 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0"
        >
          {intro.columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-[1.35rem] font-medium tracking-[-0.01em] text-ink">
                {col.title}
              </h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
                {col.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
