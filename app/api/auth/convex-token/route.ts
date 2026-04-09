import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { STAFF_AUTH_COOKIE_NAME } from "@/lib/staff-jwt";

export async function GET(): Promise<NextResponse> {
  const store = await cookies();
  const token = store.get(STAFF_AUTH_COOKIE_NAME)?.value ?? null;
  return NextResponse.json({ token });
}
