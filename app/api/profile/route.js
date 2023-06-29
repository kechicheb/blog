import { middleware } from "@/app/middleware";
import { NextResponse } from "next/server";

export async function GET(req) {
  req = await req.json();
  console.log(req)
  console.log("ahmed kechicheb");
  console.log(req.cookie.token);
  await middleware(req);
  return NextResponse.json(req.cookie.token);
  // return NextResponse.json(verifyToken(req.cookie.token));
}
