import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@/types/products";

const products: Product[] = [
  {
    id: 1,
    name: "Nike Rise 365 Run Energy",
    subname: "Men's Short-Sleeve Running Top",
    price: 599000,
    image: "/images/products/tshirt1.png",
    category: "tops",
    description:
      "A legendary competitor and record-holder, Steve Prefontaine is considered one of the most legendary runners in history. Celebrate this trailblazer of the sport with the Rise 365 running top. Breathable and sweat-wicking, it's designed to help you stay cool while keeping Pre's spirit alive.",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const product = products.find(
    (product) => product.id === parseInt(id as string),
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json(product);
}
