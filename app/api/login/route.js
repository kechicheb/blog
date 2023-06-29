import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/utils/connectDB";
import { generateToken } from "@/app/libs/auth";
connectDB();
export async function POST(req) {
  const { username, password } = await req.json();
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);

  if (passOk) {
    const token = generateToken({ username, id: userDoc._id });

    const response = NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      }
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
