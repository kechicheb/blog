
import Link from "next/link";
import domain from "@/utils/config";
import { useAuth } from "../hooks/useAuth";

export default async function Header() {
  const auth = await useAuth.fromServer();

  function logout() {
    fetch(`${domain}/logout`, {
      credentials: "include",
      method: "POST",
    });
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
