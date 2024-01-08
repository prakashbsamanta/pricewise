/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "m.media-amazon.com",
        pathname: "**",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
