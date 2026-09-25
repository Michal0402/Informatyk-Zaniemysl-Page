import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { getCompany } from "@/lib/content";
import { getSiteUrl, hasDomain } from "@/lib/companyHelpers";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const display = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

const body = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0B0F14",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const company = getCompany();
  const siteUrl = getSiteUrl(company);

  return {
    ...(hasDomain(company) && siteUrl
      ? { metadataBase: new URL(siteUrl) }
      : {}),
    title: {
      default: "Serwis komputerów i telefonów w Zaniemyślu | Serwis Zaniemyśl",
      template: "%s | Serwis Zaniemyśl",
    },
    description:
      "Serwis komputerowy i GSM w Zaniemyślu. Naprawa laptopów, komputerów i smartfonów — diagnostyka, wycena i naprawa.",
    keywords: [
      "serwis komputerowy Zaniemyśl",
      "naprawa laptopów Zaniemyśl",
      "serwis telefonów Zaniemyśl",
      "naprawa iPhone Zaniemyśl",
      "serwis GSM Zaniemyśl",
      "naprawa komputerów okolice Zaniemyśla",
    ],
    authors: [{ name: company.name }],
    creator: company.name,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      siteName: company.name,
      title: "Serwis komputerów i telefonów w Zaniemyślu",
      description: company.description,
      ...(siteUrl ? { url: siteUrl } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: "Serwis komputerów i telefonów w Zaniemyślu",
      description: company.description,
    },
    alternates: siteUrl
      ? {
          canonical: "/",
        }
      : undefined,
    category: "business",
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main" className="skip-link">
          Przejdź do treści
        </a>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
