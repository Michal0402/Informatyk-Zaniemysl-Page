import fs from "node:fs";
import path from "node:path";

/** Sprawdza, czy plik istnieje w public/ (przy budowaniu statycznym). */
export function publicFileExists(publicPath: string): boolean {
  const clean = publicPath.replace(/^\//, "");
  return fs.existsSync(path.join(process.cwd(), "public", clean));
}

export function resolvePublicImage(
  publicPath: string | undefined,
): string | undefined {
  if (!publicPath) return undefined;
  return publicFileExists(publicPath) ? publicPath : undefined;
}
