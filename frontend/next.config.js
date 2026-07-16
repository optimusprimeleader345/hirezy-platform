/** @type {import('next').NextConfig} */
process.env.NEXT_PRIVATE_IGNORE_LOCKFILE = '1';
const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';

const nextConfig = {
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      // Legacy paths used by some frontend components
      {
        source: '/pages/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
