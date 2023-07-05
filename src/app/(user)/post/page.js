"use client";
import Post from "@/src/components/post";
import domain from "@/src/utils/config";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(async () => {
    const res = await fetch(`${domain}/post`);
    const posts = await res.json();
    setPosts(posts);
  }, []);
  return (
    <>
      {posts.length !== 0 ? (
        <>
          {posts.map((post) => (
            <Post {...post} />
          ))}
        </>
      ) : (
        <>
          <h1>any posts</h1>
        </>
      )}
    </>
  );
}
