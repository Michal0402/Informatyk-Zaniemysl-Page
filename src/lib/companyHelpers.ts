import type { CompanyConfig } from "@/lib/contentTypes";

function toTelHref(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, "");
  if (!digits) return null;
  return `tel:${digits}`;
}

function displayOrRaw(display: string, raw: string): string {
  const d = display.trim();
  if (d) return d;
  return raw.trim();
}

export function hasPhonePc(company: CompanyConfig): boolean {
  return company.phonePc.trim().length > 0;
}

export function hasPhoneGsm(company: CompanyConfig): boolean {
  return company.phoneGsm.trim().length > 0;
}

export function hasPhone(company: CompanyConfig): boolean {
  return hasPhonePc(company) || hasPhoneGsm(company);
}

export function getPhonePcLabel(company: CompanyConfig): string {
  return displayOrRaw(company.phonePcDisplay, company.phonePc);
}

export function getPhoneGsmLabel(company: CompanyConfig): string {
  return displayOrRaw(company.phoneGsmDisplay, company.phoneGsm);
}

export function getPhonePcHref(company: CompanyConfig): string | null {
  if (!hasPhonePc(company)) return null;
  return toTelHref(company.phonePc);
}

export function getPhoneGsmHref(company: CompanyConfig): string | null {
  if (!hasPhoneGsm(company)) return null;
  return toTelHref(company.phoneGsm);
}

/** Pierwszy dostępny numer (PC, potem GSM) — do prostych CTA */
export function getPhoneLabel(company: CompanyConfig): string {
  if (hasPhonePc(company)) return getPhonePcLabel(company);
  if (hasPhoneGsm(company)) return getPhoneGsmLabel(company);
  return "";
}

export function getTelHref(company: CompanyConfig): string | null {
  return getPhonePcHref(company) ?? getPhoneGsmHref(company);
}

export function hasEmail(company: CompanyConfig): boolean {
  return company.email.trim().length > 0;
}

export function getMailtoHref(company: CompanyConfig): string | null {
  if (!hasEmail(company)) return null;
  return `mailto:${company.email.trim()}`;
}

export function hasAddress(company: CompanyConfig): boolean {
  return company.address.trim().length > 0;
}

export function hasHours(company: CompanyConfig): boolean {
  return company.hours.trim().length > 0;
}

export function hasDomain(company: CompanyConfig): boolean {
  return company.domain.trim().length > 0;
}

export function getSiteUrl(company: CompanyConfig): string | null {
  if (!hasDomain(company)) return null;
  return company.domain.replace(/\/$/, "");
}
