import { NextResponse } from "next/server";
import { getConvexHttpClient, api } from "@/lib/convex-http";
import {
  signStaffSessionToken,
  STAFF_AUTH_COOKIE_NAME,
} from "@/lib/staff-jwt";

export async function POST(request: Request): Promise<NextResponse> {
  let body: { token?: string; password?: string; name?: string };
  try {
    body = (await request.json()) as {
      token?: string;
      password?: string;
      name?: string;
    };
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const token = String(body.token ?? "");
  const password = String(body.password ?? "");
  const name = body.name ? String(body.name) : undefined;
  if (!token || !password) {
    return NextResponse.json(
      { error: "Token and password are required" },
      { status: 400 },
    );
  }

  try {
    const convex = getConvexHttpClient();
    const { staffId } = await convex.action(
      api.staffActions.acceptModeratorInvite,
      { token, password, name },
    );
    const session = await signStaffSessionToken(staffId);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(STAFF_AUTH_COOKIE_NAME, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not complete signup";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
