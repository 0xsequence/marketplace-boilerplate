'use client';

import React from 'react';

import { SearchIcon, Text, Spinner } from '@0xsequence/design-system';
import { CollectionStatus } from '@0xsequence/marketplace-sdk';
import { useCollectionDetailsPolling } from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import { type Address } from 'viem';

function getStatusMessage(status?: string): string {
  switch (status) {
    case CollectionStatus.created:
    case CollectionStatus.syncing_orders:
      return 'Collection is syncing. Please wait a moment...';
    case CollectionStatus.failed:
      return 'Failed to sync collection';
    case CollectionStatus.inactive:
      return 'This collection is currently inactive';
    case CollectionStatus.incompatible_type:
      return 'This collection type is not supported';
    default:
      return 'No items found';
  }
}

function isLoadingStatus(status?: CollectionStatus): boolean {
  return (
    status === CollectionStatus.created ||
    status === CollectionStatus.syncing_orders
  );
}

function NoItemsFound({
  collectionAddress,
  chainId,
}: {
  collectionAddress: Address;
  chainId: number;
}) {
  const { marketplaceType } = useParams();
  const isMarket = marketplaceType === 'market';

  const { data: marketplaceCollectionDetails } = useCollectionDetailsPolling({
    collectionAddress,
    chainId,
    query: {
      enabled: isMarket,
    },
  });

  const status = marketplaceCollectionDetails?.status;
  const message = isMarket ? getStatusMessage(status) : 'No items found';
  const isLoading = isMarket ? isLoadingStatus(status) : false;

  return (
    <div className="flex mt-10 py-10 w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {isLoading ? (
          <Spinner size="md" />
        ) : (
          <SearchIcon className="w-6 h-6 text-primary/50" />
        )}

        <Text className="text-primary/50 font-bold">{message}</Text>
      </div>
    </div>
  );
}

export default NoItemsFound;
