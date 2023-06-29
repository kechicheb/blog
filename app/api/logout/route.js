import { middleware } from "@/app/middleware";
import { NextResponse } from "next/server";
import Cookies from "universal-cookie";
export async function POST(req) {
  await middleware(req);
  const cookies = new Cookies();
  cookies.remove("token", { path: "/" });

  return NextResponse.json({ logout: true });
}
