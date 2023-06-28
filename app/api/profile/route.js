import { middleware } from "@/app/middleware";
import { NextResponse } from "next/server";

export async function GET(req) {
  req = await req.json();
  middleware(req);
  return NextResponse.json(verifyToken(req.cookie.token));
}
