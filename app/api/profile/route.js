import { NextResponse } from "next/server";

export async function GET(req) {
  const reqq = await req.json();
  const { token } = reqq.cookies;
  return NextResponse.json(token);
}
