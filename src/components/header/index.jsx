"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import { useLogout } from "@/src/hooks/useLogout";
import Link from "next/link";

export default function Header() {
  const { state } = useContext(AuthContext);
  console.log("Header");
  console.log(state);
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    console.log("useEffect");

    !state && console.log(state);
  });

  return (
    <header>
      <Link href="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {state.user ? (
          <>
            <Link href="/post/create">Create new post</Link>
            <button onClick={handleClick}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
