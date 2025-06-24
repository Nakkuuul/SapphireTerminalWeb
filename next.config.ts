import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['assets-v2.lottiefiles.com'],
  },
};

export default nextConfig;
