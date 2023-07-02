// "use client"
import Link from "next/link";
// import domain from "@/src/utils/config";
import { useAuth } from "@/src/hooks/useAuth";

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
            <Link href="/" >Logout {auth.username}</Link>
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
