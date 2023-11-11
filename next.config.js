/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  experimental: {
    turbo: {
      rules: { "*.svg": ["@svgr/webpack"] },
    },
  },
};

module.exports = nextConfig;
