'use client';

import { SocialIcons } from './Socials';
import type { MarketplaceConfig } from '@0xsequence/marketplace-sdk';
import { useMarketplaceConfig } from '@0xsequence/marketplace-sdk/react';

const defaultSocials: MarketplaceConfig['settings']['socials'] = {
  twitter: '',
  discord: '',
  website: '',
  tiktok: '',
  instagram: '',
  youtube: '',
};

export const SocialsClient = ({
  shouldHideOnMobile = true,
}: {
  shouldHideOnMobile?: boolean;
}) => {
  const { data: config } = useMarketplaceConfig();
  return (
    <SocialIcons
      socials={config?.settings.socials || defaultSocials}
      shouldHideOnMobile={shouldHideOnMobile}
    />
  );
};
