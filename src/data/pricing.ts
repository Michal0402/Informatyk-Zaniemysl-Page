import "server-only";

import { getPricing } from "@/lib/content";
import type { PriceItem } from "@/lib/contentTypes";

export type { PriceItem };

export function pricingIntro(): string {
  return getPricing().intro;
}

export function pricingItems(): PriceItem[] {
  return getPricing().items;
}
