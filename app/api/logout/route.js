import domain from "@/utils/config";
import { NextResponse } from "next/server";
import Cookies from "universal-cookie";
import { URL } from "url";
export async function POST(req) {
  const cookies = new Cookies();
  cookies.remove("token", { path: "/" });

  return NextResponse.json({ logout: true });
}
