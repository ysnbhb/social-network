const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
      return [
        {
          source: "/api/",  // Any request to /api/... will be forwarded
          destination: "http://localhost:8080/",  
        },
      ];
    },
    experimental: {
      serverActions: true,
    },
    experimental: {
      serverActions: {
        bodySizeLimit: '3mb',
      },
    },
  };
export default nextConfig;
