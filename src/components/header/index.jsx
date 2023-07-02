"use client";
import Link from "next/link";
import domain from "@/src/utils/config";
import { useEffect } from "react";
import { useUserContext } from "@/src/hooks/userContext";

export default async function Header() {
  const { userInfo, setUserInfo } = useUserContext();
  useEffect(() => {
    fetch(`${domain}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);
  function logout() {
    fetch(`${domain}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }
  // const username = userInfo.username;
  const username = null;
  return (
    <header>
      <Link href="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link href="/post/create">Create new post</Link>
            <Link>Logout {username}</Link>
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
