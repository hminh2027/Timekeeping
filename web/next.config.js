/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  env: {
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    ROLE: process.env.ROLE,
  },
  images: {
    domains: [
      "localhost",
      "localhost:3000",
      "127.0.0.1",
      "127.0.0.1:3000",
      "https://upload.wikimedia.org/",
    ],
  },
  i18n,
};

module.exports = nextConfig;
