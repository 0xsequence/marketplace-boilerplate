import { classNames } from '~/config/classNames';
import { ssrClient, config } from '~/sdk-config';
import '~/styles/globals.scss';

import { cn } from '$ui';
import { inter } from '../styles/fonts';
import { Layout } from './_layout';
import { MarketplaceSdkProvider } from '@0xsequence/marketplace-sdk/react';
import type { Metadata } from 'next';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getMarketplaceConfig, getInitialState } = ssrClient();
  const marketPlaceConfig = await getMarketplaceConfig();

  const { fontUrl, cssString, faviconUrl } = marketPlaceConfig;

  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />

        <link rel="icon" href={faviconUrl} />
        <link rel="shortcut icon" href={faviconUrl} />
        {fontUrl ? <link href={fontUrl} rel="stylesheet" /> : null}
        <style>{cssString}</style>
      </head>
      <body className={cn(classNames.themeManager, inter.className)}>
        <MarketplaceSdkProvider
          config={config}
          initialState={await getInitialState()}
        >
          <Layout>{children}</Layout>
        </MarketplaceSdkProvider>
      </body>
    </html>
  );
}

export const generateMetadata = async (): Promise<Metadata> => {
  const { getMarketplaceConfig } = ssrClient();
  const marketplaceConfig = await getMarketplaceConfig();
  return {
    title: {
      template: marketplaceConfig.titleTemplate ?? '%s',
      default: marketplaceConfig.title ?? '',
    },
    description: marketplaceConfig.shortDescription ?? '',
    manifest: marketplaceConfig.manifestUrl,
    twitter: {
      card: 'summary_large_image',
    },
    openGraph: {
      type: 'website',
      title: marketplaceConfig.title ?? '',
      description: marketplaceConfig.shortDescription ?? '',
      images: [
        {
          url: marketplaceConfig.ogImage ?? '',
          alt: marketplaceConfig.title,
        },
      ],
    },
    appleWebApp: {
      title: marketplaceConfig.title,
      statusBarStyle: 'default',
    },
  };
};
