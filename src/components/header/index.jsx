"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import { useLogout } from "@/src/hooks/useLogout";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Header() {
  const { state } = useContext(AuthContext);
  const { logout } = useLogout();
  const pathname = usePathname();
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
        {state.user && pathname.startsWith("/post") ? (
          <>
            <Link href="/post/create">Create new post</Link>
            <a onClick={handleClick}>Logout</a>
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
