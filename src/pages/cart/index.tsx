import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { getCartItems } from "../../../lib/getCartItems";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { removeFromCart } from "../../../lib/removeCartItem";

interface CartItem {
  productId: string;
  name: string;
  subname: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
}

interface DecodedToken {
  user_id: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded = jwtDecode<DecodedToken>(token);
        const userId = decoded.user_id;

        const items = await getCartItems(userId);
        setCartItems(items);
      } catch (error) {
        console.error("Gagal mengambil data keranjang:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (productId: string, size: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Silakan login terlebih dahulu.");
        return;
      }

      const decoded = jwtDecode<DecodedToken>(token);
      const userId = decoded.user_id;

      await removeFromCart(userId, productId, size);

      // Refresh list keranjang setelah hapus
      setCartItems((prev) =>
        prev.filter(
          (item) => !(item.productId === productId && item.size === size),
        ),
      );
    } catch (error) {
      console.error("Gagal menghapus item:", error);
      alert("Gagal menghapus item dari keranjang");
    }
  };

  // Total harga semua item
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (loading) {
    return <div className="p-4">Loading keranjang...</div>;
  }

  console.log(cartItems);
  return (
    <div className="pt-16 pb-32">
      <header className="fixed top-0 left-0 mb-5 flex w-full items-center gap-5 bg-black px-3 py-3 text-white">
        <Link href="/">
          <ArrowLeft />
        </Link>
        <h1 className="text-lg font-medium">My Cart</h1>
      </header>

      {cartItems.length === 0 ? (
        <p>Keranjang masih kosong.</p>
      ) : (
        <main className="flex flex-col gap-5">
          {cartItems.map((item) => (
            <article
              key={`${item.productId}-${item.size}`}
              className="grid grid-cols-[1fr_2fr] gap-3 rounded bg-gray-50 p-3 shadow"
            >
              <Image src={item.image} alt="" width={500} height={500} />
              <div className="">
                <h1 className="font-semibold sm:text-lg">{item.name}</h1>
                <h1 className="mb-2 text-sm font-medium text-gray-400 sm:text-base">
                  {item.subname}
                </h1>
                <h1 className="text-sm font-medium sm:text-base">
                  Size: {item.size}
                </h1>
                <h1 className="text-sm font-medium sm:text-base">
                  Qty: {item.quantity}
                </h1>
                <p className="mt-5 font-semibold text-red-500 sm:text-lg">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => handleRemove(item.productId, item.size)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </div>
            </article>
          ))}
        </main>
      )}

      <div className="fixed bottom-0 left-0 mt-6 w-full border-t border-gray-300 bg-white p-4">
        <h2 className="text-lg font-semibold">Total:</h2>
        <p className="text-xl font-bold text-green-600">
          Rp {totalPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
