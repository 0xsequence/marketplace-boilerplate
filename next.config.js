/** @type {import("next").NextConfig} */
const config = {
  typedRoutes: false,
  transpilePackages: [
    '@0xsequence/marketplace-sdk',
    '@0xsequence/design-system',
  ],
  webpack: (nextConfig, { webpack, nextRuntime }) => {
    nextConfig.resolve.alias['@react-native-async-storage/async-storage'] =
      false;

    if (nextRuntime === 'edge') {
      nextConfig.plugins.push(
        new webpack.BannerPlugin({
          banner: `
if (typeof globalThis !== 'undefined') {
  const localStoragePolyfill = globalThis.localStorage || {
    getItem() { return null; },
    setItem() {},
    removeItem() {},
    clear() {},
    key() { return null; },
    get length() { return 0; }
  };

  if (!globalThis.localStorage) {
    Object.defineProperty(globalThis, 'localStorage', {
      value: localStoragePolyfill,
      writable: false,
      configurable: true,
      enumerable: true,
    });
  }

  if (!globalThis.navigator) {
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (compatible; Next.js edge runtime)',
        platform: 'MacIntel',
        language: 'en-US',
        languages: ['en-US', 'en'],
      },
      writable: false,
      configurable: true,
      enumerable: true,
    });
  }
}
          `.trim(),
          raw: true,
          entryOnly: true,
        }),
      );
    }

    return nextConfig;
  },
};

export default config;
