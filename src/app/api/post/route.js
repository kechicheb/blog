import { NextResponse } from "next/server";
import connectDB from "@/src/utils/connectDB";
import Post from "@/src/models/Post";

import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import { verifyJwtToken } from "@/src/libs/auth";

connectDB();
export async function GET() {
  return NextResponse.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
}

export async function POST(req) {
  const token = req.cookies.get("token") ?? null;

  const formData = await req.formData();
  const file = formData.get("file");
  const title = formData.get("title");
  const content = formData.get("content");
  const summary = formData.get("summary");

  const { id: userID } = await verifyJwtToken(token.value);
  console.log(`File name: ${file.name}`);
  console.log(`Content-Length: ${file.size}`);

  const destinationDirPath = path.join(process.cwd(), "public/uploads");
  const fileArrayBuffer = await file.arrayBuffer();

  if (!existsSync(destinationDirPath)) {
    fs.mkdir(destinationDirPath, { recursive: true });
  }
  const imageFileName = `${Date.now()}-${file.name}`;
  try {
    await fs.writeFile(
      path.join(destinationDirPath, imageFileName),
      Buffer.from(fileArrayBuffer)
    );
    const post = new Post({
      title,
      content,
      summary,
      cover: `/uploads/${imageFileName}`,
      author: userID,
    });

    await post.save();
    return NextResponse.json({ status: 201, success: true });
  } catch (saveErr) {
    console.error("Error saving post:", saveErr);
    return NextResponse.json({ status: 500, error: "Error saving post" });
  }
}
export async function PUT(req) {
  const token = req.cookies.get("token") ?? null;

  const formData = await req.formData();
  const file = formData.get("file");
  const id = formData.get("id");
  const title = formData.get("title");
  const content = formData.get("content");
  const summary = formData.get("summary");
  const postDoc = await Post.findById(id);

  const { id: userID } = await verifyJwtToken(token.value);

  const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(userID);
  if (!isAuthor) {
    return NextResponse.json({ status: 400, error: "you are not the author" });
  }
  let newPath = null;

  try {
    if (file) {
      newPath = `${Date.now()}-${file.name}`;
      const oldFilePath = path.join(__dirname, `public${postDoc.cover}`);
      const newFilePath = path.join(__dirname, `public/uploads/${newPath}`);
      await fs.renameSync(oldFilePath, newFilePath);
    }

    await Post.updateOne(
      { _id: id },
      {
        title,
        summary,
        content,
        cover: newPath ? `/uploads/${newPath}` : postDoc.cover,
      }
    );

    return NextResponse.json({ status: 201, success: true });
  } catch (saveErr) {
    console.error("Error saving post:", saveErr);
    return NextResponse.json({ status: 500, error: "Error saving post" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
