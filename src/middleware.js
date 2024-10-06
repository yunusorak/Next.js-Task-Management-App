import { NextResponse } from "next/server";
import { defaultLocale, locales } from "./app/consts/lang";
import { cookies } from "next/headers";

export default async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/public") || pathname.startsWith("/assets")) {
    return NextResponse.next(); //
  }

  const pathNameHas = locales.some(
    (ls) => pathname.startsWith(`/${ls}/`) || pathname.startsWith(`/${ls}`)
  );

  const splittedSegments = pathname.split("/");
  if (pathNameHas) {
    if (splittedSegments.length === 2) {
      request.nextUrl.pathname = `/${splittedSegments[1]}/main`;
      return NextResponse.redirect(request.nextUrl);
    }
  } else {
    request.nextUrl.pathname = `/${defaultLocale}/login`;
    return NextResponse.redirect(request.nextUrl);
  }

  if (splittedSegments[2] === "login") {
    // console.log(request.cookies.get("session"));
  } else {
    const session = request.cookies.get("session");
    if (!session) {
      request.nextUrl.pathname = `/${defaultLocale}/login`;
      return NextResponse.redirect(request.nextUrl);
    }
  }
}

export const config = {
  matcher: ["/((?!_next).*)", "/"],
};
