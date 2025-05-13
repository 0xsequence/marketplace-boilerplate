'use client';

import storeConfig from '~/store-config';

import { Text } from '@0xsequence/design-system';
import { MarketplaceConfig } from '@0xsequence/marketplace-sdk';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const LandingPageHeaderLogo = ({
  marketplaceConfig,
}: {
  marketplaceConfig: MarketplaceConfig;
}) => {
  const pathname = usePathname();
  const isMarketLandingPage = pathname === '/market';
  const logoUrl = marketplaceConfig.logoUrl;
  const title = isMarketLandingPage
    ? marketplaceConfig.title
    : storeConfig.shop.name;

  return (
    <Link
      prefetch={false}
      href="/"
      className="flex items-center text-xl font-bold text-secondary"
    >
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          className="h-full max-w-[200px] object-contain"
          alt="Logo"
        />
      ) : (
        <Text className="text-xl" fontWeight="bold">
          {title}
        </Text>
      )}
    </Link>
  );
};
