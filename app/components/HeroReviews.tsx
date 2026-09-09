"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { reviews } from "../lib/content";

/* Illustrative sample reviews (see app/lib/content.ts) shown as a rotating
   "Reseña Google"-style block over the hero photo. Not real Google reviews. */
const CARDS = reviews.slice(0, 3);
const ROTATE_MS = 5000;

export function HeroReviews() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(
      () => setI((n) => (n + 1) % CARDS.length),
      ROTATE_MS,
    );
    return () => clearInterval(t);
  }, [reduce]);

  const rev = CARDS[i];

  return (
    <div className="w-full space-y-5 lg:max-w-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-[0.95rem] font-bold text-canvas shadow-md">
            G
          </span>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted">
            Reseña Google
          </span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-ink/20 bg-ink/10 px-4 py-1.5 backdrop-blur-sm">
          <span aria-hidden className="text-[0.8rem] text-gold-soft">
            ★
          </span>
          <span className="text-[0.8rem] font-bold tabular-nums text-ink">
            {rev.rating.toFixed(1).replace(".", ",")}
          </span>
        </span>
      </div>

      <p
        key={i}
        className="min-h-[6rem] text-[1.05rem] italic leading-relaxed text-ink motion-safe:animate-[line-rise_0.5s_cubic-bezier(0.16,1,0.3,1)_both] sm:text-[1.15rem]"
      >
        «{rev.quote}»
      </p>

      <div className="flex items-center justify-between border-t border-ink/15 pt-4">
        <span className="text-[0.82rem] font-medium text-gold">
          {rev.author}
        </span>
        <div className="flex gap-2">
          {CARDS.map((card, idx) => (
            <button
              key={card.author}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Ver reseña ${idx + 1}`}
              className={[
                "h-2 rounded-full transition-all duration-300",
                idx === i ? "w-8 bg-gold" : "w-2 bg-ink/30",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
