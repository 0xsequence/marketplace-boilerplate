/** @type {import("next").NextConfig} */
const config = {
  typedRoutes: false,
  transpilePackages: [
    '@0xsequence/marketplace-sdk',
    '@0xsequence/design-system',
  ],
  webpack: (nextConfig) => {
    nextConfig.resolve.alias['@react-native-async-storage/async-storage'] =
      false;

    return nextConfig;
  },
};

export default config;
