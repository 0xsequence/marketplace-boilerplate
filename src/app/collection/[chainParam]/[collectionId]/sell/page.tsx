'use client';

import { NotConnectedWarning } from '~/components/NotConnectedWarning';
import { Box, Text } from '~/components/ui';
import { getChainId } from '~/config/networks';
import { collectableQueries } from '~/lib/queries';
import { MarketplaceKind } from '~/lib/queries/marketplace/marketplace.gen';
import { type Routes } from '~/lib/routes';
import { OrderItemType } from '~/lib/stores/cart/types';

import { filters$ } from '../_components/FilterStore';
import { CollectiblesGrid } from '../_components/Grid';
import { CollectionOfferModal } from '../_components/ListingOfferModal';
import { observer } from '@legendapp/state/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

type CollectionBuyPageParams = {
  params: typeof Routes.collection.params;
};

const CollectionBuyPage = observer(({ params }: CollectionBuyPageParams) => {
  const chainId = getChainId(params.chainParam)!;
  const { collectionId } = params;
  const { address, isConnected } = useAccount();

  const text = filters$.searchText.get();
  const properties = filters$.filterOptions.get();

  const collectiblesResponse = useInfiniteQuery(
    collectableQueries.listHighestOffer({
      chainId,
      contractAddress: collectionId,
      filter: {
        searchText: text,
        includeEmpty: !filters$.showAvailableOnly.get(),
        properties,
        inAccounts: address ? [address] : undefined,
        marketplaces: [MarketplaceKind.sequence_marketplace_v1],
      },
    }),
  );

  if (!address) {
    return <NotConnectedWarning isConnected={isConnected} />;
  }

  const collectibles =
    collectiblesResponse.data?.pages.flatMap((p) => p.collectibles) ?? [];

  //TODO: Implement error handling, loading states, and improve this message
  if (collectibles.length === 0 && !collectiblesResponse.isLoading) {
    return (
      <Box className="flex items-center justify-center">
        <Text className="text-foreground/60 text-lg">
          You don&lsquo;t own any collectable matching your current filters
        </Text>
      </Box>
    );
  }

  return (
    <>
      <CollectiblesGrid
        endReached={collectiblesResponse.fetchNextPage}
        itemType={OrderItemType.SELL}
        data={collectibles}
      />
      <CollectionOfferModal />
    </>
  );
});

export default CollectionBuyPage;

export const runtime = 'edge';
