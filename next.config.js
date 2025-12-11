import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    // typed routes are not supported in turbopack, so we disable them
    // when using turbo during development, but enable them when we use
    // webpack to build the app
    typedRoutes: process.env.TYPED_ROUTES === 'true',
  },
  transpilePackages: [
    '@0xsequence/marketplace-sdk',
    '@0xsequence/design-system',
  ],
  webpack: (config, { isServer, webpack, nextRuntime }) => {
    // Wallet connect requiers localstorage to be defiend, and since sequence/conncect runs the
    // wallet connect connector during init, it needs localastorage to be defined even during build time
    // this is an ugly hack to inject a noop localastorage polyfill during build time and SSR on edge
    // the proper solution is proberly to upgrade to wagmi 3. Wagmi 3 exposes the connectors as peer deps
    // so lazy injecting them should be easier. Also see this issue https://github.com/WalletConnect/walletconnect-monorepo/issues/6841
    // marketd as "not planned" :/
    if (nextRuntime === 'edge') {
      config.plugins.push(
        new webpack.BannerPlugin({
          banner: `
if (typeof globalThis !== 'undefined' && !globalThis.localStorage) {
  const localStoragePolyfill = {
    getItem() { return null; },
    setItem() {},
    removeItem() {},
    clear() {},
    key() { return null; },
    get length() { return 0; }
  };
  Object.defineProperty(globalThis, 'localStorage', {
    value: localStoragePolyfill,
    writable: false,
    configurable: false,
    enumerable: true
  });
  if (typeof global !== 'undefined' && !global.localStorage) {
    Object.defineProperty(global, 'localStorage', {
      value: localStoragePolyfill,
      writable: false,
      configurable: false,
      enumerable: true
    });
  }
}
          `.trim(),
          raw: true,
          entryOnly: true,
        }),
      );
    }

    return config;
  },

  // images: {
  //   loader: 'custom',
  //   loaderFile: './imageLoader.ts',
  // },
};

export default withBundleAnalyzer(
  config,
  // withSentryConfig(config, {
  //   // For all available options, see:
  //   // https://github.com/getsentry/sentry-webpack-plugin#options

  //   org: 'horizon-games-ds',
  //   project: 'marketplace-app-v2',

  //   // Only print logs for uploading source maps in CI
  //   silent: !process.env.CI,

  //   // For all available options, see:
  //   // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  //   // Upload a larger set of source maps for prettier stack traces (increases build time)
  //   widenClientFileUpload: true,

  //   // Automatically annotate React components to show their full name in breadcrumbs and session replay
  //   reactComponentAnnotation: {
  //     enabled: true,
  //   },

  //   // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  //   // This can increase your server load as well as your hosting bill.
  //   // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  //   // side errors will fail.
  //   tunnelRoute: '/monitoring',

  //   // Hides source maps from generated client bundles
  //   hideSourceMaps: true,

  //   // Automatically tree-shake Sentry logger statements to reduce bundle size
  //   disableLogger: true,

  //   // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  //   // See the following for more information:
  //   // https://docs.sentry.io/product/crons/
  //   // https://vercel.com/docs/cron-jobs
  //   automaticVercelMonitors: true,
  // }),
);
