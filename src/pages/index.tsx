import CategoryCard from "@/components/elements/CategoryCard";
import ProductCard from "@/components/elements/ProductCard";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// Types
import { Product } from "@/types/products";
import axios from "axios";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="before relative -mx-5 flex h-[600px] items-center bg-[url(/images/hero.jpg)] bg-cover bg-[center] text-white lg:-mx-16 lg:h-[85vh] xl:-mx-24 2xl:-mx-64">
        <span className="absolute h-full w-full bg-black opacity-70" />

        <div className="absolute w-full px-5 lg:w-[60%] lg:px-10 xl:w-[65%] xl:px-20 2xl:px-60">
          <h1 className="relative text-4xl leading-[1.3] uppercase sm:text-5xl lg:text-6xl">
            <span className="absolute -top-5 h-[2px] w-1/4 bg-white" />
            Save up to 50% in our winter sale
          </h1>
          <p className="mt-3 xl:text-lg">
            Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
            phasellus mollis sit aliquam sit nullam neque ultrices.
          </p>

          <div className="mt-10 flex flex-col gap-5 uppercase sm:flex-row md:w-[600px] lg:w-full">
            <Link
              href="/"
              className="flex w-full items-center justify-center bg-white px-7 py-5 text-center text-lg font-medium text-black xl:py-7"
            >
              Explore Products
            </Link>
            <Link
              href="/"
              className="flex w-full items-center justify-center border border-white px-7 py-5 text-lg font-medium xl:py-7"
            >
              Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Category Menu Section */}
      <section className="mt-24 sm:mt-32 md:mt-32">
        <header className="items-center justify-between lg:flex">
          <h1 className="relative text-2xl font-medium uppercase lg:text-3xl">
            <span className="absolute -top-4 h-[2px] w-[20%] bg-black sm:w-[15%]" />
            Explore by Category
          </h1>

          <button className="mt-5 flex w-full items-center justify-center border border-black px-7 py-4 text-lg font-medium uppercase sm:mt-8 sm:w-fit md:py-5 lg:mt-0">
            All Products
          </button>
        </header>

        <article className="mt-10 gap-5 sm:mt-14">
          <main className="grid grid-cols-2 gap-5">
            <CategoryCard
              category="tops"
              title="Tops"
              image="/images/tshirt_category.jpg"
              style="lg:aspect-video"
            />
            <CategoryCard
              category="pants"
              title="Pants"
              image="/images/pants_category.jpg"
              style="lg:aspect-video"
            />
          </main>

          <main className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-3">
            <CategoryCard
              category="shoes"
              title="Shoes"
              image="/images/shoes_category.jpg"
              style="col-span-2 aspect-video lg:col-span-1 lg:aspect-square lg:bg-[-50px]"
            />
            <CategoryCard
              category="jackets"
              title="Jackets"
              image="/images/jacket_category.jpg"
              style=""
            />
            <CategoryCard
              category="hoodies"
              title="Hoodies"
              image="/images/hoodie_category.jpg"
              style=""
            />
          </main>
        </article>
      </section>

      {/* Hero2 Section */}
      <section className="-mx-5 mt-16 grid grid-cols-1 sm:mt-24 md:mt-32 lg:-mx-16 lg:grid-cols-2 xl:-mx-24 xl:h-[600px] 2xl:-mx-64 2xl:mt-48 2xl:h-[800px]">
        <div className="flex flex-col justify-center bg-black px-6 py-24 sm:items-center lg:items-start lg:px-8 xl:px-24 2xl:px-48">
          <h1 className="relative text-2xl leading-normal font-medium text-white uppercase sm:text-center sm:text-3xl lg:text-left xl:text-4xl 2xl:w-3/4">
            <span className="absolute -top-4 h-[2px] w-[100px] bg-white lg:-top-6" />
            Get 10% Off on Your First Order
          </h1>

          <button className="mt-10 flex w-full items-center justify-center bg-white px-7 py-4 text-lg font-medium uppercase sm:w-fit md:py-5">
            Explore Products
          </button>
        </div>

        <div className="h-[450px] w-full bg-[url(/images/hero2.jpg)] bg-cover xl:h-full xl:bg-[center_-100px]" />
      </section>

      {/* Latest Products Section */}
      <section className="mt-24 sm:mt-32 md:mt-32">
        <header className="items-center justify-between lg:flex">
          <h1 className="relative text-2xl font-medium uppercase lg:text-3xl">
            <span className="absolute -top-4 h-[2px] w-[20%] bg-black sm:w-[15%]" />
            Latest Product
          </h1>

          <button className="mt-5 flex w-full items-center justify-center border border-black px-7 py-4 text-lg font-medium uppercase sm:mt-8 sm:w-fit md:py-5 lg:mt-0">
            All Products
          </button>
        </header>

        <article className="mt-10 grid grid-cols-2 gap-3 gap-y-10 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              subname={product.subname}
              price={product.price}
            />
          ))}
        </article>
      </section>
    </main>
  );
}

export default HomePage;
