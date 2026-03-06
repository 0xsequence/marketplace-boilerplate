'use client';

import { useState } from 'react';

import CustomNetworkImage from '~/components/network-image';
import { type MarketCollection, type ShopCollection } from '~/lib/types';
import { cn } from '~/lib/utils';
import { usePreviewState } from '~/utils/preview-state-context';

import CollectionCardVisibilityPill from './collection-card-visibility-pill';
import { CollectionOGImage } from './collection-og-image';
import { Text } from '@0xsequence/design-system';
import {
  Media,
  useCollection,
  useListPrimarySaleItems,
  useMarketplaceConfig,
} from '@0xsequence/marketplace-sdk/react';
import Link, { type LinkProps } from 'next/link';
import type { Address } from 'viem';

type CollectionCardProps = {
  collection: MarketCollection | ShopCollection;
  collectionAddress: Address;
  salesAddress?: Address;
  href: LinkProps<string>['href'];
};

export const CollectionCard = ({
  collection,
  collectionAddress,
  salesAddress,
  href,
}: CollectionCardProps) => {
  const { data: marketplaceConfig } = useMarketplaceConfig();
  const { viewState: previewState } = usePreviewState();
  const isShopCollectionPrivate =
    marketplaceConfig?.shop.collections.find(
      (shopCollection) => shopCollection.saleAddress === salesAddress,
    )?.private ?? false;

  const { data: collectionData } = useCollection({
    collectionAddress,
    chainId: collection.chainId,
  });

  const [date] = useState(new Date().toISOString());

  // Primary sale items that are started already and not ended yet
  const {
    data: availablePrimarySaleItems,
    isLoading: isLoadingAvailablePrimarySaleItems,
  } = useListPrimarySaleItems({
    chainId: collection.chainId,
    primarySaleContractAddress: salesAddress!,
    filter: {
      includeEmpty: false,
      startDateBefore: date,
      endDateAfter: date,
    },
  });

  const noAvailablePrimarySaleItems =
    availablePrimarySaleItems?.pages[0]?.primarySaleItems.length === 0 &&
    !isLoadingAvailablePrimarySaleItems;

  const collectionBannerPlaceholderImageUrl =
    '/images/collection-banner-placeholder.png';

  const bannerImage =
    collection.bannerUrl || collectionBannerPlaceholderImageUrl;

  // if the collection is private and state is user, return null for this collection
  if (isShopCollectionPrivate && previewState === 'user') {
    return null;
  }

  if (noAvailablePrimarySaleItems || isLoadingAvailablePrimarySaleItems) {
    return null;
  }

  return (
    <Link href={href} tabIndex={0} prefetch={false}>
      <div
        className={cn(
          'relative overflow-hidden cursor-pointer',
          'h-[240px] md:h-[250px]',
          'rounded-xl',
          bannerImage ? 'border border-primary/15' : '',
          'ring-selected-highlight',
          bannerImage
            ? 'active:ring-1 active:border-selected-highlight'
            : 'active:ring-2 active:border-none',
          'focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary focus-visible:ring-ring focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus-ring',
          'group',
        )}
      >
        <div className="relative w-full h-full overflow-hidden">
          <Media
            assets={[bannerImage]}
            containerClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            shouldListenForLoad={false}
          />
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
            <CollectionOGImage imageUrl={collectionData?.extensions.ogImage} />

            <div className="flex flex-col">
              <div className="flex items-center">
                <Text
                  className="text-xl font-semibold text-primary truncate max-w-[200px]"
                  title={collectionData?.name}
                >
                  {collectionData?.name}
                </Text>

                <div className="ml-2 flex-shrink-0">
                  <CustomNetworkImage size="sm" chainId={collection.chainId} />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Text className="text-sm text-secondary line-clamp-1">
                  {collectionData?.type}
                </Text>

                <CollectionCardVisibilityPill
                  isShopCollectionPrivate={isShopCollectionPrivate}
                  shouldShowVisibilityPill={
                    (salesAddress && previewState === 'admin') || false
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
