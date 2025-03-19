import ProductCard from "@/components/elements/ProductCard";
import { Product } from "@/types/products";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function AllProduct() {
  const router = useRouter();
  const { category } = router.query;

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  let titleHeader = "";

  if (category === "all") {
    titleHeader = "All Products";
  } else if (category === "tops") {
    titleHeader = "Tops";
  } else if (category === "pants") {
    titleHeader = "Pants";
  } else if (category === "shoes") {
    titleHeader = "Shoes";
  } else if (category === "jacket") {
    titleHeader = "Jacket";
  }

  return (
    <div>
      <header className="relative mt-20 flex flex-col items-center text-center md:mt-32">
        <span className="absolute -top-5 h-[2px] w-[120px] bg-black md:-top-7" />
        <h1 className="text-4xl font-medium uppercase sm:text-5xl">
          {titleHeader}
        </h1>
        <p className="text-text-secondary mt-5 font-medium md:text-lg lg:w-2/3">
          Lorem ipsum dolor sit amet consectetur adipiscing elit eu et posuere
          feugiat pellentesque curabitur purus in massa dolor sit amet.
        </p>
      </header>

      <main className="mt-20 grid-cols-[0.8fr_3fr] lg:mt-28 lg:grid lg:gap-10">
        <section className="grid grid-cols-2 gap-3 gap-y-10 lg:order-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                subname={product.subname}
                price={product.price}
              />
            ))
          ) : (
            <h2 className="self-center justify-self-center">Product kosong</h2>
          )}
        </section>

        <aside className="mt-16 lg:order-1 lg:mt-0">
          <h1 className="border-b border-gray-300 pb-4 text-lg uppercase sm:text-xl">
            Sort by Category
          </h1>

          <nav className="text-text-secondary mt-5 grid grid-cols-2 gap-3 uppercase lg:grid-cols-1">
            <Link
              href="/category/all"
              className={`${category === "all" ? "border-black font-medium text-black" : "border-transparent"} border-l-2 pl-3`}
            >
              All
            </Link>
            <Link
              href="/category/tops"
              className={`${category === "tops" ? "border-black font-medium text-black" : "border-transparent"} border-l-2 pl-3`}
            >
              Tops
            </Link>
            <Link
              href="/category/pants"
              className={`${category === "pants" ? "border-black font-medium text-black" : "border-transparent"} border-l-2 pl-3`}
            >
              Pants
            </Link>
            <Link
              href="/category/shoes"
              className={`${category === "shoes" ? "border-black font-medium text-black" : "border-transparent"} border-l-2 pl-3`}
            >
              Shoes
            </Link>
            <Link
              href="/category/jackets"
              className={`${category === "jackets" ? "border-black font-medium text-black" : "border-transparent"} border-l-2 pl-3`}
            >
              Jacket
            </Link>
            <Link
              href="/category/hoodies"
              className={`${category === "hoodies" ? "border-black font-medium text-black" : "border-transparent"} border-l-2 pl-3`}
            >
              Hoodie
            </Link>
          </nav>
        </aside>
      </main>
    </div>
  );
}

export default AllProduct;
