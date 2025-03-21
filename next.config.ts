import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "picsum.photos", protocol: "https", port: "" },
      { hostname: "gravatar.com", protocol: "https", port: "" },
    ],
  },
};

export default nextConfig;

