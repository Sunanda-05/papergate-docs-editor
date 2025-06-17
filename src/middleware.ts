import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (pathname.startsWith("/doc")) {
    if (!accessToken) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/auth/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  if (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register")
  ) {
    if (accessToken) {
      const docUrl = request.nextUrl.clone();
      docUrl.pathname = "/doc";
      return NextResponse.redirect(docUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/doc/:path*", "/auth/login", "/auth/register"],
};
