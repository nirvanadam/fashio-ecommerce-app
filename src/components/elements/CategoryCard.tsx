import Link from "next/link";
import React from "react";

type CategoryCardProps = {
  title: string;
  image: string;
  style: string;
  category: string;
};

function CategoryCard({ title, style, image, category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category}`}
      style={{ backgroundImage: `url(${image})` }}
      className={`${style} relative flex w-full flex-col items-center justify-center gap-5 bg-gray-100 bg-cover px-5 py-7 before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-black before:opacity-50 sm:px-8 sm:py-10`}
    >
      <h1 className="absolute text-center text-2xl font-medium text-white uppercase lg:text-3xl 2xl:text-4xl">
        {title}
      </h1>
    </Link>
  );
}

export default CategoryCard;
