"use client";

import { Phone } from "lucide-react";
import { useSiteContact } from "@/components/ContactProvider";

type CallButtonProps = {
  className?: string;
  variant?: "primary" | "secondary" | "large";
  showIcon?: boolean;
  label?: string;
};

export function CallButton({
  className = "",
  variant = "primary",
  showIcon = true,
  label = "Zadzwoń",
}: CallButtonProps) {
  const contact = useSiteContact();
  const phoneReady = contact.hasPhone && contact.telHref;
  const variantClass = variant === "secondary" ? "btn-secondary" : "btn-primary";
  const sizeClass = variant === "large" ? "min-h-14 px-8 text-lg" : "";

  return (
    <a
      href={phoneReady ? contact.telHref! : "#kontakt"}
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
      aria-label={
        phoneReady
          ? `${label}: ${contact.phoneLabel}`
          : `${label} — przejdź do kontaktu (uzupełnij numer w konfiguracji)`
      }
    >
      {showIcon ? <Phone className="size-4 shrink-0" aria-hidden /> : null}
      {label}
    </a>
  );
}
