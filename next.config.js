import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Disable source maps in production for better performance
  productionBrowserSourceMaps: false,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' 
      ? { exclude: ['error', 'warn'] } 
      : false,
    // Enable optimization for emotion/styled-components if you use them
    emotion: false,
  },

  // Optimize image handling
  images: {
    deviceSizes: [640, 828, 1200, 1920],  // Reduced sizes
    imageSizes: [16, 32, 64, 96, 128, 256],  // Optimized common sizes
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },

  experimental: {
    // Added optimizations based on your package.json
    optimizePackageImports: [
      'react-icons',
      'framer-motion',
      '@reduxjs/toolkit',
      'react-redux',
      'react-toastify',
      'recharts',
      'lucide-react',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/react-fontawesome'
    ],
    // Enable modern optimization features
    serverActions: {
      bodySizeLimit: '2mb',
    },
// turbo: true,
    optimizeCss: true,
  },

  webpack: (config, { dev, isServer }) => {
    // Development-specific optimizations
    if (dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'named',
        chunkIds: 'named',
        concatenateModules: true,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            default: false,
            vendors: false,
            // Core framework chunks
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|framer-motion|@reduxjs\/toolkit|redux|react-redux)[\\/]/,
              priority: 40,
              chunks: 'all',
              enforce: true,
            },
            // UI component libraries
            ui: {
              name: 'ui-components',
              test: /[\\/]node_modules[\\/](@fortawesome|react-icons|lucide-react|recharts)[\\/]/,
              priority: 35,
              chunks: 'all',
              enforce: true,
            },
            // Other third-party libraries
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name: 'lib',
              priority: 30,
              chunks: 'all',
              minChunks: 2,
            },
            // Your application components
            commons: {
              name: 'commons',
              test: /[\\/]src[\\/]components[\\/]/,
              priority: 20,
              chunks: 'all',
              minChunks: 2,
              reuseExistingChunk: true,
            },
            // Styles
            styles: {
              name: 'styles',
              test: /\.(css|scss|sass)$/,
              chunks: 'all',
              priority: 10,
              enforce: true,
            },
          },
        },
      };
    }

    // Production-specific optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        usedExports: true,
        sideEffects: true,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
      };
    }

    // Add production performance budgets
    config.performance = {
      hints: dev ? false : 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    };

    return config;
  },

  // Environment configuration
  env: {
    APP_ENV: process.env.NODE_ENV,
    ...(process.env.NODE_ENV === 'development' && {
      DEBUG: '*',
      NEXT_TELEMETRY_DEBUG: '1',
    }),
  },
};

export default withBundleAnalyzer(nextConfig);