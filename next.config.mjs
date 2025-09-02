/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["as1.ftcdn.net", "images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
