'use client';

import storeConfig from '~/store-config';

import { CollectiblesContent } from './collectibles-content';
import { type MarketplaceType, OrderSide } from '@0xsequence/marketplace-sdk';
import {
  useFilterState,
  useListCollectibles,
  useListTokenMetadata,
} from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import type { Hex } from 'viem';

const CollectionPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { marketplaceType } = useParams() as {
    marketplaceType: MarketplaceType;
  };
  if (marketplaceType === 'market') {
    return <MarketContent />;
  }

  return <ShopContent />;
};

const MarketContent = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const { filterOptions, searchText, showListedOnly } = useFilterState();

  const {
    data: collectiblesList,
    fetchNextPage,
    isLoading: collectiblesListLoading,
    error,
  } = useListCollectibles({
    chainId,
    collectionAddress,
    filter: {
      searchText,
      includeEmpty: !showListedOnly,
      properties: filterOptions,
    },
    side: OrderSide.listing,
  });

  return (
    <CollectiblesContent
      fetchingError={error}
      isLoading={collectiblesListLoading}
      collectiblesList={
        collectiblesList?.pages.flatMap((p) => p.collectibles) ?? []
      }
      collectionAddress={collectionAddress}
      chainId={chainId}
      fetchNextPage={fetchNextPage}
    />
  );
};

const ShopContent = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const itemsForSale =
    storeConfig.shop.collections.find((c) => c.address === collectionAddress)
      ?.itemsForSale ?? [];
  const salesContractAddress = storeConfig.shop.collections.find(
    (c) => c.address === collectionAddress,
  )?.salesAddress;

  const {
    data: tokenMetadata,
    isLoading: tokenMetadataLoading,
    error: tokenMetadataError,
  } = useListTokenMetadata({
    chainId,
    tokenIds: itemsForSale.map((item) => item.toString()),
    contractAddress: collectionAddress,
  });

  return (
    <CollectiblesContent
      fetchingError={tokenMetadataError}
      isLoading={tokenMetadataLoading}
      // @ts-expect-error TODO: fix this
      collectiblesList={tokenMetadata?.map((t) => ({
        metadata: t,
      }))}
      collectionAddress={collectionAddress}
      chainId={chainId}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      fetchNextPage={() => {}}
      salesContractAddress={salesContractAddress}
    />
  );
};

export default CollectionPage;

export const runtime = 'edge';
