/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cloudflare/ai'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        dns: false,
        tls: false,
        fs: false,
        request: false,
      };
    }
    return config;
  },
};

export default nextConfig;