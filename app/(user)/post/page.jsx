"use client";
import { useEffect, useState } from "react";
import Post from "../../components/post";
import domain from "@/utils/config";

export default function IndexPage() {
  // const [posts, setPosts] = useState([]);
  // useEffect(async () => {
  //   const res = await fetch(`${domain}/post`);
  //   const posts = await res.json();
  //   setPosts(posts);
  // }, []);
  // return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
  return <h1>Very protected panel page</h1>;
}
