import type { CompanyConfig } from "@/lib/contentTypes";

export function hasPhone(company: CompanyConfig): boolean {
  return company.phone.trim().length > 0;
}

export function getPhoneLabel(company: CompanyConfig): string {
  const display = company.phoneDisplay.trim();
  if (display) return display;
  return company.phone.trim();
}

export function getTelHref(company: CompanyConfig): string | null {
  if (!hasPhone(company)) return null;
  const digits = company.phone.replace(/[^\d+]/g, "");
  if (!digits) return null;
  return `tel:${digits}`;
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
