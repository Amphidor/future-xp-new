// const nextConfig = {
//   images: {
//     domains: ['console.germanfy.com', 'localhost'],
//   },
//   async rewrites() {
//     return [
//       {
//         // Forward /api/* requests to backend
//         source: '/api/:path*',
//         destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`
//       },
//       {
//         // Forward /uploads/* to backend for images/files
//         source: '/uploads/:path*',
//         destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/:path*`
//       }
//     ];
//   },
// };

// module.exports = nextConfig;
