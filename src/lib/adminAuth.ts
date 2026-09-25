import "server-only";

import crypto from "node:crypto";

export const ADMIN_COOKIE = "sz_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 h

function getPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

export function isAdminConfigured(): boolean {
  return getPassword().length >= 8;
}

function getSecret(): string {
  const password = getPassword();
  if (!password) {
    throw new Error("ADMIN_PASSWORD nie jest ustawione");
  }
  return process.env.ADMIN_SECRET?.trim() || password;
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function verifyAdminPassword(password: string): boolean {
  const expected = getPassword();
  if (!expected || !password) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `ok.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !isAdminConfigured()) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [status, expiresRaw, signature] = parts;
  if (status !== "ok" || !expiresRaw || !signature) return false;
  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;
  const payload = `${status}.${expiresRaw}`;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function sessionCookieOptions(token: string) {
  return {
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  };
}
