import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface Product {
  id: string;
  name: string;
  price: number;
}

export const addToCart = async (
  userId: string,
  product: Product,
  quantity: number,
  size: string,
) => {
  if (!userId)
    throw new Error("You must be logged in to add items to the cart.");

  // Ambil referensi ke dokumen cart item spesifik (produk + ukuran)
  const cartRef = doc(db, "carts", userId);
  const productRef = doc(collection(cartRef, "items"), `${product.id}_${size}`);

  try {
    const docSnap = await getDoc(productRef);

    if (docSnap.exists()) {
      // Jika sudah ada, tambahkan quantity
      const existingData = docSnap.data();
      const newQuantity = existingData.quantity + quantity;

      await setDoc(productRef, {
        ...existingData,
        quantity: newQuantity,
      });
    } else {
      // Jika belum ada, buat item baru
      const cartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        size,
      };

      await setDoc(productRef, cartItem);
    }
  } catch (error: unknown) {
    // Penanganan error yang rapi
    if (error instanceof Error) {
      console.error("Error adding to cart:", error.message);
      throw new Error("Gagal menambahkan ke keranjang");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Terjadi kesalahan tidak terduga");
    }
  }
};
