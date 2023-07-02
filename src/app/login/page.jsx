"use client";

import { UserContext } from "@/src/hooks/userContext";
import domain from "@/src/utils/config";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userInfo, setUserInfo } = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    const res = await fetch(`${domain}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const user = await res.json();
      setUserInfo(user);
      const nextUrl = searchParams.get("next");
      router.push(nextUrl ?? "/post");
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
