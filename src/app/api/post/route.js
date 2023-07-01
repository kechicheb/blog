import multer from "multer";
import { NextResponse } from "next/server";
import fs from "fs";
import connectDB from "@/src/utils/connectDB";
import Post from "@/src/components/post";

const uploadMiddleware = multer({ dest: "uploads/" });
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
  uploadMiddleware.single("file");
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { token } = req.cookies;
  const { id: userID } = verifyToken(token);
  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
    author: userID,
  });
  res.json(postDoc);
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
  const { id: userID } = verifyToken(token);

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
