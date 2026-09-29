"use client";

import { ListOrdered, Phone, Wrench } from "lucide-react";
import { useSiteContact } from "@/components/ContactProvider";

const items = [
  {
    id: "call",
    label: "Zadzwoń",
    href: "#kontakt",
    icon: Phone,
    preferTel: true,
  },
  {
    id: "services",
    label: "Usługi",
    href: "#uslugi",
    icon: Wrench,
    preferTel: false,
  },
  {
    id: "pricing",
    label: "Cennik",
    href: "#cennik",
    icon: ListOrdered,
    preferTel: false,
  },
] as const;

export function MobileContactBar() {
  const contact = useSiteContact();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-bg/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "var(--safe-bottom)" }}
      aria-label="Szybki kontakt"
    >
      <ul className="grid h-[var(--mobile-bar-h)] grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          // Przy dwóch numerach prowadzimy do sekcji kontaktu
          const useTel =
            item.preferTel &&
            contact.hasPhone &&
            !contact.hasBothPhones &&
            contact.telHref;
          const href = useTel ? contact.telHref! : item.href;

          return (
            <li key={item.id} className="contents">
              <a
                href={href}
                className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted transition-colors hover:text-accent focus-visible:outline-offset-[-3px]"
                aria-label={item.label}
              >
                <Icon className="size-5 text-accent" aria-hidden />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
