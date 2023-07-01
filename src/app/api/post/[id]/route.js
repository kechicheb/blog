import Post from "@/models/Post";
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
connectDB();
export async function GET(req, { params }) {
  const id = params.id;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  return NextResponse.json(postDoc);
}
