import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Product } from "@/types/typeProducts";

export const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const productsData: Product[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Product, "id">; // Pastikan tipe sesuai
    return { id: doc.id, ...data };
  });

  return productsData;
};
