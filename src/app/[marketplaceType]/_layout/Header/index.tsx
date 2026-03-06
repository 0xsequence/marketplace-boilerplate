import { ssrClient } from '~/app/marketplace-sdk/ssr';

import HeaderClient from './HeaderClient';

export const Header = async () => {
  const { getMarketplaceConfig } = await ssrClient();
  const marketplaceConfig = await getMarketplaceConfig();
  const shopAndMarketEnabled =
    marketplaceConfig.shop.enabled && marketplaceConfig.market.enabled;

  return (
    <HeaderClient
      marketplaceConfig={marketplaceConfig}
      shopAndMarketEnabled={shopAndMarketEnabled}
      showPreviewBanner={false}
    />
  );
};
