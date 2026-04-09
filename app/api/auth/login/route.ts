import { NextResponse } from "next/server";
import { getConvexHttpClient, api } from "@/lib/convex-http";
import {
  signStaffSessionToken,
  STAFF_AUTH_COOKIE_NAME,
} from "@/lib/staff-jwt";

export async function POST(request: Request): Promise<NextResponse> {
  let body: { email?: string; password?: string };
  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const email = String(body.email ?? "");
  const password = String(body.password ?? "");
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  try {
    const convex = getConvexHttpClient();
    const { staffId } = await convex.action(
      api.staffActions.verifyLoginCredentials,
      { email, password },
    );
    const token = await signStaffSessionToken(staffId);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(STAFF_AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Login failed";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
