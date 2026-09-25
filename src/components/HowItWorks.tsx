import { processSteps } from "@/data/process";
import { Reveal } from "@/components/Reveal";

export function HowItWorks() {
  return (
    <section
      id="jak-to-dziala"
      className="section"
      aria-labelledby="process-heading"
    >
      <div className="container">
        <Reveal>
          <h2 id="process-heading" className="section-title">
            Jak to działa?
          </h2>
          <p className="section-lead">
            Prosty przebieg od pierwszego kontaktu do oddania sprzętu — bez
            niespodzianek przy wycenie.
          </p>
        </Reveal>

        <ol className="mt-10 grid gap-4 md:grid-cols-4 md:gap-5">
          {processSteps.map((step, index) => (
            <Reveal key={step.step} delayMs={index * 70}>
              <li className="card relative h-full p-6 md:p-7">
                <span
                  className="font-display text-4xl font-bold text-accent/30"
                  aria-hidden
                >
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
                {index < processSteps.length - 1 ? (
                  <span
                    className="absolute -right-3 top-1/2 hidden h-px w-3 bg-border-strong md:block"
                    aria-hidden
                  />
                ) : null}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
