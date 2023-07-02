"use client";
import { useUserContext } from "@/src/hooks/userContext";
import domain from "@/src/utils/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const { userInfo, setUserInfo } = useUserContext();
  async function login(ev) {
    ev.preventDefault();
    const res = await fetch(`${domain}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const user = await res.json();
    router.push("/post");
    if (user.success) {
      setUserInfo(user);
      setRedirect(true);
      // router.push("/post");
    } else {
      alert("Login failed");
    }
  }
  // if (redirect) router.push("/post");

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
