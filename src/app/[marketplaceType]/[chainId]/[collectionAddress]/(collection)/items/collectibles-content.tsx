import { CollectiblesGrid } from '~/components/collectables';

import ErrorFetchingCollectibles from '../_components/ErrorFetchingCollectibles';
import NoItemsFound from '../_components/NoItemsFound';
import { Spinner } from '@0xsequence/design-system';
import { type CollectibleOrder } from '@0xsequence/marketplace-sdk';
import type { Address } from 'viem';

type CollectiblesContentProps = {
  fetchingError: Error | null;
  isLoading: boolean;
  collectiblesList: CollectibleOrder[];
  collectionAddress: Address;
  chainId: number;
  fetchNextPage: () => void;
  salesContractAddress?: Address;
};

export const CollectiblesContent = ({
  fetchingError,
  isLoading,
  collectiblesList,
  collectionAddress,
  chainId,
  fetchNextPage,
  salesContractAddress,
}: CollectiblesContentProps) => {
  if (fetchingError) {
    console.log('an error occurred while fetching collectibles', fetchingError);

    return <ErrorFetchingCollectibles />;
  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner className="mt-4" />;
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
    />
  );
};
