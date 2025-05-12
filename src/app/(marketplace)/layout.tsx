import { ssrClient } from '../marketplace-sdk/ssr';
import { Footer } from './_layout/Footer';
import { Header } from './_layout/Header';
import HeaderDrawerMenu from './_layout/Header/Drawer';
import { HeaderDrawerProvider } from './_layout/Header/Drawer/HeaderDrawerContext';
import Providers from './_providers';
import { type Metadata } from 'next';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getInitialState, config, getMarketplaceConfig } = await ssrClient();
  const initialState = await getInitialState();
  const marketplaceConfig = await getMarketplaceConfig();
  const { fontUrl, faviconUrl } = marketplaceConfig;
  return (
    <Providers
      sdkInitialState={initialState}
      sdkConfig={config}
      marketplaceConfig={marketplaceConfig}
    >
      {faviconUrl ? (
        <>
          <link rel="icon" href={faviconUrl} />
          <link rel="shortcut icon" href={faviconUrl} />
        </>
      ) : null}
      {fontUrl ? <link href={fontUrl} rel="stylesheet" /> : null}
      <HeaderDrawerProvider>
        <div className="min-h-screen bg-background-primary">
          <Header />
          <HeaderDrawerMenu socials={marketplaceConfig.socials} />

          {children}
          <Footer />
        </div>
      </HeaderDrawerProvider>
    </Providers>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  //   { params }: Props,
  //   const { chainId, collectionAddress } = await params
  const marketplaceConfig = await ssrClient().then((s) =>
    s.getMarketplaceConfig(),
  );

  return {
    title: marketplaceConfig.title,
  };
}
