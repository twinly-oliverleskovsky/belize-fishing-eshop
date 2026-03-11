import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // V dev móde neoptimalizovať lokálne obrázky – rýchlejšie načítanie
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
