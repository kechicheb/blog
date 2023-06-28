import jwt from "jsonwebtoken";
const secret = process.env.SECRET;

export function generateToken(payload) {
  console.log(jwt.sign(payload, secret, { expiresIn: "1h" }));
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}
