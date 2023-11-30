/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx"],
  include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", "env.d.ts"],
};

module.exports = nextConfig;
