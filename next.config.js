const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Use remotePatterns instead of domains (Next.js 13+)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    // Allow SVG images from placehold.co (they return SVG format)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  // swcMinify is default in Next.js 13+, no need to specify
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
  // Modern JavaScript output for better tree-shaking
  output: 'standalone',
  // Turbopack config (Next.js 16+ uses Turbopack by default)
  // Turbopack handles code splitting automatically, so we don't need webpack config
  turbopack: {},
  // Webpack config for when using --webpack flag (optional, for compatibility)
  webpack: (config, { isServer }) => {
    // Only apply webpack optimizations if not using Turbopack
    // Turbopack handles these optimizations automatically
    if (!isServer && process.env.NEXT_WEBPACK_USAGE) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            reactIcons: {
              name: 'react-icons',
              test: /[\\/]node_modules[\\/]react-icons[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
}

module.exports = nextConfig
