import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.shields.io',
        port: '',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/llms.txt',
        destination: '/en/llms.txt',
      },
      {
        source: '/llms-full.txt',
        destination: '/en/llms-full.txt',
      },
      {
        source: '/:lang/docs/:path*.txt',
        destination: '/:lang/llms.txt/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default withMDX(config);
