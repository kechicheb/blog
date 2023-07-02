"use client";
import Link from "next/link";
import domain from "@/src/utils/config";
import { useContext, useEffect } from "react";
import { UserContext } from "@/src/hooks/userContext";
export default async function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`${domain}/profile`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);
  async function logout() {
    await fetch(`${domain}/logout`, {
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
            <Link href="/post/create">Create new post</Link>
            <Link onClick={logout}>Logout {username}</Link>
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
