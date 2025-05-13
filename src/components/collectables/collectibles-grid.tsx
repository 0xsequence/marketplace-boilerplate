'use client';

import { useState, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { VirtuosoGrid } from 'react-virtuoso';

import { GridContainer, ViewMoreButton, ErrorFallback } from './components';
import { useCollectionData, useOfferClick } from './hooks';
import type { CollectiblesGridProps } from './types';
import {
  OrderbookKind,
  type CollectibleOrder,
  type ContractType,
} from '@0xsequence/marketplace-sdk';
import {
  CollectibleCard,
  useList1155ShopCardData,
  useListMarketCardData,
} from '@0xsequence/marketplace-sdk/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAccount } from 'wagmi';

export function CollectiblesGrid({
  collectionAddress,
  chainId,
  endReached,
  collectiblesList,
  collectiblesListLoading: collectibleOrdersLoading,
  limit,
  salesContractAddress,
}: CollectiblesGridProps) {
  const { address: accountAddress } = useAccount();
  const [limitPage, setLimitPage] = useState<number>(1);
  const { marketplaceType } = useParams();
  const isShop = marketplaceType === 'shop';
  const isMarket = marketplaceType === 'market';
  const { handleOfferClick } = useOfferClick(collectionAddress, chainId);
  const { collectibleCards: shopCollectibleCards } = useList1155ShopCardData({
    tokenIds: ['1', '2', '3'],
    chainId,
    contractAddress: collectionAddress,
    salesContractAddress: salesContractAddress ?? '0x',
  });
  const { collection, collectionLoading, collectionBalanceDetailsLoading } =
    useCollectionData(collectionAddress, chainId, accountAddress, isMarket);
  const { collectibleCards: marketCollectibleCards } = useListMarketCardData({
    chainId,
    collectionAddress,
    collectionType: collection?.type as ContractType,
    orderbookKind: OrderbookKind.sequence_marketplace_v2,
  });

  const handleViewMore = useCallback(() => {
    setLimitPage((prev) => prev + 1);
  }, []);

  const isLoading =
    collectibleOrdersLoading ||
    collectionLoading ||
    (!!accountAddress && collectionBalanceDetailsLoading);

  const renderShopItemContent = useCallback(
    (index: number) => {
      const totalItems = shopCollectibleCards.length;

      // Show "View more" button if needed
      if (
        limit &&
        index === limitPage * limit - 1 &&
        totalItems > limitPage * limit
      ) {
        return (
          <ViewMoreButton
            onClick={handleViewMore}
            remainingItems={totalItems - limitPage * limit + 1}
          />
        );
      }

      // Skip rendering items beyond the current limit
      if (limit && index >= limit * limitPage) {
        return null;
      }

      const card = shopCollectibleCards[index];
      if (!card) return null;

      // Using index as a token ID for shop items
      // since collectibleCards might not have a tokenId property
      const tokenId = String(index + 1);

      return (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={(error) => {
            console.error('Collectible card error:', error);
          }}
        >
          <Link
            href={`/shop/${String(chainId)}/${collectionAddress}/${tokenId}/details`}
            className="cursor-pointer"
          >
            <CollectibleCard key={card.collectibleId} {...card} />
          </Link>
        </ErrorBoundary>
      );
    },
    [
      limit,
      limitPage,
      shopCollectibleCards,
      handleViewMore,
      chainId,
      collectionAddress,
    ],
  );

  const renderMarketItemContent = useCallback(
    (index: number, collectibleOrder: CollectibleOrder) => {
      const totalItems = marketCollectibleCards.length;

      // Show "View more" button if needed
      if (
        limit &&
        index === limitPage * limit - 1 &&
        totalItems > limitPage * limit
      ) {
        return (
          <ViewMoreButton
            onClick={handleViewMore}
            remainingItems={totalItems - limitPage * limit + 1}
          />
        );
      }

      // Skip rendering items beyond the current limit
      if (limit && index >= limit * limitPage) {
        return null;
      }

      const card = marketCollectibleCards[index];
      if (!card) return null;

      return (
        <CollectibleCard
          key={card.collectibleId}
          cardLoading={isLoading}
          onOfferClick={() => {
            handleOfferClick(collectibleOrder.order, card.collectibleId);
          }}
          {...card}
        />
      );
    },
    [
      marketCollectibleCards,
      limit,
      limitPage,
      isLoading,
      handleViewMore,
      handleOfferClick,
    ],
  );

  return (
    <div className="@container collectibles-grid">
      {isShop ? (
        <VirtuosoGrid
          useWindowScroll
          components={{
            List: GridContainer,
          }}
          itemContent={renderShopItemContent}
          endReached={endReached}
          overscan={250}
          data={shopCollectibleCards}
        />
      ) : (
        <VirtuosoGrid
          useWindowScroll
          components={{
            List: GridContainer,
          }}
          itemContent={renderMarketItemContent}
          endReached={endReached}
          overscan={250}
          data={collectiblesList || []}
        />
      )}
    </div>
  );
}
