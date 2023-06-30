import { middleware } from "@/app/middleware";
import { NextResponse } from "next/server";
export async function POST(req) {
  middleware(req);
  const { url, cookies } = req;
  cookies.delete("token", { path: "/" });

  const response = NextResponse.redirect(new URL(`/`, url));
  return response;
}
