/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    instrumentationHook: true,
  },
  // Enable Next.js Analytics
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
};

module.exports = nextConfig; 