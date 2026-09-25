import type { MetadataRoute } from "next";
import { getCompany } from "@/lib/content";
import { getSiteUrl, hasDomain } from "@/lib/companyHelpers";

export default function sitemap(): MetadataRoute.Sitemap {
  const company = getCompany();
  if (!hasDomain(company)) {
    return [];
  }

  return [
    {
      url: `${getSiteUrl(company)}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
