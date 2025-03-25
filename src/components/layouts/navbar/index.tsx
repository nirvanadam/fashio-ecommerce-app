import {
  HouseIcon,
  ShoppingCartIcon,
  StoreIcon,
  UserRound,
} from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="">
      <nav className="flex items-center justify-between py-5 lg:py-8">
        <Link href="/" className="text-2xl font-medium tracking-widest">
          FASHIO
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          <Link href="/category/all" className="text-sm font-medium uppercase">
            Products
          </Link>

          <Link href="/category/all" className="text-sm font-medium uppercase">
            Cart
          </Link>

          <Link href="/auth/login">
            <UserRound />
          </Link>
        </div>
      </nav>

      <div className="fixed bottom-0 left-0 z-[100] flex w-full items-center justify-evenly gap-3 border-t border-gray-300 bg-white py-5 lg:hidden">
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-2"
        >
          <HouseIcon size={20} color="#000000" />
          <h1 className="text-xs font-medium">Home</h1>
        </Link>

        <Link
          href="/category/all"
          className="flex flex-col items-center justify-center gap-2"
        >
          <StoreIcon size={20} color="#000000" />
          <h1 className="text-xs font-medium">Products</h1>
        </Link>

        <button className="flex flex-col items-center justify-center gap-2">
          <ShoppingCartIcon size={20} color="#000000" />
          <h1 className="text-xs font-medium">Cart</h1>
        </button>

        <button className="flex flex-col items-center justify-center gap-2">
          <UserRound size={20} color="#000000" />
          <h1 className="text-xs font-medium">Account</h1>
        </button>
      </div>
    </div>
  );
}
