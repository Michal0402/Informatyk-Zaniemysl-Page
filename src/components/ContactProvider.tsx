"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteContact } from "@/lib/siteContact";

const ContactContext = createContext<SiteContact | null>(null);

export function ContactProvider({
  value,
  children,
}: {
  value: SiteContact;
  children: ReactNode;
}) {
  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
}

export function useSiteContact(): SiteContact {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error("useSiteContact musi być użyte wewnątrz ContactProvider");
  }
  return ctx;
}
