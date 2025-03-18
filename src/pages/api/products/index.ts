import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@/types/products";

const products: Product[] = [
  {
    id: 1,
    name: "Nike Rise 365 Run Energy",
    subname: "Men's Short-Sleeve Running Top",
    price: 599000,
    image: "/images/products/top1.jpg",
    category: "tops",
    description:
      "A legendary competitor and record-holder, Steve Prefontaine is considered one of the most legendary runners in history. Celebrate this trailblazer of the sport with the Rise 365 running top. Breathable and sweat-wicking, it's designed to help you stay cool while keeping Pre's spirit alive.",
  },
  {
    id: 2,
    name: "Jordan Jumpman",
    subname: "Men's T-Shirt",
    price: 349000,
    image: "/images/products/top2.jpg",
    category: "tops",
    description:
      "Soar out the door in the Jordan Jumpman T-Shirt. It's made from soft, comfortable fabric with an easy and relaxed fit.",
  },
  {
    id: 3,
    name: "Kobe Year of Mamba",
    subname: "Men's Max90 Long-Sleeve T-Shirt",
    price: 569000,
    image: "/images/products/top3.jpg",
    category: "tops",
    description:
      "Celebrate the tradition of the Lunar New Year and pay homage to the Mamba Mentality with the Year of Mamba long-sleeve tee. Designed with a loose fit, it features graphics that reflect the connection between the annual celebration and Kobe's impact on the game.",
  },
  {
    id: 4,
    name: "Nike Dri-FIT Miler",
    subname: "Men's Short-Sleeve Running Top",
    price: 258000,
    image: "/images/products/top4.jpg",
    category: "tops",
    description:
      "The Nike Dri-FIT Miler Men's Running Top helps keep you comfortable in sweat-wicking, breathable fabric. The back mesh panel provides targeted ventilation.",
  },
  {
    id: 5,
    name: "Nike Sportswear",
    subname: "Men's Oversized Long-Sleeve T-Shirt",
    price: 538000,
    image: "/images/products/top5.jpg",
    category: "tops",
    description:
      "Heavy on the comfort, this midweight cotton T-shirt has a structured, spacious fit for plenty of extra room throughout the body.",
  },
  {
    id: 6,
    name: "Nike Club Fleece",
    subname: "Men's Oversized French Terry Trousers",
    price: 949000,
    image: "/images/products/pant1.jpg",
    category: "pants",
    description:
      "Go big on comfort with these spacious Club Fleece trousers. Its midweight, loopback fabric offers a soft-but-breathable feel that's smooth on the outside and soft on the inside.",
  },
  {
    id: 7,
    name: "Nike Challenger",
    subname: "Men's Dri-FIT Woven Running Trousers",
    price: 678000,
    image: "/images/products/pant2.jpg",
    category: "pants",
    description:
      "Based on the running shorts of the same name, the Challenger Trousers step up when you need more coverage for your workout. They're lightweight, breathable and easy to get on and off thanks to their zip cuffs. Located in the centre of the back for comfort while running, the media pocket is big enough for most phones.",
  },
  {
    id: 8,
    name: "Nike SB Kearny",
    subname: "Men's Cargo Skate Trousers",
    price: 1189000,
    image: "/images/products/pant3.jpg",
    category: "pants",
    description:
      "Made from durable Ripstop fabric in a roomy, skate-ready fit, these Nike SB trousers are built to last. The classic cargo design doesn't skimp on storage. With 6 pockets, you'll have plenty of places to keep your essentials secure on and off your board.",
  },
  {
    id: 9,
    name: "Nike SB",
    subname: "Dri-FIT Kearny Cargo Skate Shorts",
    price: 829000,
    image: "/images/products/pant4.jpg",
    category: "pants",
    description:
      "Made from sweat-wicking fabric in a roomy, skate-ready fit, these Nike SB shorts are built for comfort on and off your board. With six pockets to choose from, you'll have plenty of places to keep your essentials.",
  },
  {
    id: 10,
    name: "Nike Dri-FIT Academy",
    subname: "Men's Football Shorts",
    price: 349000,
    image: "/images/products/pant5.jpg",
    category: "pants",
    description:
      "A training go-to, our sweat-wicking Academy Shorts return with a streamlined, lightweight design so you can stay quick on your feet. They're stretchy and breathable to help you get the most out of your moves on the pitch and beyond.",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(products);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
