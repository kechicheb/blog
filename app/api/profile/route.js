import { verifyToken } from "@/app/libs/auth";
import { middleware } from "@/app/middleware";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
connectDB();
export async function GET(req) {
  req = await req.json();
  middleware(req);
  return NextResponse.json(verifyToken(req.cookie.token));
}
