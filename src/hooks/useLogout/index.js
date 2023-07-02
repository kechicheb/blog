"use client";

import domain from "@/src/utils/config";
import { useAuthContext } from "../useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    fetch(`${domain}/logout`, {
      credentials: "include",
      method: "POST",
    });
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
