"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { CompanyConfig } from "@/lib/contentTypes";
import {
  getMailtoHref,
  getPhoneLabel,
  getTelHref,
  hasEmail,
  hasPhone,
} from "@/lib/companyHelpers";

export type SiteContact = {
  brand: string;
  name: string;
  area: string;
  description: string;
  address: string;
  hours: string;
  email: string;
  phoneLabel: string;
  telHref: string | null;
  mailtoHref: string | null;
  hasPhone: boolean;
  hasEmail: boolean;
  hasAddress: boolean;
  hasHours: boolean;
};

const ContactContext = createContext<SiteContact | null>(null);

export function companyToContact(company: CompanyConfig): SiteContact {
  return {
    brand: company.brand,
    name: company.name,
    area: company.area,
    description: company.description,
    address: company.address,
    hours: company.hours,
    email: company.email,
    phoneLabel: getPhoneLabel(company),
    telHref: getTelHref(company),
    mailtoHref: getMailtoHref(company),
    hasPhone: hasPhone(company),
    hasEmail: hasEmail(company),
    hasAddress: company.address.trim().length > 0,
    hasHours: company.hours.trim().length > 0,
  };
}

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
