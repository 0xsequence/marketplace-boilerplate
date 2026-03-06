import type { MarketplaceType } from '~/types';

import MarketCollectionHeader from './collection-header';
import { ShopCollectionHeader } from './shop/collection-header';

export const CollectionHeader = ({
  marketplaceType,
  chainId,
  collectionAddress,
  showPreviewBanner,
}: {
  marketplaceType: MarketplaceType;
  chainId: number;
  collectionAddress: string;
  showPreviewBanner: boolean;
}) => {
  if (marketplaceType === 'shop') {
    return (
      <ShopCollectionHeader
        chainId={chainId}
        collectionAddress={collectionAddress}
        showPreviewBanner={showPreviewBanner}
      />
    );
  }

  return <MarketCollectionHeader showPreviewBanner={showPreviewBanner} />;
};
