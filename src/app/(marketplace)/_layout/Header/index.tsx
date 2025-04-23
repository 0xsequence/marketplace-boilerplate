'use server';

import { ssrClient } from '~/app/marketplace-sdk/ssr';
import { cn } from '~/lib/utils';

import { InventoryButton } from './Buttons/InventoryButton';
import MenuButton from './Buttons/MenuButton';
import { Socials } from './Buttons/Socials';
import { WalletButton } from './Buttons/WalletButton';
import { HeaderLogo } from './HeaderLogo';
import { headers } from 'next/headers';

export const Header = async () => {
  const marketplaceConfig = await ssrClient().then((s) =>
    s.getMarketplaceConfig(),
  );

  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const isLandingPage = pathname === '/';

  return (
    <div
      className={cn(
        'h-(--headerHeight) bg-background-primary flex gap-2 p-3 relative border-b border-border-normal',
        'sticky top-0 z-20 w-full',
      )}
    >
      <MenuButton />

      {!isLandingPage && (
        <HeaderLogo
          logoUrl={marketplaceConfig.logoUrl}
          title={marketplaceConfig.title}
        />
      )}

      <Socials socials={marketplaceConfig.socials} />

      <div className="flex-1" />
      <InventoryButton />

      <WalletButton />
    </div>
  );
};
