import { useContext, useState } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import domain from "@/src/utils/config";
import { useRouter } from "next/navigation";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const router = useRouter();
  const { dispatch } = useContext(AuthContext);
  const signup = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${domain}/signup`, {
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
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
      router.push("/post");
    }
  };

  return { signup, isLoading, error };
};
