'use client';

import React from 'react';

import { SearchIcon, Text, Spinner } from '@0xsequence/design-system';
import { CollectionStatus } from '@0xsequence/marketplace-sdk';
import { useCollectionDetailsPolling } from '@0xsequence/marketplace-sdk/react';

function getStatusMessage(status?: string): string {
  switch (status) {
    case CollectionStatus.created:
    case CollectionStatus.syncing_contract_metadata:
    case CollectionStatus.syncing_metadata:
    case CollectionStatus.syncing_tokens:
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
    status === CollectionStatus.syncing_contract_metadata ||
    status === CollectionStatus.syncing_metadata ||
    status === CollectionStatus.syncing_tokens ||
    status === CollectionStatus.syncing_orders
  );
}

function NoItemsFound({
  collectionAddress,
  chainId,
}: {
  collectionAddress: string;
  chainId: number;
}) {
  const { data: marketplaceCollectionDetails } = useCollectionDetailsPolling({
    collectionAddress,
    chainId,
  });

  const status = marketplaceCollectionDetails?.status;
  const message = getStatusMessage(status);
  const isLoading = isLoadingStatus(status);

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
