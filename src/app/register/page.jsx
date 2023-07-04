"use client";

import { useSignup } from "@/src/hooks/useSignup";
import { useState } from "react";
export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
const  register = async (ev) =>{
    ev.preventDefault();
    await signup(username, password);
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
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
      <button disabled={isLoading}>Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
