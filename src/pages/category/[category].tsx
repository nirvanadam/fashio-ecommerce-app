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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  useEffect(() => {
    const productSection = document.getElementById("top");
    if (productSection) {
      productSection.scrollIntoView({ behavior: "auto" });
    }
  }, [currentPage]);

  return (
    <div>
      <header
        id="top"
        className="relative mt-20 flex flex-col items-center text-center md:mt-32"
      >
        <span className="absolute -top-5 h-[2px] w-[120px] bg-black md:-top-7" />
        <h1 className="text-4xl font-medium uppercase sm:text-5xl">
          {category === "all" ? "All Products" : category}
        </h1>
        <p className="text-text-secondary mt-5 font-medium md:text-lg lg:w-2/3">
          Lorem ipsum dolor sit amet consectetur adipiscing elit eu et posuere
          feugiat pellentesque curabitur purus in massa dolor sit amet.
        </p>
      </header>

      <main className="mt-20 grid-cols-[0.8fr_3fr] lg:mt-28 lg:grid lg:gap-10">
        <section className="grid grid-cols-2 gap-3 gap-y-10 lg:order-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayProducts.length > 0 ? (
            displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                name={product.name}
                subname={product.subname}
                price={product.price}
              />
            ))
          ) : (
            <div className="animate-pulse">
              <div className="flex items-center justify-center overflow-hidden bg-gray-100">
                <div className="h-[300px] w-full bg-gray-200" />
              </div>

              <h1 className="mt-5 h-[15px] w-full bg-gray-200"></h1>
              <p className="mt-1 h-[15px] w-full bg-gray-200"></p>

              <h1 className="mt-2 h-[15px] w-1/2 bg-gray-200"></h1>
            </div>
          )}
        </section>

        <aside className="mt-16 lg:order-1 lg:mt-0">
          <h1 className="border-b border-gray-300 pb-4 text-lg uppercase">
            Sort by Category
          </h1>

          <nav className="text-text-secondary mt-5 grid grid-cols-2 gap-3 uppercase lg:grid-cols-1">
            <Link
              href="/category/all"
              className={`${category === "all" ? "border-black font-medium text-black" : "border-transparent"} border-l-2 pl-3 transition hover:text-black`}
            >
              All
            </Link>
            <Link
              href="/category/tops"
              className={`${category === "tops" ? "border-black font-medium text-black" : "border-transparent"} border-l-2 pl-3 transition hover:text-black`}
            >
              Tops
            </Link>
            <Link
              href="/category/pants"
              className={`${category === "pants" ? "border-black font-medium text-black" : "border-transparent"} border-l-2 pl-3 transition hover:text-black`}
            >
              Pants
            </Link>
            <Link
              href="/category/shoes"
              className={`${category === "shoes" ? "border-black font-medium text-black" : "border-transparent"} border-l-2 pl-3 transition hover:text-black`}
            >
              Shoes
            </Link>
            <Link
              href="/category/jackets"
              className={`${category === "jackets" ? "border-black font-medium text-black" : "border-transparent"} border-l-2 pl-3 transition hover:text-black`}
            >
              Jacket
            </Link>
            <Link
              href="/category/hoodies"
              className={`${category === "hoodies" ? "border-black font-medium text-black" : "border-transparent"} border-l-2 pl-3 transition hover:text-black`}
            >
              Hoodie
            </Link>
          </nav>
        </aside>
      </main>

      {/* Navigasi Pagination */}
      <div className="mt-4 flex justify-center space-x-4">
        <button
          className="cursor-pointer rounded-md bg-gray-300 px-4 py-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span className="text-lg font-bold">
          {currentPage} / {totalPages}
        </span>
        <button
          className="cursor-pointer rounded-md bg-gray-300 px-4 py-2"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllProduct;
