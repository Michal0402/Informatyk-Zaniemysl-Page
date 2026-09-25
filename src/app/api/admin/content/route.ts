import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/adminAuth";
import { getSiteContent, saveSiteContent } from "@/lib/content";

async function requireAdmin() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }
  return NextResponse.json(getSiteContent());
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Brak autoryzacji" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Niepoprawny JSON" }, { status: 400 });
  }

  try {
    const saved = saveSiteContent(body);
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
    revalidatePath("/robots.txt");
    return NextResponse.json({ ok: true, content: saved });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Nie udało się zapisać";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
