"use client";
import Link from "next/link";
import { useContext, useEffect } from "react";
import domain from "@/utils/config";
import { UserContext } from "../hooks/UserContext";
// import { useAuth } from "../hooks/useAuth";

export default async function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  // const auth = await useAuth.fromServer();
  useEffect(() => {
    fetch(`${domain}/profile`, {
      credentials: "include",
    })
      .then((response) => response)
      .then((userInfo) => setUserInfo(userInfo));
  }, []);

  function logout() {
    fetch(`${domain}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link href="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link href="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
