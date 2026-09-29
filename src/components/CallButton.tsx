"use client";

import { Phone } from "lucide-react";
import { useSiteContact } from "@/components/ContactProvider";

type CallButtonProps = {
  className?: string;
  variant?: "primary" | "secondary" | "large";
  showIcon?: boolean;
  label?: string;
  /** pc | gsm | auto — auto: jeden numer = tel:, dwa = #kontakt */
  line?: "pc" | "gsm" | "auto";
};

export function CallButton({
  className = "",
  variant = "primary",
  showIcon = true,
  label = "Zadzwoń",
  line = "auto",
}: CallButtonProps) {
  const contact = useSiteContact();
  const variantClass = variant === "secondary" ? "btn-secondary" : "btn-primary";
  const sizeClass = variant === "large" ? "min-h-14 px-8 text-lg" : "";

  let href = "#kontakt";
  let aria = `${label} — przejdź do kontaktu`;

  if (line === "pc" && contact.phonePc) {
    href = contact.phonePc.href;
    aria = `${label}: ${contact.phonePc.display}`;
  } else if (line === "gsm" && contact.phoneGsm) {
    href = contact.phoneGsm.href;
    aria = `${label}: ${contact.phoneGsm.display}`;
  } else if (line === "auto") {
    if (contact.hasBothPhones) {
      href = "#kontakt";
      aria = `${label} — wybierz numer w sekcji kontaktu`;
    } else if (contact.telHref) {
      href = contact.telHref;
      aria = `${label}: ${contact.phoneLabel}`;
    }
  }

  return (
    <a
      href={href}
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
      aria-label={aria}
    >
      {showIcon ? <Phone className="size-4 shrink-0" aria-hidden /> : null}
      {label}
    </a>
  );
}
