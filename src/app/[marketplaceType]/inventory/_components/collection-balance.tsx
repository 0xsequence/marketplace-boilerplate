'use client';

import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { CollectiblesGrid } from '~/components/collectables/collectibles-grid';
import {
  ErrorFallback,
  ViewMoreButton,
} from '~/components/collectables/components';
import CustomNetworkImage from '~/components/network-image';
import CustomSkeleton from '~/components/skeleton';
import { useIsMinWidth } from '~/hooks/ui/use-is-min-width';

import { useListInventoryCardData } from '../useListInventoryCardData';
import { useInventory as useInventoryContext } from './inventory-context';
import { Separator } from '@0xsequence/design-system';
import { compareAddress, ContractType } from '@0xsequence/marketplace-sdk';
import {
  useCollection,
  useMarketplaceConfig,
  CollectibleCard,
  Media,
  type CollectibleCardProps,
} from '@0xsequence/marketplace-sdk/react';
import type { Route } from 'next';
import Link from 'next/link';
import type { Address } from 'viem';

function CollectionHeaderSkeleton() {
  return (
    <div className="flex gap-2 items-center">
      <CustomSkeleton className="w-5 h-5 rounded-xl" />

      <CustomSkeleton className="w-20 h-4" />

      <CustomSkeleton className="w-4 h-4 rounded-xl" />
    </div>
  );
}

type CollectionBalanceProps = {
  collectionAddress: Address;
  cardType: 'market' | 'inventory-non-tradable';
  isTradable: boolean;
  chainId: number;
};

