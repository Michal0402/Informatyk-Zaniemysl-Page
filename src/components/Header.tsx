"use client";

import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { CallButton } from "@/components/CallButton";
import { useSiteContact } from "@/components/ContactProvider";

export function Header() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const contact = useSiteContact();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="container flex h-[var(--header-h)] items-center justify-between gap-4">
        <a
          href="#top"
          className="font-display text-sm font-bold tracking-[0.12em] text-fg sm:text-base"
        >
          {contact.brand}
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Główne">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <CallButton />
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            className="btn btn-secondary !min-h-11 !px-3"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id={panelId}
          className="border-t border-border bg-bg-elevated lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu nawigacji"
        >
          <nav className="container flex flex-col gap-1 py-4" aria-label="Mobilne">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-base text-fg transition-colors hover:bg-accent-soft"
                onClick={close}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 px-1 pb-2">
              <CallButton className="w-full" />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
