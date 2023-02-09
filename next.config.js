/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com", "ik.imagekit.io", "files.stripe.com"],
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/wk5c55kzi/**',
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
      }
    ],
  }
}

module.exports = nextConfig
