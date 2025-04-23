import { ssrClient } from '../marketplace-sdk/ssr';
import { Layout } from './_layout';
import Providers from './_providers';
import { type Metadata } from 'next';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getInitialState, config } = await ssrClient();
  const initialState = await getInitialState();
  const { getMarketplaceConfig } = await ssrClient();
  const marketplaceConfig = await getMarketplaceConfig();
  const { fontUrl, faviconUrl } = marketplaceConfig;

  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        {faviconUrl ? (
          <>
            <link rel="icon" href={faviconUrl} />
            <link rel="shortcut icon" href={faviconUrl} />
          </>
        ) : null}
        {fontUrl ? <link href={fontUrl} rel="stylesheet" /> : null}
      </head>
      <body>
        <Providers sdkInitialState={initialState} sdkConfig={config}>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
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
