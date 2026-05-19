import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "pub.dev" }],
  },
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
