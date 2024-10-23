'use client';

import { type Routes } from '~/lib/routes';
import { getChainId } from '~/lib/utils/getChain';

import { filters$ } from '../_components/FilterStore';
import { CollectiblesGrid } from '../_components/Grid';
import { MarketplaceKind } from '@0xsequence/marketplace-sdk';
import { useListCollectibles } from '@0xsequence/marketplace-sdk/react';
import { observer } from '@legendapp/state/react';
import { OrderSide } from 'packages/marketplace-sdk/dist';

type CollectionBuyPageParams = {
  params: typeof Routes.collection.params;
};

const CollectionBuyPage = observer(({ params }: CollectionBuyPageParams) => {
  const chainId = getChainId(params.chainParam)!;
  const { collectionId } = params;

  const text = filters$.searchText.get();
  const properties = filters$.filterOptions.get();
  const includeEmpty = !filters$.showAvailableOnly.get();

  const collectiblesResponse = useListCollectibles({
    chainId,
    collectionAddress: collectionId,
    filter: {
      searchText: text,
      includeEmpty,
      properties,
      marketplaces: [MarketplaceKind.sequence_marketplace_v1],
    },
    side: OrderSide.listing
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