const CollectionBalance = ({
  collectionAddress,
  cardType,
  isTradable,
  chainId,
}: CollectionBalanceProps) => {
  const { data: config } = useMarketplaceConfig();
  const shopCollections = config?.shop.collections || [];

  // Find the shop collection if it's non-tradable (for saleAddress)
  const shopCollection = !isTradable
    ? shopCollections.find(
        (c) =>
          compareAddress(c.itemsAddress, collectionAddress) &&
          c.chainId === chainId,
      )
    : undefined;

  const saleAddress = shopCollection?.saleAddress;
  const marketplaceType = cardType === 'market' ? 'market' : 'shop';

  const { setBalance } = useInventoryContext();

  const { data: collection, isLoading: collectionLoading } = useCollection({
    collectionAddress: collectionAddress,
    chainId,
  });

  const collectionType = collection?.type
    ? (collection.type as unknown as ContractType)
    : ContractType.ERC721;

  const {
    collectibleCards,
    isLoading: inventoryIsLoading,
    allCollectibles,
    isSuccess: inventorySuccess,
  } = useListInventoryCardData({
    chainId: chainId,
    collectionAddress,
    collectionType,
    marketplaceType: 'market',
    query: {
      enabled: !!chainId,
    },
  });

  const isMd = useIsMinWidth('@md');
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    // Set initial visible items based on screen size
    setVisibleItems(isMd ? 9 : 4);
  }, [isMd]);

  useEffect(() => {
    if (collectionLoading || inventoryIsLoading) {
      return;
    }

    const balanceKey = `${chainId}-${collectionAddress.toLowerCase()}`;

    if (inventorySuccess && allCollectibles?.length > 0) {
      const lastCollectible = allCollectibles[allCollectibles.length - 1];

      for (const collectible of allCollectibles) {
        setBalance(balanceKey, {
          balance: [
            {
              collectibleId: collectible.metadata.tokenId,
              balance: Number(collectible.balance),
            },
          ],
          decimals: 0,
          fetched:
            collectible.metadata.tokenId === lastCollectible?.metadata.tokenId,
        });
      }
    } else {
      setBalance(balanceKey, {
        balance: [],
        decimals: 0,
        fetched: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    collectionLoading,
    inventoryIsLoading,
    inventorySuccess,
    allCollectibles,
  ]);

  if (
    !allCollectibles ||
    allCollectibles.length === 0 ||
    !chainId ||
    collectionLoading ||
    inventoryIsLoading
  ) {
    return null;
  }

  const handleLoadMore = () => {
    // Increase visible items by the batch size (9 or 4)
    const increment = isMd ? 9 : 4;
    setVisibleItems((prev) => prev + increment);
  };

  // Calculate how many items to actually display and whether to show view more button
  const displayLimit = isMd ? 10 : 5;
  const itemsToDisplay = Math.min(visibleItems, allCollectibles.length);
  const showViewMoreButton = allCollectibles.length > itemsToDisplay;

  // Create a modified display list that might include the view more button
  const displayList = collectibleCards.slice(0, itemsToDisplay);

  function renderItemContent(index: number) {
    // If this is the last slot and we have more items to show, render the view more button
    if (index === itemsToDisplay - 1 && showViewMoreButton) {
      return (
        <ViewMoreButton
          key="view-more-button"
          onClick={handleLoadMore}
          remainingItems={allCollectibles.length - itemsToDisplay}
        />
      );
    }

    // Otherwise render the normal card
    const card = collectibleCards[index];
    if (!card) return null;

    function getHref(tokenId: bigint, isTradable: boolean): Route {
      if (isTradable) {
        return `/market/${String(chainId)}/${collectionAddress}/${String(tokenId)}/details` as Route;
      }

      return `/shop/${String(chainId)}/${saleAddress}/${String(tokenId)}/details` as Route;
    }

    return (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error) => {
          console.error('Collectible card error:', error);
        }}
        key={`${collectionAddress}-${String(card.tokenId)}`}
      >
        <Link
          href={getHref(card.tokenId, isTradable)}
          className="cursor-pointer w-full"
          prefetch={false}
        >
          {cardType === 'market' &&
            (() => {
              const { onOfferClick, collectible, ...cardProps } = card;
              return (
                <CollectibleCard
                  key={String(card.tokenId)}
                  tokenId={cardProps.tokenId}
                  chainId={cardProps.chainId}
                  collectionAddress={cardProps.collectionAddress}
                  collectionType={cardProps.collectionType}
                  cardLoading={cardProps.cardLoading}
                  assetSrcPrefixUrl={cardProps.assetSrcPrefixUrl}
                  cardType={'market'}
                  collectible={
                    collectible as CollectibleCardProps extends {
                      collectible?: infer T;
                    }
                      ? T
                      : never
                  }
                  balance={cardProps.balance}
                  balanceIsLoading={cardProps.balanceIsLoading ?? false}
                  onOfferClick={({ order }) => {
                    onOfferClick({ order: order ?? null });
                  }}
                  prioritizeOwnerActions={true}
                />
              );
            })()}

          {cardType === 'inventory-non-tradable' &&
            (() => {
              return (
                <CollectibleCard
                  {...card}
                  cardType="inventory-non-tradable"
                  collectibleMetadata={{
                    ...card.collectible.metadata,
                  }}
                />
              );
            })()}
        </Link>
      </ErrorBoundary>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Separator className="w-full mb-3 mt-0" />

      <Link
        href={`/${marketplaceType}/${chainId}/${collectionAddress}/items`}
        prefetch={false}
      >
        <div className="mb-4">
          {collectionLoading ? (
            <CollectionHeaderSkeleton />
          ) : (
            <div className="flex gap-2 items-center">
              <Media
                assets={[collection?.logoURI]}
                containerClassName="w-5 h-5 rounded-xl overflow-hidden"
                shouldListenForLoad={false}
              />

              <p className="text-sm text-primary font-bold">
                {collection?.name}
              </p>

              <CustomNetworkImage size="xs" chainId={Number(chainId)} />
            </div>
          )}
        </div>
      </Link>

      <CollectiblesGrid
        collectiblesList={displayList as CollectibleCardProps[]}
        collectiblesListLoading={inventoryIsLoading}
        chainId={chainId}
        collectionAddress={collectionAddress}
        limit={displayLimit}
        renderItemContent={renderItemContent}
        variant="fixed"
      />
    </div>
  );
};

export default CollectionBalance;
