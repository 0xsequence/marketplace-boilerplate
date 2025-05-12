'use client';

import React from 'react';

import CustomNetworkImage from '~/components/custom-network-image/CustomNetworkImage';
import CustomSkeleton from '~/components/custom-skeleton/CustomSkeleton';
import CollectionAvatarPlaceholderImage from '~/components/icons/CollectionAvatar';

import { useCollectableData } from '../_hooks/useCollectableData';
import { Image, Text } from '@0xsequence/design-system';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { type Hex } from 'viem';

export default function CollectibleHeading() {
  const params = useParams();
  const chainId = params.chainId as string;
  const collectionAddress = params.collectionAddress as Hex;
  const { collectionMetadata, collectibleMetadata, loading } =
    useCollectableData();
  const { data: collection } = collectionMetadata;
  const { data: collectible } = collectibleMetadata;

  if (loading) {
    return <CollectibleHeadingSkeleton />;
  }

  return (
    <div className="px-4">
      <Link
        href={`/${chainId}/${collectionAddress}/items`}
        className="flex mb-2"
      >
        <div className="flex flex-row gap-2 items-center justify-center">
          {collection?.logoURI ? (
            <Image
              src={collection.logoURI}
              className="w-[20px] h-[20px] rounded-full"
              alt={collection.name}
            />
          ) : (
            <div className="flex items-center justify-center w-[20px] h-[20px] rounded-full px-0.5 bg-background-control">
              <CollectionAvatarPlaceholderImage className="w-[18px] h-[18px] text-primary" />
            </div>
          )}

          <Text className="text-sm" color="text100" fontWeight="bold" asChild>
            <h2>{collection?.name}</h2>
          </Text>

          <CustomNetworkImage size="sm" chainId={Number(chainId)} />
        </div>
      </Link>
      <Text
        className="text-xl ellipsis"
        color="text100"
        fontWeight="bold"
        asChild
      >
        <h1>{collectible?.name}</h1>
      </Text>
    </div>
  );
}

function CollectibleHeadingSkeleton() {
  return (
    <div className="flex flex-col px-4 gap-3 items-start">
      <div className="flex flex-row gap-2 items-center justify-center">
        <CustomSkeleton style={{ width: 20, height: 20, borderRadius: 10 }} />

        <CustomSkeleton />

        <CustomSkeleton style={{ width: 16, height: 16, borderRadius: 8 }} />
      </div>

      <CustomSkeleton />
    </div>
  );
}
