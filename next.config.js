/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com", "ik.imagekit.io"],
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/wk5c55kzi/**',
      },
    ],
  }
}

module.exports = nextConfig
