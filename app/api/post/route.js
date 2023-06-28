import Post from "@/models/Post";
import { NextResponse } from "next/server";
export async function GET(req) {
  const { id } = req.query;
  if (id) {
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    return NextResponse.json(postDoc);
  } else {
    return NextResponse.json(
      await Post.find()
        .populate("author", ["username"])
        .sort({ createdAt: -1 })
        .limit(20)
    );
  }
}
