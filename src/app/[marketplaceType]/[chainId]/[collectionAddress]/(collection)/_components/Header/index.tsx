import MarketCollectionHeader from './market/collection-header';
import { ShopCollectionHeader } from './shop/collection-header';
import { MarketplaceType } from '@0xsequence/marketplace-sdk';

export const CollectionHeader = ({
  marketplaceType,
  chainId,
  collectionAddress,
}: {
  marketplaceType: MarketplaceType;
  chainId: number;
  collectionAddress: string;
}) => {
  if (marketplaceType === 'market') {
    return <MarketCollectionHeader />;
  }
  return (
    <ShopCollectionHeader
      chainId={chainId}
      collectionAddress={collectionAddress}
    />
  );
};
