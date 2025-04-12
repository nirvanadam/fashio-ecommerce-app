import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { getCartItems } from "../../../lib/getCartItems";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { removeFromCart } from "../../../lib/removeCartItem";
import { updateCartItem } from "../../../lib/updateCartItem";

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
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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

  const handleUpdateQuantity = async (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 10) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode<DecodedToken>(token);
      const userId = decoded.user_id;

      await updateCartItem(userId, item.productId, item.size, newQuantity);

      setCartItems((prev) =>
        prev.map((i) =>
          i.productId === item.productId && i.size === item.size
            ? { ...i, quantity: newQuantity }
            : i,
        ),
      );
    } catch (error) {
      console.error("Gagal update quantity", error);
    }
  };

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

  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  console.log(selectedItems);

  const handleCheckout = () => {
    const itemsToCheckout = cartItems.filter((item) =>
      selectedItems.includes(`${item.productId}_${item.size}`),
    );

    console.log("Items for checkout:", itemsToCheckout);
    // Nanti bisa kirim data ini ke Firebase atau tampilkan halaman ringkasan
  };

  // Total harga semua item
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (loading) {
    return <div className="p-4">Loading keranjang...</div>;
  }

  return (
    <div className="-mx-5 bg-gray-200 lg:-mx-16 xl:-mx-24 2xl:-mx-64">
      <header className="flex h-[6vh] w-full items-center gap-5 bg-black px-3 py-3 text-white">
        <Link href="/">
          <ArrowLeft />
        </Link>
        <h1 className="text-lg font-medium">My Cart</h1>
      </header>

      {cartItems.length === 0 ? (
        <p>Keranjang masih kosong.</p>
      ) : (
        <main className="flex h-[84vh] flex-col gap-3 overflow-y-scroll md:gap-5 lg:mx-40 xl:mx-52 2xl:mx-80">
          {cartItems.map((item) => (
            <article
              key={`${item.productId}_${item.size}`}
              className="grid grid-cols-[0.1fr_1fr_2fr_0.1fr] gap-5 bg-white p-3 lg:p-7 xl:p-10"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(
                  `${item.productId}_${item.size}`,
                )}
                onChange={() =>
                  handleSelectItem(`${item.productId}_${item.size}`)
                }
                className="size-5 self-center"
              />

              <Image
                src={item.image}
                alt=""
                width={500}
                height={500}
                className="self-center rounded-md"
              />

              <div className="">
                <h1 className="font-semibold sm:text-lg">{item.name}</h1>
                <h1 className="mb-2 text-sm font-medium text-gray-400 sm:text-base">
                  {item.subname}
                </h1>

                <h1 className="w-fit bg-gray-200 p-1 text-sm font-medium sm:text-base">
                  Size: {item.size}
                </h1>

                <div className="mt-3 flex w-fit items-center justify-center gap-2 border border-gray-300 font-medium">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item, item.quantity - 1)
                    }
                    className="cursor-pointer border-r border-gray-300 p-1"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="px-2">{item.quantity}</span>

                  <button
                    onClick={() =>
                      handleUpdateQuantity(item, item.quantity + 1)
                    }
                    className="cursor-pointer border-l border-gray-300 p-1"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <p className="mt-5 font-semibold text-red-500 sm:text-lg">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => handleRemove(item.productId, item.size)}
                className="cursor-pointer self-center text-sm text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </article>
          ))}
        </main>
      )}

      <div className="fixed bottom-0 left-0 flex h-[10vh] w-full items-center justify-between border-t border-gray-300 bg-white p-3">
        <div className="flex">
          <h2 className="text-lg font-semibold">Total:</h2>
          <p className="text-xl font-bold text-green-600">
            Rp {totalPrice.toLocaleString()}
          </p>
        </div>

        <button
          disabled={selectedItems.length === 0}
          onClick={() => handleCheckout()}
          className="bg-black px-5 py-3 font-medium text-white disabled:opacity-50"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
