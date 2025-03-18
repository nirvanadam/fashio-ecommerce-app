import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductCard() {
  return (
    <Link href="#" className="group overflow-hidden">
      <div className="flex items-center justify-center bg-gray-100 p-7 lg:p-10 2xl:p-14">
        <Image
          width={500}
          height={500}
          src="/images/tshirt_sample.png"
          alt=""
          className="transition duration-300 group-hover:scale-110"
        />
      </div>

      <h1 className="mt-5 text-lg font-medium">Black T-Shirt</h1>
      <p className="text-sm font-medium text-gray-400">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis?
      </p>
      <h1 className="mt-2 text-lg font-medium">Rp 578.000</h1>
    </Link>
  );
}

export default ProductCard;
