'use client';

import { CollectiblesGrid } from '~/components/collectablesGrid';

import ErrorFetchingCollectibles from '../_components/ErrorFetchingCollectibles';
import NoItemsFound from '../_components/NoItemsFound';
import { useListCollectiblesArgs } from '../_hooks/useListCollectiblesArgs';
import { Spinner } from '@0xsequence/design-system';
import { useListCollectibles } from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import type { Hex } from 'viem';

const CollectionPage = () => {
  const {
    data: collectiblesList,
    fetchNextPage,
    isLoading: collectiblesListLoading,
    isError: errorFetchingCollectibles,
    error,
  } = useListCollectibles(useListCollectiblesArgs());
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const collectiblesListMapped =
    collectiblesList?.pages.flatMap((p) => p.collectibles) ?? [];

  if (errorFetchingCollectibles) {
    console.log('an error occurred while fetching collectibles', error);

    return <ErrorFetchingCollectibles />;
  }

  if (collectiblesListLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner className="mt-4" />;
      </div>
    );
  }

  if (!collectiblesListMapped.length) {
    return (
      <NoItemsFound collectionAddress={collectionAddress} chainId={chainId} />
    );
  }

  return (
    <CollectiblesGrid
      endReached={fetchNextPage}
      collectiblesList={collectiblesListMapped}
      collectiblesListLoading={collectiblesListLoading}
      collectionAddress={collectionAddress}
      chainId={chainId}
    />
  );
};

export default CollectionPage;

export const runtime = 'edge';
