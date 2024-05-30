const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.apimo.pro", "api.apimo.pro","images.unsplash.com"],
  },
};

module.exports = withNextIntl(nextConfig);
