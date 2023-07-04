import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/src/utils/connectDB";
import User from "@/src/models/User";
import { getJwtSecretKey } from "@/src/libs/auth";
import { SignJWT } from "jose";
connectDB();

const salt = bcrypt.genSaltSync(10);

export async function POST(req) {
  const { username, password } = await req.json();
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    if (userDoc) {
      const token = await new SignJWT({
        id: userDoc._id,
        role: "user",
        username: username,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30s") // Set your own expiration time
        .sign(getJwtSecretKey());
      const response = NextResponse.json(
        { success: true, username: username },

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
  } catch (e) {
    console.log(e);
    return NextResponse.status(400).json(e);
  }
}
