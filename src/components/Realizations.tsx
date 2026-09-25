import { Image as ImageIcon } from "lucide-react";
import { realizations, realizationsIntro } from "@/data/realizations";
import { resolvePublicImage } from "@/lib/publicAsset";
import { ImageSlot } from "@/components/ImageSlot";
import { Reveal } from "@/components/Reveal";

export function Realizations() {
  const items = realizations();
  const intro = realizationsIntro();
  const hasItems = items.length > 0;

  return (
    <section
      id="realizacje"
      className="section"
      aria-labelledby="realizations-heading"
    >
      <div className="container">
        <Reveal>
          <h2 id="realizations-heading" className="section-title">
            Realizacje
          </h2>
          <p className="section-lead">{intro}</p>
        </Reveal>

        {hasItems ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <Reveal key={item.id} delayMs={index * 60}>
                <article className="card overflow-hidden">
                  <ImageSlot
                    src={resolvePublicImage(item.image)}
                    alt={item.alt ?? item.title}
                    label="Zdjęcie realizacji"
                    aspect="aspect-[4/3]"
                  />
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delayMs={80}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="card flex min-h-[200px] flex-col items-center justify-center gap-3 p-6 text-center"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <ImageIcon className="size-6" aria-hidden />
                  </div>
                  <p className="text-sm font-medium text-fg">Slot na zdjęcie {n}</p>
                  <p className="text-xs leading-relaxed text-muted">
                    Dodaj wpis w{" "}
                    <code className="text-accent/90">content/realizations.json</code>{" "}
                    oraz plik w{" "}
                    <code className="text-accent/90">
                      public/images/realizations/
                    </code>
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
