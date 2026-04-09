import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify, importSPKI } from "jose";
import { STAFF_AUTH_COOKIE_NAME } from "@/lib/staff-jwt";

async function verifyCookieToken(token: string): Promise<boolean> {
  const issuer = process.env.AUTH_JWT_ISSUER;
  const pem = process.env.AUTH_JWT_PUBLIC_KEY?.replace(/\\n/g, "\n");
  if (!issuer || !pem) {
    return false;
  }
  try {
    const key = await importSPKI(pem, "RS256");
    await jwtVerify(token, key, {
      issuer,
      audience: "convex",
    });
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const path = request.nextUrl.pathname;
  if (!path.startsWith("/admin")) {
    return NextResponse.next();
  }
  if (
    path.startsWith("/admin/login") ||
    path.startsWith("/admin/accept-invite")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(STAFF_AUTH_COOKIE_NAME)?.value;
  if (!token || !(await verifyCookieToken(token))) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", path + request.nextUrl.search);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
