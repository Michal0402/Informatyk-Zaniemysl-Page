"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/contentTypes";

function FaqItemRow({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-border last:border-b-0">
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          className="flex w-full items-center justify-between gap-4 px-1 py-5 text-left text-base font-semibold tracking-tight text-fg transition-colors hover:text-accent focus-visible:outline-offset-[-2px]"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{question}</span>
          <ChevronDown
            className={`size-5 shrink-0 text-accent transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="px-1 pb-5"
      >
        <p className="max-w-3xl text-sm leading-relaxed text-muted md:text-base">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQ({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className="section" aria-labelledby="faq-heading">
      <div className="container">
        <h2 id="faq-heading" className="section-title">
          FAQ
        </h2>
        <p className="section-lead">
          Krótkie odpowiedzi na najczęstsze pytania przed oddaniem sprzętu.
        </p>

        <div className="mt-8 rounded-[1.5rem] border border-border bg-bg-card px-5 md:px-8">
          {items.map((item, index) => (
            <FaqItemRow
              key={item.id}
              question={item.question}
              answer={item.answer}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
