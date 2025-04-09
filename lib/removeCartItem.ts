import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const removeFromCart = async (
  userId: string,
  productId: string,
  size: string,
) => {
  const docId = `${productId}_${size}`; // penting: sama seperti saat addToCart
  const productRef = doc(db, "carts", userId, "items", docId);

  await deleteDoc(productRef);
};
