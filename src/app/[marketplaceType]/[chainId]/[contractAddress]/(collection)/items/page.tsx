'use client';

import useMarketplaceCollection from '~/hooks/use-marketplace-collection';
import type { MarketplaceType } from '~/types';

import { MarketContent } from './market-content';
import { ShopContent } from './shop-content';
import { useParams } from 'next/navigation';
import type { Address } from 'viem';

const CollectionPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { marketplaceType } = useParams() as {
    marketplaceType: MarketplaceType;
  };

  if (marketplaceType === 'market') {
    return <MarketContent />;
  }

  if (marketplaceType === 'shop') {
    return <CollectionShopContent />;
  }

  return <div>Invalid marketplace type</div>;
};

const CollectionShopContent = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const { data: shopCollection, isError: shopCollectionError } =
    useMarketplaceCollection('shop');

  if (shopCollectionError || !shopCollection) {
    return <div>Error</div>;
  }

  const salesContractAddress = params.contractAddress as Address;
  const itemsContractAddress = shopCollection?.itemsAddress;

  return (
    <ShopContent
      chainId={chainId}
      salesContractAddress={salesContractAddress}
      itemsContractAddress={itemsContractAddress}
      shopCollection={shopCollection}
    />
  );
};

export default CollectionPage;

export const runtime = 'edge';
