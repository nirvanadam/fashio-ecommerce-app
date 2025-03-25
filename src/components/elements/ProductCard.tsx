import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductCardProps = {
  id: number;
  name: string;
  subname: string;
  price: number;
  image: string;
};

function ProductCard({ id, name, subname, price, image }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group">
      <div className="flex items-center justify-center overflow-hidden bg-gray-100">
        <Image
          width={500}
          height={500}
          src={image}
          alt=""
          className="transition duration-300 group-hover:scale-110"
        />
      </div>

      <h1 className="mt-5 text-lg font-medium">{name}</h1>
      <p className="text-sm font-medium text-gray-400">{subname}</p>

      <h1 className="mt-2 text-lg font-medium">
        Rp {price.toLocaleString("id-ID")}
      </h1>
    </Link>
  );
}

export default ProductCard;
