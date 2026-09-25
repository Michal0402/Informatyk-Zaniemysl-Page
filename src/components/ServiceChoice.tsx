import { ArrowRight, Laptop, Smartphone } from "lucide-react";
import { serviceChoice } from "@/data/services";
import { Reveal } from "@/components/Reveal";

const icons = {
  komputery: Laptop,
  telefony: Smartphone,
} as const;

export function ServiceChoice() {
  return (
    <section
      id="uslugi"
      className="section !pt-2"
      aria-labelledby="wybor-heading"
    >
      <div className="container">
        <Reveal>
          <h2 id="wybor-heading" className="section-title">
            Wybór serwisu
          </h2>
          <p className="section-lead">
            Wybierz obszar, którego dotyczy problem — przejdziesz do szczegółów
            usług.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-6">
          {serviceChoice.map((card, index) => {
            const Icon = icons[card.id as keyof typeof icons];
            return (
              <Reveal key={card.id} delayMs={index * 80}>
                <a
                  href={card.href}
                  className="card card-interactive group flex h-full flex-col p-7 md:p-9"
                >
                  <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <Icon className="size-6" aria-hidden />
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight md:text-[1.75rem]">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-muted leading-relaxed">
                    {card.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {card.highlights.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors group-hover:text-accent-hover">
                    Zobacz szczegóły
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
