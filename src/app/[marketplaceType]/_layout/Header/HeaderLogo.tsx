'use client';

import { Text } from '@0xsequence/design-system';
import type { MarketplaceConfig } from '@0xsequence/marketplace-sdk';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const LandingPageHeaderLogo = ({
  marketplaceConfig,
}: {
  marketplaceConfig: MarketplaceConfig;
}) => {
  const pathname = usePathname();
  const logoUrl = marketplaceConfig.settings.logoUrl;
  const title = marketplaceConfig.settings.title;
  const landingPagePath = pathname.startsWith('/market') ? '/market' : '/shop';
  return (
    <Link
      prefetch={false}
      href={landingPagePath}
      className="flex items-center text-xl font-bold text-secondary"
    >
      {logoUrl ? (
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
