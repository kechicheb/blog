"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import domain from "@/utils/config";
import { useAuth } from "../hooks/useAuth";

export default async function Header() {
  let { name, setName } = useState("");
  const auth = await useAuth.fromServer();
  // useEffect(async () => {
  //   const response = await fetch(`${domain}/profile`, {
  //     credentials: "include",
  //   });

  //   data = await response.json();
  //   setName(data);
  // }, []);

  function logout() {
    fetch(`${domain}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  return (
    <header>
      <Link href="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {auth && (
          <>
            <Link href="/create">Create new post</Link>
            <a onClick={logout}>Logout </a>
          </>
        )}
        {!auth && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
