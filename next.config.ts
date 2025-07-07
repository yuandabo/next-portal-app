import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://placehold.co/")],
    domains: ["placehold.co"],
  },
};

export default withNextIntl(nextConfig);
