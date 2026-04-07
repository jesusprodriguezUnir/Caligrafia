import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { 
    unoptimized: true, 
    qualities: [100, 75],
  }, // Required for Next.js static export
};

export default nextConfig;
