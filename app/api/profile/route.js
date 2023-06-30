import { verifyJwtToken } from "@/app/libs/auth";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

connectDB();
export async function GET(req) {
  console.log("#########");
  const { value: token } = req.cookies.get("token");
  const r = await verifyJwtToken(token);
  console.log(r)
  return NextResponse.json({ re: "re" });
}
