import { middleware } from "@/app/middleware";
import { NextResponse } from "next/server";
export async function POST(req) {
  await middleware(req);
  const { url, cookies } = request;
  cookies.remove("token", { path: "/" });

  const response = NextResponse.redirect(new URL(`/`, url));
  return response;
}
