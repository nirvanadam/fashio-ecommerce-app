import { NextApiRequest, NextApiResponse } from "next";
import { products } from "@/data/dataProducts";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(products);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
