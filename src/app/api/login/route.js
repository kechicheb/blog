import bcrypt from "bcryptjs";

import { SignJWT } from "jose";
import { NextResponse } from "next/server";

import User from "@/src/models/User";
import connectDB from "@/src/utils/connectDB";
import { getJwtSecretKey } from "@/src/libs/auth";

connectDB();
export async function POST(req) {
  const { username, password } = await req.json();
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    const token = await new SignJWT({
      id: userDoc._id,
      role: "user",
      username: username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("3000s") // Set your own expiration time
      .sign(getJwtSecretKey());

    const response = NextResponse.json(
      { success: true, username: username, id: userDoc._id },

      { status: 200, headers: { "content-type": "application/json" } }
    );

    response.cookies.set({
      name: "token",
      value: token,
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ success: false });
}
