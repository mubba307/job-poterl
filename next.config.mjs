/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Handle lucide-react imports
    config.resolve.alias = {
      ...config.resolve.alias,
      'lucide-react': 'lucide-react',
    };
    
    // Optimize bundle splitting
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      cacheGroups: {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    };
    
    return config;
  },
  // Disable experimental features that might cause issues
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
