import {
  BatteryWarning,
  Database,
  Gauge,
  MonitorOff,
  Smartphone,
  Thermometer,
} from "lucide-react";
import { commonIssues } from "@/data/issues";
import { Reveal } from "@/components/Reveal";

const iconMap = {
  przegrzewanie: Thermometer,
  ladowanie: BatteryWarning,
  ekran: Smartphone,
  "brak-obrazu": MonitorOff,
  windows: Gauge,
  dane: Database,
} as const;

export function CommonIssues() {
  return (
    <section id="usterki" className="section" aria-labelledby="issues-heading">
      <div className="container">
        <Reveal>
          <h2 id="issues-heading" className="section-title">
            Najczęstsze usterki
          </h2>
          <p className="section-lead">
            Jeśli rozpoznajesz objaw — skontaktuj się. Po sprawdzeniu sprzętu
            powiemy, co da się zrobić.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {commonIssues.map((issue, index) => {
            const Icon = iconMap[issue.id as keyof typeof iconMap];
            return (
              <Reveal key={issue.id} delayMs={index * 50}>
                <article className="card h-full p-6">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {issue.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {issue.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
