'use client';

import CustomSkeleton from '~/components/skeleton';
import type { MarketplaceType } from '~/types';

import { useCollectableData } from '../_hooks/use-collectable-data';
import {
  ChevronLeftIcon,
  MarketplaceIcon,
  Text,
} from '@0xsequence/design-system';
import { Media } from '@0xsequence/marketplace-sdk/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CollectibleHeading() {
  const params = useParams();
  const chainId = params.chainId as string;
  const contractAddress = params.contractAddress as string;
  const marketplaceType = params.marketplaceType as MarketplaceType;
  const { collectionMetadata, collectibleMetadata, owner } =
    useCollectableData();
  const { data: collection } = collectionMetadata;

  if (
    owner.isLoading ||
    collectibleMetadata.isLoading ||
    collectionMetadata.isLoading ||
    !collection?.address
  ) {
    return <CollectibleHeadingSkeleton />;
  }

  return (
    <div className="px-4">
      <Link
        href={`/${marketplaceType}/${chainId}/${contractAddress}/items`}
        className="flex mb-2 items-center gap-2"
      >
        <div className="flex items-center gap-2">
          <ChevronLeftIcon className="w-4 h-4 text-white" />
          <Text className="text-base" color="text100" fontWeight="bold">
            {collection?.name}
          </Text>
        </div>
        {collection?.extensions.ogImage ? (
          <Media
            assets={[collection.extensions.ogImage]}
            className="w-[20px] h-[20px] rounded-full"
            fallbackContent={<CollectionAvatarPlaceholderImage />}
          />
        ) : (
          <CollectionAvatarPlaceholderImage />
        )}
      </Link>
    </div>
  );
}

function CollectibleHeadingSkeleton() {
  return (
    <div className="flex flex-col px-4 gap-3 items-start mb-3">
      <div className="flex flex-row gap-2 items-center justify-center">
        <CustomSkeleton style={{ width: 20, height: 20, borderRadius: 10 }} />

        <CustomSkeleton />

        <CustomSkeleton style={{ width: 16, height: 16, borderRadius: 8 }} />
      </div>
    </div>
  );
}

function CollectionAvatarPlaceholderImage() {
  return (
    <div className="flex items-center justify-center w-[20px] h-[20px] rounded-full px-0.5 bg-background-raised">
      <MarketplaceIcon className="w-3 h-3 text-muted" />
    </div>
  );
}
