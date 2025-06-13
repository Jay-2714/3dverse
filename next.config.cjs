/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Resolve React to a single instance to prevent duplicate React errors
    config.resolve.alias = {
      ...config.resolve.alias,
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
    };
    
    // Add externals for server-side rendering
    if (isServer) {
      config.externals = {
        ...config.externals,
        react: 'react',
        'react-dom': 'react-dom',
      };
    }
    
    // Ensure consistent module resolution
    config.resolve.modules = ['node_modules'];
    
    return config;
  },
  // Ensure proper module resolution in Docker
  experimental: {
    esmExternals: 'loose',
    optimizeCss: false // Disable CSS optimization that can cause issues in Docker
  },
  // Add output configuration for better Docker compatibility
  output: 'standalone',
  // Disable telemetry
  telemetry: false,
  // Optimize for development
  swcMinify: true,
  // Ensure proper hydration
  reactStrictMode: true
};

export default nextConfig;
