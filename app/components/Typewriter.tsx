"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Types `text` out, holds, deletes, and loops — with a blinking caret. Space for
 * the full string is always reserved (via an invisible copy) so a centered
 * heading never jitters. Renders the full text on the server and the first
 * paint, so there is no empty flash; the loop starts only after mount. Under
 * prefers-reduced-motion the text just stays put.
 */
export function Typewriter({
  text,
  className,
  typeSpeed = 260,
  deleteSpeed = 140,
  holdFull = 3800,
  holdEmpty = 900,
}: {
  text: string;
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  holdFull?: number;
  holdEmpty?: number;
}) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(text.length);

  useEffect(() => {
    if (reduce) return;
    let timer: ReturnType<typeof setTimeout>;
    let i = text.length;
    let deleting = true;

    const step = () => {
      if (deleting) {
        i -= 1;
        setCount(i);
        if (i <= 0) {
          deleting = false;
          timer = setTimeout(step, holdEmpty);
        } else {
          timer = setTimeout(step, deleteSpeed);
        }
      } else {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          deleting = true;
          timer = setTimeout(step, holdFull);
        } else {
          timer = setTimeout(step, typeSpeed);
        }
      }
    };

    timer = setTimeout(step, holdFull);
    return () => clearTimeout(timer);
  }, [text, reduce, typeSpeed, deleteSpeed, holdFull, holdEmpty]);

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <span className="invisible" aria-hidden>
        {text}
      </span>
      <span
        className="absolute inset-0 whitespace-nowrap text-left"
        aria-label={text}
      >
        <span aria-hidden>{text.slice(0, count)}</span>
        <span
          aria-hidden
          className="ml-[0.02em] inline-block h-[0.82em] w-[0.055em] -translate-y-[0.05em] bg-current align-middle animate-[caret-blink_1s_step-end_infinite]"
        />
      </span>
    </span>
  );
}
