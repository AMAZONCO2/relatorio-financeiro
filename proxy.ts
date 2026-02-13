import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS_COOKIE_NAME = "rf_access";

function isPublicPath(pathname: string): boolean {
  if (pathname === "/unlock") return true;
  if (pathname === "/api/auth/unlock") return true;
  if (pathname.startsWith("/_next")) return true;
  if (pathname === "/favicon.ico") return true;
  if (pathname.startsWith("/logo")) return true;
  return false;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const expectedToken = process.env.ACCESS_SESSION_TOKEN;
  if (!expectedToken) {
    return new NextResponse("Configuracao de seguranca ausente no servidor.", {
      status: 500,
    });
  }

  const sessionToken = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  if (sessionToken === expectedToken) {
    return NextResponse.next();
  }

  const unlockUrl = new URL("/unlock", request.url);
  unlockUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(unlockUrl);
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
};
