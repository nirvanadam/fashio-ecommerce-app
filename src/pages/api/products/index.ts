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
  {
    id: 11,
    name: "Nike Air Force 1 '07",
    subname: "Men's Shoes",
    price: 1549000,
    image: "/images/products/shoe1.jpg",
    category: "shoes",
    description:
      "The radiance lives on in the Nike Air Force 1 '07, the b-ball icon that puts a fresh spin on what you know best: crisp leather, bold colours and the perfect amount of flash to make you shine.",
  },
  {
    id: 12,
    name: "Nike Lunar Roam",
    subname: "Men's Shoes",
    price: 2379000,
    image: "/images/products/shoe2.jpg",
    category: "shoes",
    description:
      "Add a dash of bouncy performance to your lifestyle look with the Lunar Roam. Breezy, lightweight materials pair with supportive Magwire cables and an ultra-plush midsole for laid-back comfort you'll want to wear season after season. Step into this electric edition and make a bold, springy statement—wherever you roam.",
  },
  {
    id: 13,
    name: "Nike G.T. Cut 3 EP",
    subname: "Basketball Shoes",
    price: 3049000,
    image: "/images/products/shoe3.jpg",
    category: "shoes",
    description:
      "How can you separate your game when it's winning time? Start by lacing up in the G.T. Cut 3. Designed to help you create space for stepback jumpers and backdoor cuts, its sticky multi-court traction helps you stop in an instant and shift gears at will. And when you're making all those game-changing plays, the newly added, ultra-responsive ZoomX foam helps keep you fresh for all four quarters. With its extra-durable rubber outsole, this version gives you traction for outdoor courts.",
  },
  {
    id: 14,
    name: "Giannis Immortality 4 EP",
    subname: "Basketball Shoes",
    price: 1199000,
    image: "/images/products/shoe4.jpg",
    category: "shoes",
    description:
      "The Giannis Immortality 4 is for the multi-faceted player. The sleek, supportive heel shape is combined with an upgraded traction pattern from the previous iteration to help keep you making all those game-changing plays. With its extra-durable rubber outsole, this version gives you traction for outdoor courts.",
  },
  {
    id: 15,
    name: "Nike Winflo 11",
    subname: "Men's Road Running Shoes",
    price: 1549000,
    image: "/images/products/shoe5.jpg",
    category: "shoes",
    description:
      "Responsive cushioning provides a balanced ride for everyday runs. Experience energy return with a combination of Cushlon 3.0 foam and a full-length Nike Air unit in the midsole. Plus, an elastic midfoot band and a spacious forefoot provide an accommodating, comfortable fit.",
  },
  {
    id: 16,
    name: "Nike Tech Windrunner",
    subname: "Men's Woven Full-Zip Jacket",
    price: 1799000,
    image: "/images/products/jacket1.jpg",
    category: "jackets",
    description:
      "A fresh take on our signature Windrunner jacket, this version is made from smooth, slightly stretchy woven fabric. It's spacious through the chest, arms and body to give you plenty of room to layer and move. Stretchy drawcords on the hood and hem let you draw up the perfect fit.",
  },
  {
    id: 17,
    name: "Nike Form",
    subname: "Men's Dri-FIT Hooded Versatile Jacket",
    price: 849000,
    image: "/images/products/jacket2.jpg",
    category: "jackets",
    description:
      "Built for running, training and yoga, this stretchy, sweat-wicking jacket is designed to help you stay fresh through your entire workout. Cut with a relaxed feel, this hooded full-zip keeps your essentials close with pocket storage on the way to and from the gym.",
  },
  {
    id: 18,
    name: "Nike Windrunner",
    subname: "Men's Woven Lined Jacket",
    price: 1429000,
    image: "/images/products/jacket3.jpg",
    category: "jackets",
    description:
      "This updated take on the Windrunner is constructed with a smooth and structured woven fabric and is designed to feel relaxed through the body. Pop it on for a classic, lightweight layer.",
  },
  {
    id: 19,
    name: "Jordan Essentials",
    subname: "Men's Jacket",
    price: 938000,
    image: "/images/products/jacket4.jpg",
    category: "jackets",
    description:
      "Looking for lightweight warmth? We've got you. Made with a durable, water-repellent nylon shell and a breathable mesh lining, this roomy jacket helps you zip out wind and rain.",
  },
  {
    id: 20,
    name: "Air Jordan",
    subname: "Men's Button-Down Top",
    price: 1549000,
    image: "/images/products/jacket5.jpg",
    category: "jackets",
    description:
      "Elevate your casual game with Air Jordan. Fashion and function collide in this roomy layer. Water-repellent nylon and lightweight synthetic fill help you stay dry and warm when bad weather threatens your day.",
  },
  {
    id: 21,
    name: "Nike Club Fleece",
    subname: "Men's Oversized French Terry Pullover Hoodie",
    price: 949000,
    image: "/images/products/hoodie1.jpg",
    category: "hoodies",
    description:
      "Go big on comfort with this roomy French terry hoodie. Its midweight, loopback fabric offers a soft-but-breathable feel that's smooth on the outside and soft on the inside.",
  },
  {
    id: 22,
    name: "Nike Project F.R.O.G.",
    subname: "Men's Pullover Hoodie",
    price: 1649000,
    image: "/images/products/hoodie2.jpg",
    category: "hoodies",
    description:
      "This oversized hoodie has a boxy fit with a bit of elastane in the fabric for stretch. A scuba hood with bungee adjusters lets you fine-tune the fit.",
  },
  {
    id: 23,
    name: "Zion",
    subname: "Men's Fleece Pullover Hoodie",
    price: 1129000,
    image: "/images/products/hoodie3.jpg",
    category: "hoodies",
    description:
      "Rep Zion whether you're kicking it with friends off court or practising your free throw. Our midweight brushed fleece feels extra soft on the inside and smooth on the outside to help you stay comfortable while keeping its structured shape.",
  },
  {
    id: 24,
    name: "Jordan Sport Hoop Fleece",
    subname: "Men's Dri-FIT Full-Zip Hoodie",
    price: 1138000,
    image: "/images/products/hoodie4.jpg",
    category: "hoodies",
    description:
      "Suit up in our premium, lightweight fleece. Smooth both inside and out, this hoodie gives you plenty of warmth without adding bulk. Plus, our sweat-wicking Dri-FIT tech helps you stay fresh when things heat up.",
  },
  {
    id: 25,
    name: "Nike Tech",
    subname: "Men's Full-Zip Windrunner Hoodie",
    price: 1159000,
    image: "/images/products/hoodie5.jpg",
    category: "hoodies",
    description:
      "Channelling the energy of Nike's Windrunner jacket, this hoodie has the iconic chevron design on the chest, updated with super-warm, smooth-on-both-sides Tech fleece construction.",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(products);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
