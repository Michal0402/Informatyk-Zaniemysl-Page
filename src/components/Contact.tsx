"use client";

import { MapPin, Mail, Clock } from "lucide-react";
import { CallButton } from "@/components/CallButton";
import { Reveal } from "@/components/Reveal";
import { useSiteContact } from "@/components/ContactProvider";

export function Contact() {
  const contact = useSiteContact();

  return (
    <section id="kontakt" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <Reveal>
          <div className="card overflow-hidden p-8 md:p-12">
            <div className="max-w-2xl">
              <h2
                id="contact-heading"
                className="font-display text-[clamp(1.85rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-tight"
              >
                Masz problem ze sprzętem?
              </h2>
              <p className="mt-4 text-muted leading-relaxed md:text-lg">
                Napisz lub zadzwoń — ustalimy diagnostykę i kolejne kroki.
              </p>

              <div className="mt-8">
                <CallButton
                  variant="large"
                  label={
                    contact.hasPhone
                      ? `Zadzwoń: ${contact.phoneLabel}`
                      : "Zadzwoń"
                  }
                />
              </div>

              <ul className="mt-8 space-y-4 text-sm md:text-base">
                <li className="flex items-start gap-3 text-muted">
                  <MapPin
                    className="mt-0.5 size-5 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span>
                    <span className="block font-medium text-fg">Lokalizacja</span>
                    {contact.hasAddress ? contact.address : contact.area}
                    {contact.hasAddress ? (
                      <span className="mt-1 block text-muted">{contact.area}</span>
                    ) : null}
                  </span>
                </li>
                {contact.hasEmail && contact.mailtoHref ? (
                  <li className="flex items-start gap-3 text-muted">
                    <Mail
                      className="mt-0.5 size-5 shrink-0 text-accent"
                      aria-hidden
                    />
                    <span>
                      <span className="block font-medium text-fg">E-mail</span>
                      <a
                        href={contact.mailtoHref}
                        className="text-accent transition-colors hover:text-accent-hover"
                      >
                        {contact.email}
                      </a>
                    </span>
                  </li>
                ) : null}
                {contact.hasHours ? (
                  <li className="flex items-start gap-3 text-muted">
                    <Clock
                      className="mt-0.5 size-5 shrink-0 text-accent"
                      aria-hidden
                    />
                    <span>
                      <span className="block font-medium text-fg">
                        Godziny kontaktu
                      </span>
                      {contact.hours}
                    </span>
                  </li>
                ) : null}
              </ul>

              {!contact.hasPhone || !contact.hasEmail ? (
                <p className="mt-8 rounded-xl border border-border bg-bg-elevated px-4 py-3 text-xs text-muted">
                  Przed publikacją uzupełnij dane w{" "}
                  <code className="text-accent/90">content/company.json</code>
                  {" ("}
                  {[
                    !contact.hasPhone ? "telefon" : null,
                    !contact.hasEmail ? "e-mail" : null,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                  ).
                </p>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
