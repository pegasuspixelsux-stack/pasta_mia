"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav } from "../lib/content";

/**
 * `onDark` — when the header is transparent (top of page, not scrolled), it
 * sits over a dark surface (the home hero photo + scrim), so its text goes
 * light. Pages without a dark hero pass `onDark={false}` (the default) and keep
 * dark text in the transparent state.
 */
export function SiteHeader({ onDark = false }: { onDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;
  // Light text only while transparent over a dark hero; dark text otherwise.
  const light = !solid && onDark;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={[
          "transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500",
          solid
            ? "border-b border-line/70 bg-canvas/80 backdrop-blur-md shadow-[0_1px_20px_-12px_rgba(15,23,42,0.25)]"
            : "border-b border-transparent bg-transparent backdrop-blur-0",
        ].join(" ")}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[84rem] items-center justify-between px-5 sm:px-8 lg:h-20">
          <Link
            href="/#top"
            className={[
              "font-display text-[1.35rem] leading-none tracking-[-0.01em] transition-colors duration-500 lg:text-[1.5rem]",
              light ? "text-white" : "text-ink",
            ].join(" ")}
          >
            Pasta Mia<span className={light ? "text-gold-soft" : "text-gold"}>.</span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "group relative py-1 text-[0.82rem] font-medium tracking-wide transition-colors duration-300",
                  light
                    ? "text-white/80 hover:text-white"
                    : "text-ink-soft/80 hover:text-ink",
                ].join(" ")}
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#reserve"
              className={[
                "hidden rounded-full border px-5 py-2.5 text-[0.8rem] font-semibold tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:inline-block",
                light
                  ? "border-white/35 text-white hover:border-white hover:bg-white hover:text-ink"
                  : "border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-canvas",
              ].join(" ")}
            >
              Reservá una mesa
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center md:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={[
                    "absolute left-0 block h-px w-full transition-all duration-300",
                    light ? "bg-white" : "bg-ink",
                    open ? "top-1.5 rotate-45" : "top-0",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-1.5 block h-px w-full transition-all duration-300",
                    light ? "bg-white" : "bg-ink",
                    open ? "-rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 block h-px w-full transition-all duration-300",
                    light ? "bg-white" : "bg-ink",
                    open ? "top-1.5 opacity-0" : "top-3",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-line bg-canvas/95 backdrop-blur-md md:hidden"
          >
            <nav className="mx-auto flex max-w-[84rem] flex-col px-5 py-4 sm:px-8">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 font-display text-xl text-ink last:border-0"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#reserve"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold tracking-wide text-canvas"
              >
                Reservá una mesa
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
