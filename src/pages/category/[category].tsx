import CategoryCard from "@/components/elements/CategoryCard";
import ProductCard from "@/components/elements/ProductCard";
import { Product } from "@/types/typeProducts";
import axios from "axios";
import { SlidersHorizontal, StepBack, StepForward, X } from "lucide-react";
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
  const itemsPerPage = 16;

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
    // const productSection = document.getElementById("top");
    // if (productSection) {
    //   productSection.scrollIntoView({ behavior: "auto" });
    // }
    window.scrollTo(0, 0);
  }, [startIndex]);
  // Pagination End

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  useEffect(() => {
    setIsCategoryMenuOpen(false);
  }, [category]);

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

      <main className="mt-20 lg:mt-28 lg:grid lg:grid-cols-[0.8fr_3fr] lg:gap-10">
        {/* Cateogory Menu */}
        <aside className="flex items-center justify-between lg:items-start">
          <div className="flex flex-col">
            <h1 className="text-text-secondary text-sm font-medium uppercase">
              {filteredProducts.length} Results
            </h1>

            {/* Desktop Menu */}
            <nav className="text-text-secondary mt-5 hidden grid-cols-2 gap-3 uppercase lg:grid lg:grid-cols-1">
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
          </div>

          <button
            onClick={() => setIsCategoryMenuOpen(true)}
            className="flex items-center gap-2 border border-gray-300 p-2 lg:hidden"
          >
            <h1 className="text-sm font-medium uppercase">Category</h1>
            <SlidersHorizontal size={16} />
          </button>

          {/* Mobile Menu */}
          <nav
            className={`${isCategoryMenuOpen ? "translate-x-0" : "translate-x-full"} fixed top-0 left-0 z-[100] flex h-screen w-full flex-col items-center justify-center gap-3 bg-white px-5 transition md:px-20`}
          >
            <div className="absolute top-0 right-0 flex w-full items-center justify-between px-5 py-5">
              <Link href="/" className="text-2xl font-medium tracking-widest">
                FASHIO
              </Link>
              <button onClick={() => setIsCategoryMenuOpen(false)} className="">
                <X size={36} />
              </button>
            </div>

            <div className="mt-10 flex w-full flex-col gap-3">
              <CategoryCard
                title="All"
                image="/images/assets/hero.jpg"
                category="all"
                style="aspect-auto h-[120px] bg-center"
              />
              <CategoryCard
                title="Tops"
                image="/images/assets/tshirt_category.jpg"
                category="tops"
                style="aspect-auto h-[120px]"
              />
              <CategoryCard
                title="Pants"
                image="/images/assets/pants_category.jpg"
                category="pants"
                style="aspect-auto h-[120px] bg-center"
              />
              <CategoryCard
                title="Shoes"
                image="/images/assets/shoes_category.jpg"
                category="shoes"
                style="aspect-auto h-[120px] bg-center"
              />
              <CategoryCard
                title="Jackets"
                image="/images/assets/jacket_category.jpg"
                category="jackets"
                style="aspect-auto h-[120px] bg-center"
              />
              <CategoryCard
                title="Hoodie"
                image="/images/assets/hoodie_category.jpg"
                category="hoodies"
                style="aspect-auto bg-center h-[120px]"
              />
            </div>
          </nav>
        </aside>

        {/* Product List */}
        <section className="mt-7 lg:mt-0">
          <article className="grid grid-cols-2 gap-3 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
            {displayProducts.length > 0 ? (
              displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
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
          </article>

          {/* Pagination */}
          <nav className="mt-16 flex justify-center gap-5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="cursor-pointer"
            >
              <StepBack size={24} strokeWidth={1.5} />
            </button>

            {[...Array(totalPages)].map((page, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`${currentPage === pageNumber && "border-black bg-black text-white"} h-[40px] w-[40px] cursor-pointer border border-gray-300 font-medium text-black`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="cursor-pointer"
            >
              <StepForward size={24} strokeWidth={1.5} />
            </button>
          </nav>
        </section>
      </main>
    </div>
  );
}

export default AllProduct;
