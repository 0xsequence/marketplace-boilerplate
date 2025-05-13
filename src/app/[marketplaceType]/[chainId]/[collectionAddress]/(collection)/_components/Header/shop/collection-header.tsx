'use client';

import Shop721CollectionHeader from './721-header';
import { Shop1155CollectionHeader } from './1155-header';
import { CollectionTitle } from './collection-title';
import { Spinner } from '@0xsequence/design-system';
import { useCollection } from '@0xsequence/marketplace-sdk/react';

export const ShopCollectionHeader = ({
  chainId,
  collectionAddress,
}: {
  chainId: number;
  collectionAddress: string;
}) => {
  const { data: collection, isLoading } = useCollection({
    chainId,
    collectionAddress,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col w-full bg-black pb-4">
        <CollectionTitle
          title="Loading..."
          name="Loading..."
          image=""
          tokenType="ERC-1155"
          chainId={chainId}
        />
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      </div>
    );
  }

  if (collection?.type === 'ERC721') {
    return <Shop721CollectionHeader />;
  }
  if (collection?.type === 'ERC1155') {
    return <Shop1155CollectionHeader />;
  }
};
