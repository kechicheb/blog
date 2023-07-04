"use client";

import domain from "@/src/utils/config";
import { useContext } from "react";

import { AuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

export const useLogout = () => {
  const router = useRouter();
  const { dispatch } = useContext(AuthContext);

  const logout = () => {
    // // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    const cookies = new Cookies();

    if (cookies.get("token")) {
      cookies.remove("token");
    }
    router.push("/");
    router.refresh();
  };

  return { logout };
};
