/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https', // Specify the protocol (https)
                hostname: 'res.cloudinary.com', // The hostname for Cloudinary
                pathname: '/**', // The path pattern (can be more specific if needed)
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/home",
                permanent: true,
            },
        ];
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    }
};

export default nextConfig;
