import { phoneBrandsNote, phoneServiceGroups } from "@/data/services";
import { Reveal } from "@/components/Reveal";

export function PhoneService() {
  return (
    <section
      id="serwis-telefonow"
      className="section !pt-2"
      aria-labelledby="phone-heading"
    >
      <div className="container">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-accent">
            Smartfony
          </p>
          <h2 id="phone-heading" className="section-title">
            Serwis telefonów
          </h2>
          <p className="section-lead">{phoneBrandsNote}</p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {phoneServiceGroups.map((group, index) => (
            <Reveal key={group.title} delayMs={index * 60}>
              <article className="card h-full p-6 md:p-7">
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
