import { cn } from '~/lib/utils';

import { SocialButton, type SocialPlatform } from './social-button';
import type { MarketplaceConfig } from '@0xsequence/marketplace-sdk';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export const SocialIcons = ({
  socials,
  shouldHideOnMobile = true,
}: {
  socials: MarketplaceConfig['socials'];
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
        ? Object.entries(socials).map(([key, val]) => {
            if (!val) return null;

            return (
              <SocialButton
                key={key}
                social={key as SocialPlatform}
                href={val}
              />
            );
          })
        : null}
    </div>
  );
};

export const Socials = async ({
  socials,
}: {
  socials: MarketplaceConfig['socials'];
}) => {
  return <SocialIcons socials={socials} />;
};
