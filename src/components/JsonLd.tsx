import { getCompany } from "@/lib/content";
import {
  getPhoneLabel,
  getSiteUrl,
  hasAddress,
  hasEmail,
  hasHours,
  hasPhone,
} from "@/lib/companyHelpers";

export function JsonLd() {
  const company = getCompany();
  const siteUrl = getSiteUrl(company);

  const localBusiness: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    description: company.description,
    areaServed: company.area,
    url: siteUrl ?? undefined,
  };

  if (hasPhone(company)) {
    localBusiness.telephone = getPhoneLabel(company);
  }
  if (hasEmail(company)) {
    localBusiness.email = company.email;
  }
  if (hasAddress(company)) {
    localBusiness.address = {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: "Zaniemyśl",
      addressCountry: "PL",
    };
  }
  if (hasHours(company)) {
    localBusiness.openingHours = company.hours;
  }

  Object.keys(localBusiness).forEach((key) => {
    if (localBusiness[key] === undefined) delete localBusiness[key];
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}
