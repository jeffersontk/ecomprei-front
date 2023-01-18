/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com"],
    formats: ["image/webp"]
  }
}

module.exports = nextConfig
