'use client';

import { cn } from '~/lib/utils';

import { SocialButton, SOCIAL_PLATFORMS } from './social-button';
import type { MarketplaceConfig } from '@0xsequence/marketplace-sdk';

export const SocialIcons = ({
  socials,
  shouldHideOnMobile = true,
}: {
  socials: MarketplaceConfig['settings']['socials'];
  shouldHideOnMobile?: boolean;
}) => {
  return (
    <div
      className={cn(
        shouldHideOnMobile ? 'hidden md:flex!' : 'flex',
        'h-fit w-fit gap-2',
      )}
    >
      {socials
        ? SOCIAL_PLATFORMS.map((platform) => {
            const url = socials[platform];
            if (!url) return null;

            return <SocialButton key={platform} social={platform} href={url} />;
          })
        : null}
    </div>
  );
};

export const Socials = ({
  socials,
}: {
  socials: MarketplaceConfig['settings']['socials'];
}) => {
  return <SocialIcons socials={socials} />;
};
