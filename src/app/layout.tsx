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

const NOT_FOUND_DIGEST = 'NEXT_HTTP_ERROR_FALLBACK;404';

const isNotFoundError = (error: unknown) => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    (error as { digest?: string }).digest === NOT_FOUND_DIGEST
  );
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const ssr = await ssrClient();
    const initialState = await ssr.getInitialState();
    const marketplaceConfig = await ssr.getMarketplaceConfig();
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
              sdkConfig={ssr.config}
              marketplaceConfig={marketplaceConfig}
            >
              <MarketplaceProvider marketplaceEnabled={ssr.marketplaceEnabled}>
                <HeaderDrawerProvider>
                  <div className="min-h-screen bg-background-primary">
                    <PreviewBanner
                      projectId={marketplaceConfig.projectId}
                      showPreviewBanner={ssr.showPreviewBanner}
                      builderFEUrl={ssr.builderFEUrl}
                    />

                    <Header />
                    <HeaderDrawerMenu
                      socials={marketplaceConfig.settings.socials}
                    />

                    <div className="min-h-screen">
                      {ssr.marketplaceEnabled ? (
                        children
                      ) : (
                        <DisabledMarketplace />
                      )}
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
  } catch (error) {
    if (isNotFoundError(error)) {
      return (
        <html lang="en">
          <body>{children}</body>
        </html>
      );
    }
    throw error;
  }
}
