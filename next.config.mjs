/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['as1.ftcdn.net', 'images.unsplash.com', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    reactRefresh: false, // 🚫 Fast Refresh Disabled
  },
}

export default nextConfig
