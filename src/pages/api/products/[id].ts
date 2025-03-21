import { NextApiRequest, NextApiResponse } from "next";
import { products } from "@/data/dataProducts";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const product = products.find(
    (product) => product.id === parseInt(id as string),
  );

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Produk tidak ditemukan" });
  }
}
