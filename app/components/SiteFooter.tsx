import Link from "next/link";
import { contact, footerLinks, legalLinks, locations } from "../lib/content";
import { WhatsApp } from "./icons";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const loc = locations[0];

  return (
    <footer className="border-t border-line bg-mist">
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.1fr_1.2fr]">
          <div className="max-w-[34ch]">
            <p className="font-display text-2xl tracking-[-0.01em] text-ink">
              Pasta Mia<span className="text-gold">.</span>
            </p>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-muted">
              Trattoria de pasta fresca hecha a mano en Pocitos, Montevideo. Masa
              del día, salsas a fuego lento y vinos italianos.
            </p>
          </div>

          {footerLinks.map((col) => (
            <nav key={col.heading}>
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
                {col.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[0.92rem] text-muted transition-colors duration-300 hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
              Dónde estamos
            </h3>
            <address className="mt-5 text-[0.9rem] not-italic leading-relaxed text-muted">
              {loc.address}
            </address>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-faint">
              {loc.hours}
            </p>
          </div>

          <div>
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
              Reservas
            </h3>
            <p className="mt-5 text-[0.92rem] leading-relaxed text-muted">
              Llamá o escribinos y coordinamos la mesa para el día que quieras.
            </p>
            <div className="mt-4 space-y-1 text-[0.92rem]">
              <a
                href={contact.phoneHref}
                className="block font-medium text-ink transition-colors duration-300 hover:text-ocean"
              >
                {contact.phoneLabel}
              </a>
              <a
                href={contact.whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label={`WhatsApp ${contact.whatsappLabel}`}
                className="flex items-center gap-2 text-muted transition-colors duration-300 hover:text-ocean"
              >
                <WhatsApp className="h-4 w-4 shrink-0" />
                {contact.whatsappLabel}
              </a>
              <a
                href={contact.emailHref}
                className="block text-muted transition-colors duration-300 hover:text-ocean"
              >
                {contact.emailLabel}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-[0.8rem] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Pasta Mia. Una maqueta de diseño — no es un negocio real.
            Fotografía vía{" "}
            <a
              href="https://unsplash.com/license"
              className="underline decoration-line underline-offset-4 transition-colors hover:text-ink"
            >
              Unsplash
            </a>
            .
          </p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted transition-colors duration-300 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
