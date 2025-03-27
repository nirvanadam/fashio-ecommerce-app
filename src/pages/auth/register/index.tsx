import axios from "axios";
import { ChevronLeft, Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Password and confirm password must be the same");
      return;
    }

    try {
      const res = await axios.post("/api/auth/register", { email, password });
      setMessage(res.data.message);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.message || "Terjadi kesalahan pada request",
        );
      } else if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Terjadi kesalahan yang tidak diketahui");
      }
    }
  };

  return (
    <div className="-mx-5 h-screen bg-white text-black lg:-mx-16 lg:grid lg:grid-cols-2 xl:-mx-24 2xl:-mx-64">
      <header className="px-7 py-10 pt-32 sm:px-16 md:px-28 lg:content-center lg:justify-items-center lg:bg-black lg:px-0 lg:py-0 lg:text-white">
        <Link
          href="/"
          className="absolute top-10 left-0 bg-black px-3 py-2 lg:hidden"
        >
          <ChevronLeft color="#fff" className="" size={32} />
        </Link>
        <h1 className="w-full text-center text-4xl font-semibold uppercase lg:hidden">
          Register
        </h1>
        <Link
          href="/"
          className="hidden text-5xl font-medium tracking-widest lg:block"
        >
          FASHIO
        </Link>
      </header>

      <main className="px-9 sm:px-16 md:px-28 lg:content-center lg:px-16 xl:px-28 2xl:px-52">
        <h1 className="hidden text-4xl font-semibold uppercase lg:block">
          Register
        </h1>

        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-5 lg:mt-10"
        >
          {message && <p className="text-sm text-red-500">*{message}</p>}

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
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
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full border-2 border-neutral-600 px-4 py-3 font-medium placeholder:font-medium focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              >
                {isPasswordVisible ? <EyeClosed /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-medium">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full border-2 border-neutral-600 px-4 py-3 font-medium placeholder:font-medium focus:outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              >
                {isConfirmPasswordVisible ? <EyeClosed /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-black p-3 text-lg font-semibold text-white"
          >
            Register
          </button>
        </form>

        <div className="relative mt-10 h-[1px] w-full bg-neutral-300">
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm font-medium text-gray-500">
            OR
          </h1>
        </div>

        <div className="mt-10 flex flex-col">
          <button className="relative flex w-full justify-center gap-3 border-2 border-neutral-300 p-3">
            <Image
              src="/images/logo/google.svg"
              width={24}
              height={24}
              alt=""
              className="absolute top-1/2 left-3 -translate-y-1/2"
            />
            <h1 className="font-semibold">Continue with Google</h1>
          </button>
        </div>

        <h1 className="mt-5 text-center text-sm font-medium">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-bold underline">
            Login
          </Link>
        </h1>
      </main>
    </div>
  );
}
