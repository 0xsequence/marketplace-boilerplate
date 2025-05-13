'use client';

import { CollectionCard } from '~/app/move-to-SDK/collection-card';
import { CollectionCardSkeleton } from '~/app/move-to-SDK/collection-card-skeleton';

import { useListCollections } from '../tmp/useListCollections';
import { MarketplaceType } from '@0xsequence/marketplace-sdk';
import Link from 'next/link';

export function LandingPageGrid({
  marketplaceType,
  collectionsLength,
}: {
  marketplaceType: MarketplaceType;
  collectionsLength: number;
}) {
  const { data: collections, isLoading } = useListCollections({
    marketplaceType,
  });

  return (
    <div className="mt-4 md:mt-[49px] px-4 md:px-8 mb-[28px] md:mb-[65px] flex-col justify-center gap-4">
      <h2 className="font-bold text-xl text-center mb-4 text-primary">
        Select a Collection
      </h2>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] md:auto-rows-[250px] gap-3 align-center justify-center">
        {isLoading
          ? Array.from({ length: collectionsLength }).map((_, index) => (
              <CollectionCardSkeleton key={index} />
            ))
          : collections?.map((collection) => {
              return (
                <Link
                  key={collection.address}
                  href={`/${marketplaceType}/${collection.chainId}/${collection.address}/items`}
                  tabIndex={0}
                >
                  <CollectionCard
                    bannerUrl={collection.bannerUrl}
                    chainId={collection.chainId}
                    name={collection.name}
                    symbol={collection.symbol}
                    type={collection.type}
                    collectionImage={collection.logoURI}
                  />
                </Link>
              );
            })}
      </div>
    </div>
  );
}
