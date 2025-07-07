import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://placehold.co/")],
    domains: ["placehold.co"],
  },
};

export default withNextIntl(nextConfig);
