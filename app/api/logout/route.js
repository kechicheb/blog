import { middleware } from "@/app/middleware";
import { NextResponse } from "next/server";
export async function POST(req) {
  req = await req.json();
  middleware(req);
  const { url, cookies } = req;
  cookies.remove("token", { path: "/" });

  const response = NextResponse.redirect(new URL(`/`, url));
  return response;
}
