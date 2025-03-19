import {
  ChevronDown,
  HouseIcon,
  List,
  ShoppingCart,
  ShoppingCartIcon,
  StoreIcon,
  User,
} from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="">
      <nav className="flex items-center justify-between py-5 lg:py-8">
        <Link href="/" className="text-2xl font-medium tracking-widest">
          FASHIO
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          <Link href="#" className="text-sm font-medium uppercase">
            Product
          </Link>

          <button className="group relative flex items-center gap-1">
            <h1 className="text-sm uppercase">Category</h1>
            <ChevronDown size={18} color="#000000" />
            <div className="absolute top-7 left-0 z-100 hidden w-fit flex-col bg-white px-7 py-4 shadow-xl transition group-hover:flex">
              <Link href="#" className="font-medium text-gray-400">
                Tops
              </Link>
              <Link href="#" className="font-medium text-gray-400">
                Pants
              </Link>
              <Link href="#" className="font-medium text-gray-400">
                Shoes
              </Link>
              <Link href="#" className="font-medium text-gray-400">
                Jacket
              </Link>
              <Link href="#" className="font-medium text-gray-400">
                Hoodie
              </Link>
            </div>
          </button>

          <Link href="#" className="text-sm font-medium uppercase">
            <ShoppingCart color="#000000" />
          </Link>

          <Link href="#" className="flex items-center gap-2 uppercase">
            <User color="#000000" />
            <h1 className="text-sm font-medium">Hi, Adam!</h1>
          </Link>
        </div>
      </nav>

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
    </div>
  );
}
