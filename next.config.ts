import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://cdn.sanity.io/images/**'),
      new URL('https://refine-theme-modern.myshopify.com/cdn/**')
    ]
  }
};

export default nextConfig;
