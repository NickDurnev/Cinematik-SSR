/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cloudflare-ipfs.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
