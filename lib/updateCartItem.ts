import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const updateCartItem = async (
  userId: string,
  productId: string,
  size: string,
  newQuantity: number,
) => {
  const docId = `${productId}_${size}`;
  const itemRef = doc(db, "carts", userId, "items", docId);

  await updateDoc(itemRef, {
    quantity: newQuantity,
  });
};
