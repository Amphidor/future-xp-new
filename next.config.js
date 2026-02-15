/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do not use output: "export" – app uses API routes (user/me, career_cards, swipeCard, etc.) which need a Node server.
  // For Amplify: use SSR (Node) or attach a backend; for static hosting, proxy API calls to your backend from the client.
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
