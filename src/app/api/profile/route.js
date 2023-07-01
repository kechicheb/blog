import { verifyJwtToken } from "@/app/libs/auth";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

connectDB();
export async function GET(req) {
  const { value: token } = req.cookies.get("token");
  const username = await verifyJwtToken(token);
  return NextResponse.json(username);
}
