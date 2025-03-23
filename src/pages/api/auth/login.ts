import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const SECRET_KEY = "my_secret_key";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(200).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  //   Dummy user
  const user = { id: 1, email: "user@gmail.com", password: "123" };

  if (email !== user.email || password !== user.password) {
    return res.status(401).json({ message: "Email atau password salah" });
  }

  //   Buat token JWT
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return res.status(200).json({ token });
}
