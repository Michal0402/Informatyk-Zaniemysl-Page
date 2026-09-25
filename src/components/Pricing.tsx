import { pricingIntro, pricingItems } from "@/data/pricing";
import { Reveal } from "@/components/Reveal";

export function Pricing() {
  const intro = pricingIntro();
  const items = pricingItems();

  return (
    <section id="cennik" className="section" aria-labelledby="pricing-heading">
      <div className="container">
        <Reveal>
          <h2 id="pricing-heading" className="section-title">
            Orientacyjny cennik
          </h2>
          <p className="section-lead">{intro}</p>
        </Reveal>

        <Reveal delayMs={80}>
          <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-border">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Orientacyjny cennik usług serwisowych
              </caption>
              <thead className="bg-bg-elevated text-muted">
                <tr>
                  <th scope="col" className="px-5 py-4 font-medium md:px-7">
                    Usługa
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-right font-medium md:px-7"
                  >
                    Cena
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-border bg-bg-card/60"
                  >
                    <td className="px-4 py-4 align-top sm:px-5 md:px-7">
                      <span className="font-medium text-fg">{item.name}</span>
                      {item.note ? (
                        <span className="mt-1 block text-xs text-muted">
                          {item.note}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-4 text-right align-top text-accent sm:px-5 md:px-7 sm:whitespace-nowrap">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
