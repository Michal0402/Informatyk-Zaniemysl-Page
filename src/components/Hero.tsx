import { resolvePublicImage } from "@/lib/publicAsset";
import { CallButton } from "@/components/CallButton";
import { ImageSlot } from "@/components/ImageSlot";
import { Reveal } from "@/components/Reveal";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const heroImage = resolvePublicImage("/images/hero.jpg");

  return (
    <section
      id="top"
      className="section !pt-10 md:!pt-16"
      aria-labelledby="hero-heading"
    >
      <div className="container grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <Reveal className="min-w-0">
          <h1
            id="hero-heading"
            className="mb-4 max-w-full text-sm font-medium uppercase tracking-[0.12em] text-accent sm:tracking-[0.18em]"
          >
            Serwis komputerów i telefonów w Zaniemyślu
          </h1>
          <p className="font-display text-[clamp(1.85rem,6.5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.035em] text-fg text-balance">
            Komputer lub telefon przestał działać?
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Naprawiamy komputery, laptopy i smartfony. Sprawdzimy usterkę,
            przedstawimy koszt i ustalimy dalsze kroki.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton />
            <a href="#uslugi" className="btn btn-secondary">
              Zobacz usługi
              <ArrowDown className="size-4 shrink-0" aria-hidden />
            </a>
          </div>
          <p className="mt-6 text-sm text-muted">
            Zaniemyśl i okolice · Komputery · Laptopy · Telefony
          </p>
        </Reveal>

        <Reveal delayMs={120} className="min-w-0">
          <div className="overflow-hidden rounded-[1.5rem] border border-border shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <ImageSlot
              src={heroImage}
              alt="Komputer stacjonarny i telefon w uchwycie serwisowym"
              label="Zdjęcie hero — laptop i telefon"
              aspect="aspect-[5/4] sm:aspect-[4/3] lg:aspect-[5/4]"
              className="min-h-[240px] sm:min-h-[280px] object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
