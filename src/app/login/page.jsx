"use client";
import { useUserContext } from "@/src/hooks/userContext";
import domain from "@/src/utils/config";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userInfo, setUserInfo } = useUserContext();
  async function login(ev) {
    ev.preventDefault();
    const res = await fetch(`${domain}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const user = await res.json();
    const { success } = user;

    if (success) {
      setUserInfo(user);
      const nextUrl = searchParams.get("next");
      router.push(nextUrl ?? "/");
      router.refresh();
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
