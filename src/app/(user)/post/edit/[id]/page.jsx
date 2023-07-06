"use client";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "@/src/components/editor";
import domain from "@/src/utils/config";
import SuccessPopup from "@/src/components/popup";
export default function EditPost({ params }) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [Success, setSuccess] = useState(false);
  const router = useRouter();
  const { id } = params;
  useEffect(() => {
    fetch(`${domain}/post/${id}`)
      .then((response) => response.json())
      .then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch(`${domain}/post`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setSuccess(true);
    }
  }

  return (
    <>
      {Success && (
        <SuccessPopup
          message={"Post modified successfully"}
          setSuccess={setSuccess}
        />
      )}
      <form onSubmit={updatePost}>
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
        <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <Editor onChange={setContent} value={content} />
        <button style={{ marginTop: "5px" }}>Update post</button>
      </form>
    </>
  );
}
