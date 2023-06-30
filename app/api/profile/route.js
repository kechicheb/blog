import { verifyToken } from "@/app/libs/auth";
import { middleware } from "@/app/middleware";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
connectDB();
export async function GET(req) {
  middleware(req);
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  return NextResponse.json(verifyToken(token));
}
