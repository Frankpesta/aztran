import { NextResponse } from "next/server";
import { getConvexHttpClient, api } from "@/lib/convex-http";

/**
 * One-time creation of the sole platform admin when no staff rows exist.
 * Requires identical STAFF_BOOTSTRAP_SECRET in Next and Convex.
 */
export async function POST(request: Request): Promise<NextResponse> {
  let body: {
    secret?: string;
    email?: string;
    password?: string;
    name?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const secret = String(body.secret ?? "");
  const email = String(body.email ?? "");
  const password = String(body.password ?? "");
  if (!secret || !email || !password) {
    return NextResponse.json(
      { error: "secret, email, and password are required" },
      { status: 400 },
    );
  }

  try {
    const convex = getConvexHttpClient();
    await convex.action(api.staffActions.bootstrapFirstAdmin, {
      secret,
      email,
      password,
      name: body.name,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Bootstrap failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
