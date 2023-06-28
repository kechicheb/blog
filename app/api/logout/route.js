import { NextResponse } from "next/server";

export async function post(req) {
  const response = NextResponse.redirect(
    new URL(`/login?${searchParams}`, url)
  );
  response.cookies.delete("token");

  return response;
}
