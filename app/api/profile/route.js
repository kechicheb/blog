import { verifyToken } from "@/app/libs/auth";
import { middleware } from "@/app/middleware";
import { NextResponse } from "next/server";

export async function GET(req) {
  await middleware(req);
  req = await req.json();
  return NextResponse.json(verifyToken(req.cookie.token));
}
