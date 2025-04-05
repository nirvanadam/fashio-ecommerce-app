import { Product } from "@/types/typeProducts";
import withAuth from "@/hoc/withAuth";
import { ChevronDown, ChevronUp } from "lucide-react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";
import { addToCart } from "../../../lib/addToCart";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  user_id: string;
}

function DetailProducts({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Silakan login terlebih dahulu.");
        return;
      }

      const decoded = jwtDecode<DecodedToken>(token);
      const userId = decoded.user_id;

      await addToCart(userId, product, quantity, size);
      alert("Produk berhasil ditambahkan ke keranjang!");
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan ke keranjang");
    }
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="">
      <header className="-mx-5 mt-5 mb-20 flex items-center gap-3 bg-gray-100 px-5 py-3 uppercase sm:px-7 sm:py-5 lg:-mx-16 lg:px-16 xl:-mx-24 xl:px-24 2xl:-mx-64 2xl:px-64">
        <Link href="/" className="text-sm font-bold tracking-widest">
          Home
        </Link>
        <span className="font-bold text-gray-300">/</span>
        <Link
          href={`/category/${product?.category}`}
          className="text-sm font-bold tracking-widest"
        >
          {product?.category}
        </Link>
        <span className="font-bold text-gray-300">/</span>
        <h1 className="text-text-secondary truncate text-sm font-bold tracking-widest">
          {product?.name}
        </h1>
      </header>

      <main className="grid-cols-[2fr_1fr] items-center gap-16 lg:grid">
        <figure className="mx-auto w-full gap-3 sm:grid sm:grid-cols-4">
          <Image
            src={product?.image || ""}
            alt=""
            width={500}
            height={500}
            className="w-full sm:order-1 sm:col-span-3"
          />

          <div className="mt-3 grid grid-cols-3 gap-3 sm:mt-0 sm:flex sm:flex-col">
            <Image
              src={product?.image || ""}
              alt=""
              width={500}
              height={500}
              className=""
            />

            <Image
              src={product?.image || ""}
              alt=""
              width={500}
              height={500}
              className=""
            />

            <Image
              src={product?.image || ""}
              alt=""
              width={500}
              height={500}
              className=""
            />
          </div>
        </figure>

        <main>
          <section className="mt-12 lg:mt-0">
            <article>
              <h1 className="text-xl font-medium md:text-2xl">
                {product?.name}
              </h1>
              <h2 className="text-text-secondary font-medium md:text-lg">
                {product?.subname}
              </h2>
              <p className="mt-5 font-medium">{product?.description}</p>
              <h1 className="mt-5 text-xl font-semibold md:mt-7">
                Rp {product?.price.toLocaleString("id-ID")}
              </h1>
            </article>

            <form action="" className="mt-10 flex flex-col">
              <div className="flex gap-10">
                <div className="relative flex-1">
                  <span
                    className={`${quantity === 10 ? "block" : "hidden"} absolute -top-5 left-0 text-xs font-semibold text-red-500`}
                  >
                    Max Ammount
                  </span>
                  <input
                    type="number"
                    defaultValue={1}
                    value={quantity}
                    min="1"
                    className="w-full border-b pb-3 text-lg font-medium outline-none"
                  />

                  <div className="absolute top-0 right-0 flex flex-col">
                    <button type="button">
                      <ChevronUp
                        size={16}
                        onClick={() =>
                          setQuantity((prev) =>
                            Math.max(1, Math.min(10, prev + 1)),
                          )
                        }
                      />
                    </button>

                    <button type="button">
                      <ChevronDown
                        size={16}
                        onClick={() =>
                          setQuantity((prev) =>
                            Math.max(1, Math.min(10, prev - 1)),
                          )
                        }
                      />
                    </button>
                  </div>
                </div>

                <div className="relative w-full flex-2">
                  <select
                    name="size"
                    id="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full appearance-none border-b border-black pb-3 text-lg font-semibold uppercase outline-none"
                  >
                    <option value="" className="font-semibold">
                      SELECT SIZE
                    </option>
                    <option value="S" className="font-semibold">
                      S
                    </option>
                    <option value="M" className="font-semibold">
                      M
                    </option>
                    <option value="L" className="font-semibold">
                      L
                    </option>
                    <option value="XL" className="font-semibold">
                      XL
                    </option>
                    <option value="XXL" className="font-semibold">
                      XXL
                    </option>
                  </select>
                  <ChevronDown size={16} className="absolute top-1 right-0" />
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="mt-7 cursor-pointer bg-black py-5 text-lg font-medium text-white uppercase"
              >
                Add To Cart
              </button>
            </form>
          </section>
        </main>
      </main>
    </div>
  );
}

export default withAuth(DetailProducts);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    // Ambil data produk dari Firestore
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return { notFound: true };
    }

    return {
      props: { product: { id: productSnap.id, ...productSnap.data() } },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      props: { product: null },
    };
  }
};
