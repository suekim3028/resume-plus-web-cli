/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", "env.d.ts"],
  compiler: {
    styledComponents: true,
    emotion: true,
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
