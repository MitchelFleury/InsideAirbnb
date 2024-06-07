/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Modify the webpack config here
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    config.module.rules.push({
      test: /\.geojson$/,
      use: ["json-loader"]
    });

    return config;
  },
};

export default nextConfig;
