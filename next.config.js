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
  },
  env: {
    NEXT_TRACKING_API:'https://api.linketrack.com',
    NEXT_TRACKING_API_USER:'jefferson.britotk@gmail.com',
    NEXT_TRACKING_API_TOKEN:'820f460506c5da59fb52c9e626105dfe54c8b73b26f19882ae9d903b5ffb10c6',
    NEXT_SMTP_USER:"contato@ecomprei.shop",
    NEXT_SMTP_PASSWORD:"Diana08012023",
    NEXT_URL:"https://ecomprei.shop/"
  }
}

module.exports = nextConfig
