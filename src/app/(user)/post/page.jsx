"use client";
import Post from "@/src/components/post";
import domain from "@/src/utils/config";
import { useEffect, useState } from "react";

export default async function IndexPage() {
  const res = await fetch(`${domain}/post`, { next: { revalidate: 60 } });
  const posts = await res.json();

  return (
    <>
      {posts.length > 0 ? (
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
