/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' for E2E testing to enable proper dev server
  distDir: '.next',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ensure proper port configuration
  experimental: {
    // Enable any experimental features needed for testing
  },
};

module.exports = nextConfig;
