'use client';

import { useMarketplaceContext } from '~/app/marketplace-context';

import { Socials } from './Buttons/Socials';
import { InventoryButton } from './Buttons/inventory-button';
import MenuButton from './Buttons/menu-button';
import { WalletButton } from './Buttons/wallet-button';
import { HeaderLink } from './HeaderLink';
import { LandingPageHeaderLogo } from './HeaderLogo';
import { cn, type MarketplaceConfig } from '@0xsequence/marketplace-sdk';

type HeaderClientProps = {
  marketplaceConfig: MarketplaceConfig;
  shopAndMarketEnabled: boolean;
  showPreviewBanner: boolean;
};

export default function HeaderClient({
  marketplaceConfig,
  shopAndMarketEnabled,
  showPreviewBanner,
}: HeaderClientProps) {
  const { marketplaceEnabled } = useMarketplaceContext();

  return (
    <div
      className={cn(
        'h-(--headerHeight) bg-background-primary flex gap-2 p-3 relative border-b border-border-normal',
        'sticky top-0 z-20 w-full',
        showPreviewBanner ? 'top-[52px] md:top-10 min-[548px]:margin' : '',
      )}
    >
      <MenuButton />

      <LandingPageHeaderLogo marketplaceConfig={marketplaceConfig} />

      {marketplaceEnabled && (
        <div className="hidden md:flex! gap-6 items-center mx-4!">
          {marketplaceConfig.shop.enabled && (
            <HeaderLink href="/shop" exactMatch={!shopAndMarketEnabled}>
              Shop
            </HeaderLink>
          )}
          {marketplaceConfig.market.enabled && (
            <HeaderLink href="/market" exactMatch={!shopAndMarketEnabled}>
              Market
            </HeaderLink>
          )}
        </div>
      )}

      <Socials socials={marketplaceConfig.settings.socials} />

      <div className="flex-1" />
      {marketplaceEnabled && <InventoryButton />}
      <WalletButton />
    </div>
  );
}
