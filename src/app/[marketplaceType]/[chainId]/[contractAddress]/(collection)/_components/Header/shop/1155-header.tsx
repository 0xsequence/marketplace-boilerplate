'use client';

import { useMarketplaceCollection } from '~/hooks/use-marketplace-collection';
import { getCollectionAddress } from '~/lib/utils';
import type { MarketplaceType } from '~/types';

import { CollectionTitle } from './collection-title';
import { useCollection } from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';

export function Shop1155CollectionHeader({
  isLoading,
}: {
  isLoading: boolean;
}) {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionData = useMarketplaceCollection(
    params.marketplaceType as MarketplaceType,
  );
  const marketplaceCollection = collectionData.data;
  const collectionAddress = getCollectionAddress({
    collection: marketplaceCollection || null,
    marketplaceType: params.marketplaceType as MarketplaceType,
  });

  const { data: collection } = useCollection({
    chainId,
    collectionAddress,
  });

  const collectionImage = collection?.logoURI;
  const tokenType = 'ERC-1155';

  return (
    <div className="flex flex-col w-full bg-black pb-4 pt-5">
      <CollectionTitle
        name={collection?.name || 'Collection'}
        image={collectionImage}
        tokenType={tokenType}
        chainId={chainId}
        isLoading={isLoading}
      />
    </div>
  );
}
