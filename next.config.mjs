import fs from 'fs';

/** @type {import('next').NextConfig} */
const Config = JSON.parse(
  fs.readFileSync(new URL('./config/config.json', import.meta.url)),
);

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
        pathname: `/${Config.api.uploadsDir}/**`,
      },
    ],
  },
};

export default nextConfig;
