"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import { useLogout } from "@/src/hooks/useLogout";
import Link from "next/link";

import { usePathname } from "next/navigation";
import Cookies from "universal-cookie";

export default function Header() {
  const { state } = useContext(AuthContext);
  const { logout } = useLogout();
  const pathname = usePathname();
  const handleClick = () => {
    logout();
  };
  const cookies = new Cookies();
  useEffect(() => {
    console.log("useEffect");

    !state && console.log(state);
  });

  return (
    <header className="container">
      <Link href="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {state.user && pathname.startsWith("/post") && cookies.get("token")? (
          <>
            <Link href="/post/create">Create new post</Link>
            <a onClick={handleClick}>Logout</a>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}
