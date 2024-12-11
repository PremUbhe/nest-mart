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
        ],
    },
    async redirects() {
        return [
            {
                source: "/", // Match the root path
                destination: "/home", // Redirect to /home
                permanent: true, // Set to true for a 308 permanent redirect
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
