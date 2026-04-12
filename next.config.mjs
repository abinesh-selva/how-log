/** @type {import('next').NextConfig} */
const nextConfig = {
    // Headers for security and caching
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "origin-when-cross-origin",
                    },
                ],
            },
            {
                source: "/date/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, s-maxage=86400, stale-while-revalidate=43200",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
