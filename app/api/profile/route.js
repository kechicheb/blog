import { verifyToken } from "@/app/libs/auth";
import { middleware } from "@/app/middleware";
import { NextResponse } from "next/server";

export async function GET(req) {
  console.log(req);
  req = await req.json();
  console.log("aaaaaaaaaaaaaaaaaaa");
  await middleware(req);
  return NextResponse.json(verifyToken(req.cookie.token));
}
