import { collection, doc, setDoc } from "firebase/firestore";
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

  const cartRef = doc(db, "carts", userId);
  const productRef = doc(collection(cartRef, "items"), product.id);

  const cartItem = {
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity,
    size,
  };

  await setDoc(productRef, cartItem, { merge: true });
};
