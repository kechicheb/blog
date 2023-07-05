"use client";
import { useRouter } from "next/navigation";
import { createContext, useReducer, useEffect } from "react";
import Cookies from "universal-cookie";

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContext = createContext({ state: null, dispatch: () => null });

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  const router = useRouter();
  useEffect(async () => {
    const cookies = new Cookies();
    const token = cookies.get("token") ?? null;
    if (token == null) localStorage.removeItem("user");
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
    if (!token) router.push("/login");
    
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
