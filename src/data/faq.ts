import "server-only";

import { getFaq } from "@/lib/content";
import type { FaqItem } from "@/lib/contentTypes";

export type { FaqItem };

export function faqItems(): FaqItem[] {
  return getFaq().items;
}
