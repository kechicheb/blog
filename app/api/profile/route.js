import { verifyToken } from "@/app/libs/auth";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
connectDB();
export async function GET(req) {
  const token = req.cookies.get("token");
  const { username } = verifyToken(token);
  return NextResponse.json({ username: username });
}
