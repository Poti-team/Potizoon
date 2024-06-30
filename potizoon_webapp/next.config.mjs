/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
        {
            source: '/__/auth/:path*',
            destination: 'https://<project>.firebaseapp.com/__/auth/:path*',
        },
        ]
    },
};

export default nextConfig;
