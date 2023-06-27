import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/utils/connectDB";
connectDB();
const secret = process.env.SECRET;
export async function POST(req, res) {
  const { username, password } = await req.json();
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      const cookieOptions = {
        maxAge: 604800, // Cookie expiration time in seconds (one week)
        path: "/", // Cookie path
      };

      return NextResponse.cookie("token", token, cookieOptions)
        .status(200)
        .json({
          id: userDoc._id,
          username,
        });
    });
  } else {
    return NextResponse.status(400).json("wrong credentials");
  }
}
