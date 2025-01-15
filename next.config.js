import bundleAnalyzer from '@next/bundle-analyzer';

// Configure the bundle analyzer
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Next.js configuration
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: true,

  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
    styledComponents: false,
  },

  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    optimizePackageImports: [
      'react-icons',
      'framer-motion',
      '@reduxjs/toolkit',
      'react-redux',
    ],
  },

  webpack: (config, { dev }) => {
    if (dev) {
      if (config.optimization) {
        config.optimization.moduleIds = 'named';
        config.optimization.chunkIds = 'named';
        config.optimization.concatenateModules = true;

        config.optimization.splitChunks = {
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
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|framer-motion)[\\/]/,
              priority: 40,
              chunks: 'all',
              enforce: true,
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name: 'lib',
              priority: 30,
              chunks: 'all',
              minChunks: 2,
            },
            commons: {
              name: 'commons',
              test: /[\\/]src[\\/]components[\\/]/,
              priority: 20,
              chunks: 'all',
              minChunks: 2,
              reuseExistingChunk: true,
            },
            styles: {
              name: 'styles',
              test: /\.(css|scss|sass)$/,
              chunks: 'all',
              priority: 10,
              enforce: true,
            },
          },
        };
      }

      if (config.module?.rules) {
        config.module.rules.push({
          test: /\.(js|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        });
      }
    }

    if (!dev) {
      if (config.optimization) {
        config.optimization.minimize = true;
        config.optimization.usedExports = true;
        config.optimization.sideEffects = true;
      }
    }

    config.performance = {
      hints: dev ? false : 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    };

    return config;
  },

  env: {
    APP_ENV: process.env.NODE_ENV,
  },
};

// Add additional environment variables for development
if (process.env.NODE_ENV === 'development') {
  nextConfig.env = {
    ...nextConfig.env,
    DEBUG: '*',
    NEXT_TELEMETRY_DEBUG: '1',
  };
}

// Export the configuration using ES6 syntax
export default withBundleAnalyzer(nextConfig);
