/** @type {import('next').NextConfig} */
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const Config = require('./config/config.json');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '**',
      },
      {
        protocol: Config.api.protocol,
        hostname: Config.api.hostname,
        port: Config.api.port,
        pathname: `/${Config.api.pathname}/**`,
      },
    ],
  },
};

export default nextConfig;
