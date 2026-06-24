import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.samsclubresources.com",
        pathname: "/is/image/samsclub/**"
      },
      {
        protocol: "https",
        hostname: "i5-mx.walmartimages.com",
        pathname: "/samsmx/images/product-images/**"
      }
    ]
  }
};

export default nextConfig;
