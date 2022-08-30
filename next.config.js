/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      '1.bp.blogspot.com',
      '2.bp.blogspot.com',
      '3.bp.blogspot.com',
      '4.bp.blogspot.com',
      '5.bp.blogspot.com',
      'via.placeholder.com'
    ]
  },
  experimental: {
    images: {
      unoptimized: true
    }
  }
};

module.exports = nextConfig;
