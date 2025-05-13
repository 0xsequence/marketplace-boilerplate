import { ssrClient } from '~/app/marketplace-sdk/ssr';
import { cn } from '~/lib/utils';
import storeConfig from '~/store-config';

import { InventoryButton } from './Buttons/InventoryButton';
import MenuButton from './Buttons/MenuButton';
import { Socials } from './Buttons/Socials';
import { WalletButton } from './Buttons/WalletButton';
import { HeaderLink } from './HeaderLink';
import { LandingPageHeaderLogo } from './HeaderLogo';

export const Header = async () => {
  const shopAndMarketEnabled =
    storeConfig.shop.enabled && storeConfig.market.enabled;
  const { getMarketplaceConfig } = await ssrClient();
  const marketplaceConfig = await getMarketplaceConfig();

  return (
    <div
      className={cn(
        'h-(--headerHeight) bg-background-primary flex gap-2 p-3 relative border-b border-border-normal',
        'sticky top-0 z-20 w-full',
      )}
    >
      <MenuButton />

      <LandingPageHeaderLogo marketplaceConfig={marketplaceConfig} />

      {shopAndMarketEnabled && (
        <div className="flex gap-6 items-center mx-4!">
          {storeConfig.shop.enabled && (
            <HeaderLink href="/shop">Shop</HeaderLink>
          )}
          {storeConfig.market.enabled && (
            <HeaderLink href="/market">Market</HeaderLink>
          )}
        </div>
      )}

      <Socials socials={marketplaceConfig.socials} />

      <div className="flex-1" />
      <InventoryButton />
      <WalletButton />
    </div>
  );
};
