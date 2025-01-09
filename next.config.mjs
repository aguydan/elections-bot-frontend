import fs from 'fs';

const Config = JSON.parse(
  fs.readFileSync(new URL('./config/config.json', import.meta.url)),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
