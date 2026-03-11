import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '~/components/collectables/components';
import { getCollectibleCardWidthClass } from '~/utils/get-collectible-card-width-class';

import { CollectiblesContent } from './collectibles-content';
import { Text } from '@0xsequence/design-system';
import { cn, type ContractType } from '@0xsequence/marketplace-sdk';
import {
  CollectibleCard,
  useCollection,
  useFilterState,
  useListMarketCardData,
} from '@0xsequence/marketplace-sdk/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { Address } from 'viem';

export function MarketContent() {
  const params = useParams();

  const chainId = Number(params.chainId);
  const collectionAddress = params.contractAddress as Address;
  const { filterOptions, showListedOnly, searchText, priceFilters } =
    useFilterState();
  const { data: collection } = useCollection({
    collectionAddress,
    chainId,
  });
  const {
    collectibleCards,
    error: collectiblesListError,
    isLoading: collectiblesListLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useListMarketCardData({
    chainId,
    collectionAddress,
    collectionType: collection?.type as ContractType,
    filterOptions: filterOptions,
    searchText: searchText,
    showListedOnly: showListedOnly,
    priceFilters: priceFilters,
  });
  const noListingWithPriceFilters =
    !collectiblesListLoading &&
    priceFilters.length > 0 &&
    !collectibleCards[0]?.collectible?.listing;
  function renderItemContent({ index }: { index: number }) {
    const card = collectibleCards[index];
    if (!card) return null;

    const collectibleCardWidthClassName = getCollectibleCardWidthClass(
      collectibleCards.length,
    );
    const collectibleId = card.tokenId;

    return (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error) => {
          console.error('Collectible card error:', error);
        }}
        key={`${collectionAddress}-${collectibleId}`}
      >
        <Link
          href={`/market/${String(chainId)}/${collectionAddress}/${collectibleId}/details`}
          className={cn('cursor-pointer', collectibleCardWidthClassName)}
          prefetch={false}
        >
          <CollectibleCard key={collectibleId} {...card} />
        </Link>
      </ErrorBoundary>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {noListingWithPriceFilters && (
        <div className="flex flex-col gap-2">
          <Text className="text-sm text-text-50 font-medium">
            No listings found with the selected price filters.
          </Text>
        </div>
      )}

      <CollectiblesContent
        fetchingError={
          collectiblesListError instanceof Error
            ? collectiblesListError
            : collectiblesListError
              ? new Error(String(collectiblesListError))
              : null
        }
        isLoading={collectiblesListLoading}
        collectiblesList={collectibleCards}
        collectionAddress={collectionAddress}
        isFetchingNextPage={isFetchingNextPage}
        chainId={chainId}
        fetchNextPage={fetchNextPage}
        totalItemsCount={collectibleCards.length}
        renderItemContent={(index) => renderItemContent({ index })}
        marketplaceType={'market'}
      />
    </div>
  );
}
