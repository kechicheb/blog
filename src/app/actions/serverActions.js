"use server";

import domain from "@/src/utils/config";
import { revalidateTag } from "next/cache";

export const createPost = async (data) => {
  let e = true;
  const res = await fetch(`${domain}/post`, {
    method: "POST",
    body: data,
    credentials: "include",
  });
  if (res.ok) e = true;
  else e = false;
  revalidateTag("posts");
  return e;
};
