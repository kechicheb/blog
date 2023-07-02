import Post from "@/src/models/Post";
import connectDB from "@/src/utils/connectDB";
import { NextResponse } from "next/server";

connectDB();
export async function GET(req, { params }) {
  const id = params.id;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  return NextResponse.json(postDoc);
}
