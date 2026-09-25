import "server-only";

import { getCompany } from "@/lib/content";
import {
  getMailtoHref as mailtoFrom,
  getPhoneLabel as phoneLabelFrom,
  getSiteUrl as siteUrlFrom,
  getTelHref as telFrom,
  hasAddress as addressFrom,
  hasDomain as domainFrom,
  hasEmail as emailFrom,
  hasHours as hoursFrom,
  hasPhone as phoneFrom,
} from "@/lib/companyHelpers";

/** Aktualne dane firmy z content/company.json */
export function company() {
  return getCompany();
}

export function hasPhone(): boolean {
  return phoneFrom(getCompany());
}

export function getPhoneLabel(): string {
  return phoneLabelFrom(getCompany());
}

export function getTelHref(): string | null {
  return telFrom(getCompany());
}

export function hasEmail(): boolean {
  return emailFrom(getCompany());
}

export function getMailtoHref(): string | null {
  return mailtoFrom(getCompany());
}

export function hasAddress(): boolean {
  return addressFrom(getCompany());
}

export function hasHours(): boolean {
  return hoursFrom(getCompany());
}

export function hasDomain(): boolean {
  return domainFrom(getCompany());
}

export function getSiteUrl(): string | null {
  return siteUrlFrom(getCompany());
}
