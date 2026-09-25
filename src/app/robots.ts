import type { MetadataRoute } from "next";
import { getCompany } from "@/lib/content";
import { getSiteUrl, hasDomain } from "@/lib/companyHelpers";

export default function robots(): MetadataRoute.Robots {
  const company = getCompany();
  const siteUrl = getSiteUrl(company);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/admin/"],
    },
    ...(hasDomain(company) && siteUrl
      ? { sitemap: `${siteUrl}/sitemap.xml` }
      : {}),
  };
}
