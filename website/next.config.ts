import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:lang/docs/:path*.txt',
        destination: '/:lang/llms.txt/:path*',
      },
    ];
  },
};

export default withMDX(config);
