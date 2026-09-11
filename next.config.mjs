/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [
    "@prisma/client",
    "prisma",
    "jsdom",
    "@mozilla/readability",
    "turndown",
    "cheerio"
  ]
};

export default nextConfig;
