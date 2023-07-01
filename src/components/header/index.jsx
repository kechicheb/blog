import Link from "next/link";

import { useAuth } from "@/src/hooks/useAuth";
import domain from "@/src/utils/config";

export default async function Header() {
  const auth = await useAuth.fromServer();
  // function logout() {
  //   fetch(`${domain}/logout`, {
  //     credentials: "include",
  //     method: "POST",
  //   });
  // }
  return (
    <header>
      <Link href="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {auth && (
          <>
            <Link href="/post/create">Create new post</Link>
            <Link href="/">Logout </Link>
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
