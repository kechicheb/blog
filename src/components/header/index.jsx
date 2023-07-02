"use client";
import { useAuthContext } from "@/src/hooks/useAuthContext";
import { useLogout } from "@/src/hooks/useLogout";
import Link from "next/link";

export default async function Header() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <Link href="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {user && (
          <>
            <Link href="/post/create">Create new post</Link>
            <button onClick={handleClick}>Logout</button>
          </>
        )}
        {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
