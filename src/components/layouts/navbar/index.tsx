import {
  HouseIcon,
  List,
  ShoppingCartIcon,
  StoreIcon,
  User,
} from "lucide-react";

export default function Navbar() {
  return (
    <div className="fixed bottom-0 left-0 z-[100] flex w-full items-center justify-evenly gap-3 border-t border-gray-300 bg-white py-5 lg:hidden">
      <button className="flex flex-col items-center justify-center gap-2">
        <HouseIcon size={20} color="#000000" />
        <h1 className="text-xs font-medium">Home</h1>
      </button>
      <button className="flex flex-col items-center justify-center gap-2">
        <StoreIcon size={20} color="#000000" />
        <h1 className="text-xs font-medium">Products</h1>
      </button>
      <button className="flex flex-col items-center justify-center gap-2">
        <List size={20} color="#000000" />
        <h1 className="text-xs font-medium">Category</h1>
      </button>
      <button className="flex flex-col items-center justify-center gap-2">
        <ShoppingCartIcon size={20} color="#000000" />
        <h1 className="text-xs font-medium">Cart</h1>
      </button>
      <button className="flex flex-col items-center justify-center gap-2">
        <User size={20} color="#000000" />
        <h1 className="text-xs font-medium">Account</h1>
      </button>
    </div>
  );
}
