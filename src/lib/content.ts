import "server-only";

import fs from "node:fs";
import path from "node:path";
import type {
  CompanyConfig,
  FaqConfig,
  FaqItem,
  PriceItem,
  PricingConfig,
  Realization,
  RealizationsConfig,
  SiteContent,
} from "@/lib/contentTypes";

export type {
  CompanyConfig,
  FaqConfig,
  PricingConfig,
  RealizationsConfig,
  SiteContent,
  FaqItem,
  PriceItem,
  Realization,
} from "@/lib/contentTypes";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJson<T>(filename: string): T {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as T;
}

function writeJson(filename: string, data: unknown): void {
  const filePath = path.join(CONTENT_DIR, filename);
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function getCompany(): CompanyConfig {
  return readJson<CompanyConfig>("company.json");
}

export function getPricing(): PricingConfig {
  return readJson<PricingConfig>("pricing.json");
}

export function getFaq(): FaqConfig {
  return readJson<FaqConfig>("faq.json");
}

export function getRealizations(): RealizationsConfig {
  return readJson<RealizationsConfig>("realizations.json");
}

export function getSiteContent(): SiteContent {
  return {
    company: getCompany(),
    pricing: getPricing(),
    faq: getFaq(),
    realizations: getRealizations(),
  };
}

function validateCompany(data: unknown): CompanyConfig {
  if (!data || typeof data !== "object") {
    throw new Error("Niepoprawne dane firmy");
  }
  const d = data as Record<string, unknown>;
  const keys = [
    "name",
    "brand",
    "phonePc",
    "phonePcDisplay",
    "phoneGsm",
    "phoneGsmDisplay",
    "email",
    "address",
    "hours",
    "area",
    "domain",
    "description",
  ] as const;

  for (const key of keys) {
    if (typeof d[key] !== "string") {
      throw new Error(`Pole firmy „${key}” musi być tekstem`);
    }
  }

  return {
    name: d.name as string,
    brand: d.brand as string,
    phonePc: d.phonePc as string,
    phonePcDisplay: d.phonePcDisplay as string,
    phoneGsm: d.phoneGsm as string,
    phoneGsmDisplay: d.phoneGsmDisplay as string,
    email: d.email as string,
    address: d.address as string,
    hours: d.hours as string,
    area: d.area as string,
    domain: d.domain as string,
    description: d.description as string,
  };
}

function validatePricing(data: unknown): PricingConfig {
  if (!data || typeof data !== "object") {
    throw new Error("Niepoprawny cennik");
  }
  const d = data as Record<string, unknown>;
  if (typeof d.intro !== "string") {
    throw new Error("Cennik: brak intro");
  }
  if (!Array.isArray(d.items)) {
    throw new Error("Cennik: items musi być tablicą");
  }
  const items: PriceItem[] = d.items.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`Cennik: niepoprawna pozycja #${index + 1}`);
    }
    const row = item as Record<string, unknown>;
    if (
      typeof row.id !== "string" ||
      typeof row.name !== "string" ||
      typeof row.price !== "string"
    ) {
      throw new Error(`Cennik: pozycja #${index + 1} wymaga id, name i price`);
    }
    return {
      id: row.id,
      name: row.name,
      price: row.price,
      ...(typeof row.note === "string" && row.note ? { note: row.note } : {}),
    };
  });
  return { intro: d.intro, items };
}

function validateFaq(data: unknown): FaqConfig {
  if (!data || typeof data !== "object") {
    throw new Error("Niepoprawne FAQ");
  }
  const d = data as Record<string, unknown>;
  if (!Array.isArray(d.items)) {
    throw new Error("FAQ: items musi być tablicą");
  }
  const items: FaqItem[] = d.items.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`FAQ: niepoprawna pozycja #${index + 1}`);
    }
    const row = item as Record<string, unknown>;
    if (
      typeof row.id !== "string" ||
      typeof row.question !== "string" ||
      typeof row.answer !== "string"
    ) {
      throw new Error(`FAQ: pozycja #${index + 1} wymaga id, question i answer`);
    }
    return {
      id: row.id,
      question: row.question,
      answer: row.answer,
    };
  });
  return { items };
}

function validateRealizations(data: unknown): RealizationsConfig {
  if (!data || typeof data !== "object") {
    throw new Error("Niepoprawne realizacje");
  }
  const d = data as Record<string, unknown>;
  if (typeof d.intro !== "string") {
    throw new Error("Realizacje: brak intro");
  }
  if (!Array.isArray(d.items)) {
    throw new Error("Realizacje: items musi być tablicą");
  }
  const items: Realization[] = d.items.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`Realizacje: niepoprawna pozycja #${index + 1}`);
    }
    const row = item as Record<string, unknown>;
    if (
      typeof row.id !== "string" ||
      typeof row.title !== "string" ||
      typeof row.description !== "string"
    ) {
      throw new Error(
        `Realizacje: pozycja #${index + 1} wymaga id, title i description`,
      );
    }
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      ...(typeof row.image === "string" && row.image ? { image: row.image } : {}),
      ...(typeof row.alt === "string" && row.alt ? { alt: row.alt } : {}),
    };
  });
  return { intro: d.intro, items };
}

export function saveSiteContent(payload: unknown): SiteContent {
  if (!payload || typeof payload !== "object") {
    throw new Error("Brak danych do zapisu");
  }
  const body = payload as Record<string, unknown>;
  const company = validateCompany(body.company);
  const pricing = validatePricing(body.pricing);
  const faq = validateFaq(body.faq);
  const realizations = validateRealizations(body.realizations);

  writeJson("company.json", company);
  writeJson("pricing.json", pricing);
  writeJson("faq.json", faq);
  writeJson("realizations.json", realizations);

  return { company, pricing, faq, realizations };
}
