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

export async function POST(req) {
  const token = req.cookies.get("token") ?? null;

  const { id: userID } = await verifyJwtToken(token.value);

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ error: "Error parsing form" });
    }

    // Access the uploaded image file
    const imageFile = files.image;

    // Generate a unique filename for the image
    const imageFileName = `${Date.now()}-${imageFile.name}`;

    // Set the destination path to save the image in the public folder
    const destinationPath = path.join(
      process.cwd(),
      "public/uploads",
      imageFileName
    );

    // Move the image file to the destination path
    fs.renameSync(imageFile.path, destinationPath);

    // Generate the public URL for the image
    const imageUrl = `/uploads/${imageFileName}`;

    // Save the post with the user ID and the image link
    try {
      const post = new Post({
        title: fields.title,
        content: fields.content,
        summary: fields.summary,
        cover: imageUrl,
        author: userID,
      });

      await post.save();
      return NextResponse.json({ status: 201, success: true });
    } catch (saveErr) {
      console.error("Error saving post:", saveErr);
      return NextResponse.json({ status: 500, error: "Error saving post" });
    }
  });
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
