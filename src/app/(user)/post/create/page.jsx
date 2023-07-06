"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import domain from "@/src/utils/config";
import Editor from "@/src/components/editor";
import { revalidateTag } from "next/cache";
import { createPost } from "@/src/app/actions/serverActions";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [CreateTrue, setCreateTrue] = useState(false);
  const router = useRouter();
  async function createNewPost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files);

    const res = createPost(data);
    if (res) {
      setCreateTrue(true);
    }
  }
  
  return (
    <>
      {CreateTrue && <p> Success</p>}
      <form onSubmit={createNewPost} name="create">
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input type="file" onChange={(ev) => setFiles(ev.target.files[0])} />
        <Editor value={content} onChange={setContent} />
        <button style={{ marginTop: "5px" }}>Create post</button>
      </form>
    </>
  );
}
