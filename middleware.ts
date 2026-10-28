import { NextRequest, NextResponse } from "next/server";
const legacy: Record<string,string> = { "/urunler": "/tr/products", "/sepet": "/tr/cart", "/giris": "/tr/sign-in" };
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (legacy[normalized] || normalized.startsWith("/urunler/")) {
    const target = normalized.startsWith("/urunler/") ? normalized.replace(/^\/urunler/, "/tr/products") : legacy[normalized];
    const url = request.nextUrl.clone(); url.pathname = target; return NextResponse.redirect(url);
  }
  const first = normalized.split("/")[1];
  if (first === "tr" || first === "en") {
    const headers = new Headers(request.headers); headers.set("x-locale", first);
    return NextResponse.next({ request: { headers } });
  }
  const url = request.nextUrl.clone(); url.pathname = normalized === "/" ? "/tr" : `/tr${normalized}`; return NextResponse.redirect(url);
}
export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"] };
