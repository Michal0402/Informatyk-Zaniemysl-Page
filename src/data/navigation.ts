export const navLinks = [
  { href: "#uslugi", label: "Usługi" },
  { href: "#jak-to-dziala", label: "Jak to działa?" },
  { href: "#cennik", label: "Cennik" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export const mobileBarLinks = [
  { href: "#kontakt", label: "Zadzwoń", icon: "phone" as const },
  { href: "#uslugi", label: "Usługi", icon: "wrench" as const },
  { href: "#cennik", label: "Cennik", icon: "list" as const },
] as const;
