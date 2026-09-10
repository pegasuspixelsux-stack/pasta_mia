import Image from "next/image";
import { craft } from "../lib/content";
import { Reveal } from "./Reveal";

export function Craft() {
  return (
    <section
      id="despensa"
      className="scroll-mt-24 border-t border-line bg-mist py-[var(--spacing-section)]"
    >
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[46ch] text-center">
          <p className="label-track">{craft.kicker}</p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.02em] text-ink">
            {craft.title}
          </h2>
          <p className="mt-5 text-[1rem] leading-relaxed text-muted">
            {craft.lede}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-2 md:gap-8">
          {craft.columns.map((col, i) => (
            <Reveal
              key={col.title}
              delay={i * 0.08}
              className="group overflow-hidden rounded-[16px] border border-line bg-white shadow-[0_1px_2px_rgba(44,34,30,0.04)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_22px_44px_-26px_rgba(44,34,30,0.28)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-shell">
                <Image
                  src={col.image}
                  alt={col.alt}
                  fill
                  sizes="(min-width: 768px) 40rem, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-7 sm:p-8">
                <h3 className="font-display text-[1.5rem] font-medium tracking-[-0.01em] text-ink">
                  {col.title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-faint">
                  {col.note}
                </p>
                <ul className="mt-6 space-y-3">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.95rem] leading-snug text-ink-soft/90"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
