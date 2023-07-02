import { verifyJwtToken } from "@/src/libs/auth";
import connectDB from "@/src/utils/connectDB";

import { NextResponse } from "next/server";

connectDB();
export async function GET(req) {
  const { value: token } = req.cookies.get("token") ?? { value: null };
  const res = await verifyJwtToken(token);
  return NextResponse.json(res);
}
