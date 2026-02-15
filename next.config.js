/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // AWS Amplify runs Node on the server; ensure compatibility
  // Uncomment and adjust if you need image domains or rewrites:
  // images: {
  //   domains: ['console.future-xp.com', 'localhost'],
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
