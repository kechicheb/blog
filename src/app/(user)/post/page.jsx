"use client";
import Post from "@/src/components/post";
import domain from "@/src/utils/config";
import { Suspense, useEffect, useState } from "react";

export default async function IndexPage() {
  const res = await fetch(`${domain}/post`, {
    cache: "no-cache",
    next: {
      tags: ["posts"],
    },
  });
  const posts = await res.json();

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}
