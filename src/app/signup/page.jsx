"use client";

import { useSignup } from "@/src/hooks/useSignup";
import { useState } from "react";
export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const Signup = async (ev) => {
    ev.preventDefault();
    await signup(username, password);
  };
  return (
    <form className="signup" onSubmit={ Signup}>
      <h1>Signup</h1>
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
      <button disabled={isLoading}>Signup</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
