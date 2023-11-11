/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: { "*.svg": ["@svgr/webpack"] },
    },
  },
};

module.exports = nextConfig;
