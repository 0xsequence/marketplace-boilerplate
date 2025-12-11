import { PreviewBanner } from '~/components/preview-banner';
import '~/styles/globals.css';

import { Footer } from './[marketplaceType]/_layout/Footer';
import { Header } from './[marketplaceType]/_layout/Header';
import HeaderDrawerMenu from './[marketplaceType]/_layout/Header/Drawer';
import { HeaderDrawerProvider } from './[marketplaceType]/_layout/Header/Drawer/header-drawer-context';
import DisabledMarketplace from './disabled-marketplace';
import { MarketplaceProvider } from './marketplace-context';
import { ssrClient } from './marketplace-sdk/ssr';
import Providers, { type InitialState } from './providers';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    marketplaceEnabled,
    config,
    getInitialState,
    getMarketplaceConfig,
    showPreviewBanner,
    builderFEUrl,
  } = await ssrClient();

  const initialState = await getInitialState();
  const marketplaceConfig = await getMarketplaceConfig();
  const { fontUrl, faviconUrl } = marketplaceConfig.settings;

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
            sdkInitialState={initialState as InitialState}
            sdkConfig={config}
            marketplaceConfig={marketplaceConfig}
          >
            <MarketplaceProvider marketplaceEnabled={marketplaceEnabled}>
              <HeaderDrawerProvider>
                <div className="min-h-screen bg-background-primary">
                  <PreviewBanner
                    projectId={marketplaceConfig.projectId}
                    showPreviewBanner={showPreviewBanner}
                    builderFEUrl={builderFEUrl}
                  />

                  <Header />
                  <HeaderDrawerMenu
                    socials={marketplaceConfig.settings.socials}
                  />

                  <div className="min-h-screen">
                    {marketplaceEnabled ? children : <DisabledMarketplace />}
                  </div>

                  <Footer />
                </div>
              </HeaderDrawerProvider>
            </MarketplaceProvider>
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
