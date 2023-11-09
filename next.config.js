/** @type {import('next').NextConfig} */

require("dotenv").config();

const { NEXT_PUBLIC_DOMAINS, NODE_ENV } = process.env;
const PROTOCOL = NODE_ENV === "production" ? "https" : "http";

const nextConfig = {
    images: {
        domains: Object.entries(JSON.parse(NEXT_PUBLIC_DOMAINS))
            .map(([slug, domain]) => domain)
    },
    swcMinify: true,
    trailingSlash: true,
    async redirects() {
        return Object.entries(JSON.parse(NEXT_PUBLIC_DOMAINS))
            .map(([slug, domain]) => ({
                source: `/auth/${slug}/:path*`,
                destination: `${PROTOCOL}://${domain}/:path*/`,
                permanent: true
            }));
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    }
};

module.exports = nextConfig;
