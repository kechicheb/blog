import { destroyCookie } from "next-cookies";

export async function post(req) {
  // Delete the 'token' cookie
  destroyCookie({ res: req.res }, "token");

  return {
    status: 200,
    body: { message: "Cookie deleted" },
  };
}
