import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["www.nike.com", "picsum.photos"],
  },
};

export default nextConfig;
