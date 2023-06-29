import { useEffect, useState } from "react";
import Post from "../components/Post";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`${domain}/post`)
      .then((response) => response)
      .then((posts) => setPosts(posts));
  }, []);
  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
}