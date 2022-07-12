/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  future: {
    webpack5: false,
  },
};

module.exports = nextConfig;
