import Image from "next/image";
import { cellar } from "../lib/content";
import { Reveal } from "./Reveal";

export function Cellar() {
  return (
    <section
      id="barra"
      className="scroll-mt-24 border-t border-line bg-ink py-[var(--spacing-section)] text-white"
    >
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[46ch] text-center">
          <p className="label-track text-gold-soft">{cellar.kicker}</p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.02em] text-white">
            {cellar.title}
          </h2>
          <p className="mt-5 text-[1rem] leading-relaxed text-white/70">
            {cellar.lede}
          </p>
        </Reveal>

        <div className="mt-14 space-y-5 sm:mt-16">
          {cellar.groups.map((group, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={group.title}
                className="grid gap-5 md:grid-cols-2 md:items-stretch"
              >
                <Reveal
                  delay={0.04}
                  className={[
                    "flex flex-col rounded-[16px] border border-gold/25 bg-[#1a1210] p-7 transition-colors duration-500 hover:border-gold/45 sm:p-8",
                    flip ? "md:order-2" : "",
                  ].join(" ")}
                >
                  <span className="inline-block w-fit rounded bg-gold-soft/10 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-soft">
                    {group.tag}
                  </span>
                  <h3 className="mt-3 font-display text-[1.5rem] font-medium tracking-[-0.01em] text-white">
                    {group.title}
                  </h3>
                  <ul className="mt-5 space-y-4 text-[0.9rem]">
                    {group.items.map((item, j) => (
                      <li
                        key={item.name}
                        className={[
                          "flex items-start justify-between gap-4 pb-4",
                          j === group.items.length - 1
                            ? ""
                            : "border-b border-white/10",
                        ].join(" ")}
                      >
                        <span className="min-w-0">
                          <span className="block font-medium text-white">
                            {item.name}
                          </span>
                          <span className="mt-0.5 block text-[0.78rem] text-white/50">
                            {item.note}
                          </span>
                        </span>
                        <span className="shrink-0 rounded bg-white/5 px-2.5 py-1 text-[0.72rem] font-semibold text-gold-soft">
                          {item.serve}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal
                  as="figure"
                  delay={0.1}
                  className={[
                    "group relative min-h-[16rem] overflow-hidden rounded-[16px] ring-1 ring-white/10 md:min-h-0",
                    flip ? "md:order-1" : "",
                  ].join(" ")}
                >
                  <Image
                    src={group.image}
                    alt={group.alt}
                    fill
                    sizes="(min-width: 768px) 40rem, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1210]/60 to-transparent" />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
