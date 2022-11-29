/** @type {import('next').NextConfig} */
const path = require('path');
const securityHeaders = require('./headers');

const nextConfig = {
  images: {
    loader: 'custom'
  },
  reactStrictMode: true,
  basePath: '',
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders
      }
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    exportPathMap: []
  }
};

module.exports = nextConfig;
