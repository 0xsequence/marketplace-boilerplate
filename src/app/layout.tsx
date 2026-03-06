import '~/styles/globals.css';

import { MarketplaceProvider } from './marketplace-context';
import { ssrClient } from './marketplace-sdk/ssr';
import Providers, { type InitialState } from './providers';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ssr = await ssrClient();
  const initialState = (await ssr.getInitialState()) as InitialState;
  const marketplaceConfig = await ssr.getMarketplaceConfig();
  const marketplaceEnabled =
    marketplaceConfig.shop.enabled || marketplaceConfig.market.enabled;
  const { faviconUrl, fontUrl } = marketplaceConfig.settings;

  return (
    <html lang="en">
      <head>
        {faviconUrl ? (
          <>
            <link rel="icon" href={faviconUrl} />
            <link rel="shortcut icon" href={faviconUrl} />
          </>
        ) : null}
        {fontUrl ? <link href={fontUrl} rel="stylesheet" /> : null}
      </head>
      <body>
        <NuqsAdapter>
          <Providers
            sdkInitialState={initialState}
            sdkConfig={ssr.config}
            marketplaceConfig={marketplaceConfig}
          >
            <MarketplaceProvider marketplaceEnabled={marketplaceEnabled}>
              {children}
            </MarketplaceProvider>
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
