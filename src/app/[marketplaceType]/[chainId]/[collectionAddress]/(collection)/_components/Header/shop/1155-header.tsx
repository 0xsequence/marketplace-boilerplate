'use client';

import { CollectionTitle } from './collection-title';
import { useCollection } from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import { type Hex } from 'viem';

export function Shop1155CollectionHeader() {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;

  const { data: collection } = useCollection({
    chainId,
    collectionAddress,
  });

  const collectionTitle = collection?.name;
  const collectionImage = '';
  const tokenType = 'ERC-1155';

  return (
    <div className="flex flex-col w-full bg-black pb-4 mt-5">
      <CollectionTitle
        title={collectionTitle || ''}
        name={collection?.name || ''}
        image={collectionImage}
        tokenType={tokenType}
        chainId={chainId}
      />
    </div>
  );
}
