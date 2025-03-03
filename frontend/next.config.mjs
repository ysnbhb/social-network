const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*",
      },{
        source: "/uploads/:path*",
        destination: "http://localhost:8080/uploads/:path*",
      },
    ];
  },
  // experimental: {
  //   serverActions: {
  //     bodySizeLimit: "1mb",
  //   },
  // },
};

export default nextConfig; 
