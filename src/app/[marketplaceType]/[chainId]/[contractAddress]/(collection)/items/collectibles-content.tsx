import { CollectiblesGrid } from '~/components/collectables/collectibles-grid';
import type { MarketplaceType } from '~/types';

import { useSidebarState } from '../_components/Controls/sidebar/sidebar-context';
import ErrorFetchingCollectibles from '../_components/error-fetching-collectibles';
import NoItemsFound from '../_components/no-items-found';
import { Spinner, Text } from '@0xsequence/design-system';
import { type CollectibleCardProps } from '@0xsequence/marketplace-sdk/react';
import type { Address } from 'viem';

type CollectiblesContentProps = {
  fetchingError: Error | null;
  isLoading: boolean;
  collectiblesList: CollectibleCardProps[];
  collectionAddress: Address;
  chainId: number;
  fetchNextPage: () => void;
  salesContractAddress?: Address;
  renderItemContent: (index: number) => React.ReactNode;
  isFetchingNextPage?: boolean;
  totalItemsCount?: number;
  isLoadingCountData?: boolean;
  marketplaceType: MarketplaceType;
};

export const CollectiblesContent = ({
  fetchingError,
  isLoading,
  collectiblesList,
  collectionAddress,
  chainId,
  fetchNextPage,
  salesContractAddress,
  renderItemContent,
  isFetchingNextPage,
  totalItemsCount,
  isLoadingCountData,
  marketplaceType,
}: CollectiblesContentProps) => {
  const { filtersSidebarOpen } = useSidebarState();

  if (fetchingError) {
    console.error(
      'an error occurred while fetching collectibles',
      fetchingError,
    );

    return <ErrorFetchingCollectibles />;
  }

  if (
    marketplaceType === 'shop' &&
    !isLoadingCountData &&
    totalItemsCount === 0
  ) {
    return (
      <Text className="text-md text-muted font-medium mt-10 mx-auto">
        No collectibles found. Try adjusting your filters.
      </Text>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner className="mt-4" />
      </div>
    );
  }

  if (!collectiblesList.length) {
    return (
      <NoItemsFound collectionAddress={collectionAddress} chainId={chainId} />
    );
  }

  return (
    <CollectiblesGrid
      endReached={fetchNextPage}
      collectiblesList={collectiblesList}
      collectiblesListLoading={isLoading}
      collectionAddress={collectionAddress}
      chainId={chainId}
      salesContractAddress={salesContractAddress}
      renderItemContent={renderItemContent}
      isFetchingNextPage={isFetchingNextPage}
      totalItemsCount={totalItemsCount}
      variant="stretch"
      filtersSidebarOpen={filtersSidebarOpen}
    />
  );
};
