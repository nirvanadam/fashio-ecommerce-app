import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const users: { email: string; password: string }[] = [];
const SECRET_KEY = "my_secret_key";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password, confirmPassword } = req.body;

  //   Cek apakah email sudah terdaftar
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email sudah terdaftar!" });
  }

  //   Cek apakah password dan confirmPassword sama
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password dan Confirm Password tidak sama!" });
  }

  //   Simpan user
  users.push({ email, password });

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

  return res.status(200).json({ token });
}
