"use client";

import domain from "@/src/utils/config";
import { useContext } from "react";

import { AuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const { dispatch } = useContext(AuthContext);

  const logout = () => {
    fetch(`${domain}/logout`, {
      credentials: "include",
      method: "POST",
    });
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    router.push("/");
    router.refresh();
  };

  return { logout };
};
