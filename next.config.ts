// next.config.ts
import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src')],
  },
};

export default nextConfig;
