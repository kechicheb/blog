"use client";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import domain from "@/src/utils/config";
import Editor from "@/src/components/editor";
import SuccessPopup from "@/src/components/popup";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [Success, setSuccess] = useState(false);
  const router = useRouter();
  async function createNewPost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files);

    const res = await fetch(`${domain}/post`, {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (res.ok) {
      setSuccess(true);
    }
  }

  return (
    <>
      {Success && (
        <SuccessPopup
          message={"Post added successfully"}
          setSuccess={setSuccess}
          setTitle={setTitle}
          setSummary={setSummary}
          setContent={setContent}
          setFiles={setFiles}
        />
      )}
      <form onSubmit={createNewPost}>
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
