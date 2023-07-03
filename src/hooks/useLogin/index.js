"use client";
import { useState } from "react";
import domain from "@/src/utils/config";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../useAuthContext";
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext()
  const router = useRouter();
  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${domain}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      // localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false);
      router.push("/post");
    }
  };

  return { login, isLoading, error };
};
