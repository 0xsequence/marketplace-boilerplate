'use client';

import { type Routes } from '~/lib/routes';
import { getChainId } from '~/lib/utils/getChain';

import { filters$ } from '../_components/FilterStore';
import { CollectiblesGrid } from '../_components/Grid';
import { MarketplaceKind } from '@0xsequence/marketplace-sdk';
import { useListCollectables } from '@0xsequence/marketplace-sdk/react';
import { observer } from '@legendapp/state/react';

type CollectionBuyPageParams = {
  params: typeof Routes.collection.params;
};

const CollectionBuyPage = observer(({ params }: CollectionBuyPageParams) => {
  const chainId = getChainId(params.chainParam)!;
  const { collectionId } = params;

  const text = filters$.searchText.get();
  const properties = filters$.filterOptions.get();
  const includeEmpty = !filters$.showAvailableOnly.get();

  const collectiblesResponse = useListCollectables({
    chainId,
    collectionAddress: collectionId,
    filters: {
      searchText: text,
      includeEmpty,
      properties,
      marketplaces: [MarketplaceKind.sequence_marketplace_v1],
    },
    includeOrders: 'lowestListing',
  });

  const collectibles =
    collectiblesResponse.data?.pages.flatMap((p) => p.collectibles) ?? [];

  return (
    <>
      <CollectiblesGrid
        endReached={collectiblesResponse.fetchNextPage}
        data={collectibles}
      />
    </>
  );
});

export default CollectionBuyPage;

export const runtime = 'edge';
