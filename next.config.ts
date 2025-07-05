import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: '.next',
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
