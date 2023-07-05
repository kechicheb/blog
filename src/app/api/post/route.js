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
  console.log(destinationDirPath);

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
  uploadMiddleware.single("file");
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  const { id: userID } = await verifyJwtToken(token.value);

  const { id, title, summary, content } = req.body;
  const postDoc = await Post.findById(id);
  const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(userID);
  if (!isAuthor) {
    return res.status(400).json("you are not the author");
  }
  await postDoc.update({
    title,
    summary,
    content,
    cover: newPath ? newPath : postDoc.cover,
  });

  res.json(postDoc);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
