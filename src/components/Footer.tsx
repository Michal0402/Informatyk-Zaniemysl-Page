"use client";

import { navLinks } from "@/data/navigation";
import { useSiteContact } from "@/components/ContactProvider";

export function Footer() {
  const year = new Date().getFullYear();
  const contact = useSiteContact();

  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-sm font-bold tracking-[0.12em]">
            {contact.brand}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {contact.description}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-fg">Sekcje</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#serwis-komputerowy"
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                Serwis komputerowy
              </a>
            </li>
            <li>
              <a
                href="#serwis-telefonow"
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                Serwis telefonów
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-fg">Dane firmy</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>{contact.name}</li>
            <li>{contact.area}</li>
            {contact.phonePc ? (
              <li>
                <span className="block text-xs text-muted/80">Komputery</span>
                <a
                  href={contact.phonePc.href}
                  className="transition-colors hover:text-accent"
                >
                  {contact.phonePc.display}
                </a>
              </li>
            ) : null}
            {contact.phoneGsm ? (
              <li>
                <span className="block text-xs text-muted/80">GSM</span>
                <a
                  href={contact.phoneGsm.href}
                  className="transition-colors hover:text-accent"
                >
                  {contact.phoneGsm.display}
                </a>
              </li>
            ) : null}
            {!contact.hasPhone ? (
              <li className="text-muted/70">Telefon: do uzupełnienia</li>
            ) : null}
            {contact.hasEmail && contact.mailtoHref ? (
              <li>
                <a
                  href={contact.mailtoHref}
                  className="transition-colors hover:text-accent"
                >
                  {contact.email}
                </a>
              </li>
            ) : (
              <li className="text-muted/70">E-mail: do uzupełnienia</li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {contact.name}
          </p>
          <p>Serwis komputerów i telefonów · Zaniemyśl</p>
        </div>
      </div>
    </footer>
  );
}
