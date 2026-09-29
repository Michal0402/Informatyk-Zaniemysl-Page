import type { CompanyConfig } from "@/lib/contentTypes";
import {
  getMailtoHref,
  getPhoneGsmHref,
  getPhoneGsmLabel,
  getPhonePcHref,
  getPhonePcLabel,
  hasEmail,
  hasPhone,
  hasPhoneGsm,
  hasPhonePc,
} from "@/lib/companyHelpers";

export type PhoneLine = {
  label: string;
  href: string;
  display: string;
};

export type SiteContact = {
  brand: string;
  name: string;
  area: string;
  description: string;
  address: string;
  hours: string;
  email: string;
  phonePc: PhoneLine | null;
  phoneGsm: PhoneLine | null;
  phoneLabel: string;
  telHref: string | null;
  mailtoHref: string | null;
  hasPhone: boolean;
  hasPhonePc: boolean;
  hasPhoneGsm: boolean;
  hasBothPhones: boolean;
  hasEmail: boolean;
  hasAddress: boolean;
  hasHours: boolean;
};

export function companyToContact(company: CompanyConfig): SiteContact {
  const phonePc =
    hasPhonePc(company) && getPhonePcHref(company)
      ? {
          label: "Serwis komputerowy",
          href: getPhonePcHref(company)!,
          display: getPhonePcLabel(company),
        }
      : null;

  const phoneGsm =
    hasPhoneGsm(company) && getPhoneGsmHref(company)
      ? {
          label: "Serwis GSM",
          href: getPhoneGsmHref(company)!,
          display: getPhoneGsmLabel(company),
        }
      : null;

  const primary = phonePc ?? phoneGsm;

  return {
    brand: company.brand,
    name: company.name,
    area: company.area,
    description: company.description,
    address: company.address,
    hours: company.hours,
    email: company.email,
    phonePc,
    phoneGsm,
    phoneLabel: primary?.display ?? "",
    telHref: primary?.href ?? null,
    mailtoHref: getMailtoHref(company),
    hasPhone: hasPhone(company),
    hasPhonePc: Boolean(phonePc),
    hasPhoneGsm: Boolean(phoneGsm),
    hasBothPhones: Boolean(phonePc && phoneGsm),
    hasEmail: hasEmail(company),
    hasAddress: company.address.trim().length > 0,
    hasHours: company.hours.trim().length > 0,
  };
}
