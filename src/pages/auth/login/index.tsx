import { ChevronLeft, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div className="-mx-5 h-screen bg-white text-black lg:-mx-16 xl:-mx-24 2xl:-mx-64">
      <header className="px-7 py-10 pt-32">
        <Link href="/" className="absolute top-10 left-0 bg-black px-3 py-2">
          <ChevronLeft color="#fff" className="" size={32} />
        </Link>
        <h1 className="text-4xl font-medium">Login In</h1>
      </header>

      <main className="px-7">
        <form action="" className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="hello@mail.com"
              className="w-full border-2 border-neutral-600 px-4 py-3 font-medium placeholder:font-medium focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Your password"
                className="w-full border-2 border-neutral-600 px-4 py-3 font-medium placeholder:font-medium focus:outline-none"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2"
              >
                <Eye />
              </button>
            </div>
          </div>

          <Link href="/auth/register" className="my-1 font-medium">
            <h1 className="">Forgot Password?</h1>
          </Link>

          <button className="w-full bg-black p-3 text-lg font-semibold text-white">
            Login
          </button>
        </form>

        <div className="relative mt-10 h-[1px] w-full bg-neutral-600">
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm font-medium">
            OR
          </h1>
        </div>

        <div className="mt-10 flex flex-col">
          <button className="relative flex w-full justify-center gap-3 border border-black p-3">
            <Image
              src="/images/logo/google.svg"
              width={24}
              height={24}
              alt=""
              className="absolute top-1/2 left-3 -translate-y-1/2"
            />
            <h1 className="font-medium">Continue with Google</h1>
          </button>
        </div>
      </main>
    </div>
  );
}
