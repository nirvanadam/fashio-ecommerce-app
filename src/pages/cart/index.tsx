import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { getCartItems } from "../../../lib/getCartItems";

interface CartItem {
  productId: string;
  name: string;
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

  // Total harga semua item
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (loading) {
    return <div className="p-4">Loading keranjang...</div>;
  }

  console.log(cartItems);
  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Keranjang Belanja</h1>
      {cartItems.length === 0 ? (
        <p>Keranjang masih kosong.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li
              key={`${item.productId}-${item.size}`}
              className="rounded-lg border p-4 shadow-sm"
            >
              <p className="font-semibold">{item.name}</p>
              <p>Ukuran: {item.size}</p>
              <p>Jumlah: {item.quantity}</p>
              <p>Harga: Rp {item.price.toLocaleString()}</p>
              <p className="font-medium">
                Subtotal: Rp {(item.price * item.quantity).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 border-t p-4">
        <h2 className="text-lg font-semibold">Total Harga:</h2>
        <p className="text-xl font-bold text-green-600">
          Rp {totalPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
