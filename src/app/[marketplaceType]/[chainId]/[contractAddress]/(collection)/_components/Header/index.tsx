import type { MarketplaceType } from '~/types';

import MarketCollectionHeader from './collection-header';
import { ShopCollectionHeader } from './shop/collection-header';

export const CollectionHeader = ({
  marketplaceType,
  chainId,
  collectionAddress,
}: {
  marketplaceType: MarketplaceType;
  chainId: number;
  collectionAddress: string;
}) => {
  if (marketplaceType === 'shop') {
    return (
      <ShopCollectionHeader
        chainId={chainId}
        collectionAddress={collectionAddress}
      />
    );
  }

  return <MarketCollectionHeader />;
};
