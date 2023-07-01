import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import connectDB from "@/src/utils/connectDB";
import User from "@/src/models/User";

connectDB();

const salt = bcrypt.genSaltSync(10);

export async function POST(req) {
  const { username, password } = await req.json();
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    return NextResponse.json(userDoc);
  } catch (e) {
    console.log(e);
    return NextResponse.status(400).json(e);
  }
}
