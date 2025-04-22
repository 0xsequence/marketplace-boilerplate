'use client';

import { Suspense } from 'react';

import CustomNetworkImage from '~/components/custom-network-image/CustomNetworkImage';
import CollectionAvatarPlaceholderImage from '~/components/icons/CollectionAvatar';
import { getProxyImageUrl } from '~/lib/image-proxy';
import { isVideo } from '~/lib/utils';
import { cn } from '~/lib/utils';

import CollectionImage from './CollectionImage';
import { Image, Text } from '@0xsequence/design-system';
import type { MarketplaceConfig } from '@0xsequence/marketplace-sdk';
import { collectionOptions } from '@0xsequence/marketplace-sdk/react';
import { useConfig } from '@0xsequence/marketplace-sdk/react/hooks';
import { useSuspenseQuery } from '@tanstack/react-query';
import NextLink from 'next/link';

export const CollectionCardSkeleton = () => {
  return <div className="loading w-full h-full rounded-xl" />;
};

type CollectionCard = MarketplaceConfig['collections'][0];

export const CollectionCard = (params: CollectionCard) => {
  return (
    <Suspense fallback={<CollectionCardSkeleton />}>
      <Card {...params} />
    </Suspense>
  );
};

const Card = ({ chainId, address, bannerUrl }: CollectionCard) => {
  const { data: collection } = useSuspenseQuery(
    collectionOptions(
      {
        chainId,
        collectionAddress: address,
      },
      useConfig(),
    ),
  );
  const collectionBannerPlaceholderImageUrl =
    '/images/collection-banner-placeholder.png';

  const bannerImage =
    bannerUrl ||
    collection?.extensions?.ogImage ||
    collectionBannerPlaceholderImageUrl;
  const name = collection?.name;
  const symbol = collection?.symbol;
  const collectionImage = collection?.logoURI;
  const contractType = collection?.type;

  return (
    <NextLink
      href={`/${chainId as unknown as string}/${address}/items`}
      tabIndex={0}
      className={cn(
        'relative overflow-hidden cursor-pointer',
        'h-[240px] md:h-[250px]',
        'rounded-xl',
        collection?.extensions?.ogImage || bannerUrl
          ? 'border border-primary/15'
          : '',
        'ring-selected-highlight',
        collection?.extensions?.ogImage || bannerUrl
          ? 'active:ring-1 active:border-selected-highlight'
          : 'active:ring-2 active:border-none',
        'focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary focus-visible:ring-ring focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus-ring',
        'group',
      )}
    >
      <div className="relative w-full h-full overflow-hidden">
        {isVideo(bannerImage) ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            src={bannerImage}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = collectionBannerPlaceholderImageUrl;
            }}
          />
        ) : (
          <Image
            src={getProxyImageUrl(bannerImage, 470, 300, { crop: false })}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = collectionBannerPlaceholderImageUrl;
            }}
          />
        )}
        <div
          className="absolute w-full h-full object-cover top-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%)',
          }}
        />
      </div>

      <div className="flex absolute bottom-4 left-4 flex-col gap-3 content-end">
        <div className="flex items-center gap-2">
          {collectionImage ? (
            <CollectionImage
              src={collectionImage}
              alt={symbol}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full"
            />
          ) : (
            <div
              className={cn(
                'bg-background-secondary rounded-full p-2 flex items-center justify-center',
                'w-10 h-10 md:w-12 md:h-12',
              )}
            >
              <CollectionAvatarPlaceholderImage className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
          )}

          <div className="flex flex-col">
            <div className="flex items-center">
              <Text
                className="text-xl font-semibold text-primary truncate max-w-[200px]"
                title={name}
              >
                {name}
              </Text>

              <div className="ml-2 flex-shrink-0">
                <CustomNetworkImage size="sm" chainId={chainId} />
              </div>
            </div>

            <Text className="text-sm text-secondary line-clamp-1">
              {contractType}
            </Text>
          </div>
        </div>
      </div>
    </NextLink>
  );
};
