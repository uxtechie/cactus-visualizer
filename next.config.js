/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
    // tailwind breakpoints, min: sm, md, lg, xl, 2xl
    deviceSizes: [640, 768, 1024, 1280, 1536]
  }
}

module.exports = nextConfig
