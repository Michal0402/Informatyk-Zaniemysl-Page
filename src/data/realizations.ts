import "server-only";

import { getRealizations } from "@/lib/content";
import type { Realization } from "@/lib/contentTypes";

export type { Realization };

export function realizationsIntro(): string {
  return getRealizations().intro;
}

export function realizations(): Realization[] {
  return getRealizations().items;
}
