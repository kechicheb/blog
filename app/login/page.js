"use client";
import { useRouter, useSearchParams } from "next/navigation";
import domain from "@/utils/config";
import { useState } from "react";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  async function login(ev) {
    ev.preventDefault();
    const res = await fetch(`${domain}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const { success } = await res.json();

    if (success) {
      // const nextUrl = searchParams.get("next");
      // router.push(nextUrl ?? "/");
      // router.refresh();
      router.push("/post");
    } else {
      alert("Login failed");
    }
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
