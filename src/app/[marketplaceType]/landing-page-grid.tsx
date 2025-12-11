'use client';

import { useState } from 'react';

import { CollectionCard } from '~/components/collection-card/collection-card';
import type { MarketCollection, ShopCollection } from '~/lib/types';
import { usePreviewState } from '~/utils/preview-state-context';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
} from '@0xsequence/design-system';
import { useMarketplaceConfig } from '@0xsequence/marketplace-sdk/react';
import type { Route } from 'next';
import { useParams } from 'next/navigation';

type LandingPageGridProps = {
  showPreviewBanner: boolean;
};

export function LandingPageGrid({ showPreviewBanner }: LandingPageGridProps) {
  const { marketplaceType } = useParams();
  const isShop = marketplaceType === 'shop';
  const isMarket = marketplaceType === 'market';
  const { data: marketplaceConfig } = useMarketplaceConfig();
  const [visibility, setVisibility] = useState<'all' | 'private' | 'public'>(
    'all',
  );
  const title = isShop ? 'Sales' : 'Market';
  const { viewState } = usePreviewState();

  const privateShopCollections = marketplaceConfig?.shop.collections.filter(
    (collection) => collection.private === true,
  );
  const publicShopCollections = marketplaceConfig?.shop.collections.filter(
    (collection) => collection.private === false,
  );
  const collections = isMarket
    ? marketplaceConfig?.market.collections
    : isShop
      ? visibility === 'all'
        ? [...(privateShopCollections ?? []), ...(publicShopCollections ?? [])]
        : visibility === 'public' || viewState === 'user'
          ? (publicShopCollections ?? [])
          : (privateShopCollections ?? [])
      : [];

  return (
    <div className="mt-4 md:mt-[49px] px-4 md:px-8 mb-[28px] md:mb-[65px] flex-col justify-center gap-4">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <h2 className="font-bold text-xl text-left mb-4 text-primary">
          {title}
        </h2>

        {showPreviewBanner && isShop && viewState === 'admin' && (
          <Select
            value={visibility}
            onValueChange={(value) =>
              setVisibility(value as 'all' | 'private' | 'public')
            }
          >
            <SelectTrigger className="h-7 text-xs px-3 py-1.5 rounded-[8px]! bg-background-raised ring-transparent focus-within:ring-transparent">
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <Text className="text-xs">All sales</Text>
              </SelectItem>
              <SelectItem value="private">
                <Text className="text-xs">Private sales</Text>
              </SelectItem>
              <SelectItem value="public">
                <Text className="text-xs">Public sales</Text>
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[240px] md:auto-rows-[250px] gap-3 align-center justify-center">
        <CollectionsGrid
          collections={collections ?? []}
          showPreviewBanner={showPreviewBanner}
        />
      </div>
    </div>
  );
}

function CollectionsGrid({
  collections,
  showPreviewBanner,
}: {
  collections: MarketCollection[] | ShopCollection[];
  showPreviewBanner: boolean;
}) {
  const { marketplaceType } = useParams();
  const isShop = marketplaceType === 'shop';
  const isMarket = marketplaceType === 'market';

  return collections.map((collection) => {
    const collectionAddress = collection.itemsAddress;
    const salesAddress = isShop
      ? (collection as ShopCollection).saleAddress
      : undefined;

    return (
      <CollectionCard
        key={isMarket ? collectionAddress : salesAddress}
        href={
          (isMarket
            ? `/market/${collection.chainId}/${collectionAddress}/items`
            : `/shop/${collection.chainId}/${salesAddress}/items?listedOnly=true`) as Route
        }
        collection={collection}
        collectionAddress={collection.itemsAddress}
        salesAddress={salesAddress}
        showPreviewBanner={showPreviewBanner}
      />
    );
  });
}
