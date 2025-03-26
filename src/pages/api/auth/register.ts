import { NextApiRequest, NextApiResponse } from "next";
import { registerUser } from "../../../../lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    const user = await registerUser(email, password);
    res.status(200).json({ message: "User registered successfully", user });
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Something went wrong";
    res.status(400).json({ message: errMsg });
  }
}
