import { NextResponse } from "next/server";
import { verifyToken } from "./libs/auth";

const PAGES = ["/login", "/register"];

const pages = (url) => PAGES.some((page) => page.startsWith(url));

export function middleware(request) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };

  const hasVerifiedToken = token && verifyToken(token);
  const isPages = pages(nextUrl.pathname);

  if (isPages && !hasVerifiedToken) {
    return;
  }
  if (isPages && hasVerifiedToken) {
    return NextResponse.redirect(new URL("/post", url));
  }
  if (!hasVerifiedToken) {
    return NextResponse.redirect(new URL("/post", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "register",
    "/post/:path*",
    "/create",
    "/edit",
    "/profile",
  ],
};
