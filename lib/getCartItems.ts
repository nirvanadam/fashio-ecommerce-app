import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface CartItem {
  productId: string;
  name: string;
  subname: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
}

export const getCartItems = async (userId: string): Promise<CartItem[]> => {
  if (!userId) {
    throw new Error("User belum login.");
  }

  const itemsRef = collection(db, "carts", userId, "items");

  try {
    const querySnapshot = await getDocs(itemsRef);

    const items: CartItem[] = [];

    querySnapshot.forEach((doc) => {
      items.push(doc.data() as CartItem);
    });

    return items;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Gagal mengambil data keranjang:", error.message);
      throw new Error("Gagal mengambil isi keranjang");
    } else {
      throw new Error(
        "Terjadi kesalahan tidak terduga saat mengambil keranjang",
      );
    }
  }
};
