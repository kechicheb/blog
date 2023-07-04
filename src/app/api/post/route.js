import { NextResponse } from "next/server";
import connectDB from "@/src/utils/connectDB";
import Post from "@/src/models/Post";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
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
export const config = {
  api: {
    bodyParser: false,
  },
};
export async function POST(req) {
  const token = req.cookies.get("token") ?? null;
  const { id: userID } = verifyJwtToken(token);
  // const { title, summary, content } = req.body;

  const options = {};
  let filePath;

  options.uploadDir = path.join(process.cwd(), "/public/uploads");
  options.filename = (name, ext, path, form) => {
    return Date.now().toString() + "_" + path.originalFilename;
  };

  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
      filePath = Object.values(files)[0].path;
    });
  });

  const postDoc = await Post.create({
    title :"title",
    summary:"summary",
    content:"content",
    cover: filePath,
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
  const { id: userID } = verifyJwtToken(token);

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
