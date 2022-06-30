/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_URL: "http://localhost:3000/api/",
  },
};

module.exports = nextConfig;
