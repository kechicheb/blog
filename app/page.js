"use client";
import domain from "@/utils/config";
import Post from "./components/Post";
import { useEffect, useState } from "react";
export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`${domain}/post`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
}
