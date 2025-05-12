'use client';

import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { VirtuosoGrid } from 'react-virtuoso';

import { cn } from '~/lib/utils';

import { GridContainer } from './GridContainer';
import { Button, Text } from '@0xsequence/design-system';
import type {
  CollectibleOrder,
  ContractType,
  Order,
} from '@0xsequence/marketplace-sdk';
import {
  useCollectionBalanceDetails,
  CollectibleCard,
  useCollection,
  useSellModal,
} from '@0xsequence/marketplace-sdk/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Hex } from 'viem';
import { useAccount } from 'wagmi';

type CollectiblesGridProps = {
  collectionAddress: Hex;
  chainId: number;
  collectiblesList: CollectibleOrder[];
  collectiblesListLoading: boolean;
  endReached?: () => void;
  limit?: number;
};

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex flex-col items-end justify-center p-4 rounded-md border border-error bg-error-light h-full w-full">
      <Text className="text-negative text-sm font-medium mb-2">
        Failed to load collectible
      </Text>
      <Text className="text-xs text-muted mb-4 max-w-xs text-left">
        {error.message || 'An unexpected error occurred'}
      </Text>
      <Button
        size="xs"
        label="Try again"
        onClick={resetErrorBoundary}
        className="rounded-full text-primary px-3"
      />
    </div>
  );
}

export function CollectiblesGrid({
  collectionAddress,
  chainId,
  endReached,
  collectiblesList: collectibleOrders,
  collectiblesListLoading: collectibleOrdersLoading,
  limit,
}: CollectiblesGridProps) {
  const { address: accountAddress } = useAccount();
  const router = useRouter();
  const [limitPage, setLimitPage] = useState<number>(1);
  const { data: collection, isLoading: collectionLoading } = useCollection({
    collectionAddress,
    chainId,
  });
  const {
    data: collectionBalanceDetails,
    isLoading: collectionBalanceDetailsLoading,
  } = useCollectionBalanceDetails({
    chainId,
    filter: {
      accountAddresses: accountAddress ? [accountAddress] : [],
      contractWhitelist: [collectionAddress],
      omitNativeBalances: true,
    },
    query: {
      enabled: !!accountAddress,
    },
  });
  const { show: showSellModal } = useSellModal();

  function renderItemContent({
    index,
    collectibleOrder,
    totalItems,
  }: {
    index: number;
    collectibleOrder: CollectibleOrder;
    totalItems: number;
  }) {
    if (
      limit &&
      index === limitPage * limit - 1 &&
      totalItems > limitPage * limit
    ) {
      return (
        <div
          className={cn(
            'flex h-[300px]',
            'flex-col items-center justify-center ',
            'rounded-xl bg-transparent border border-border-normal outline-2 outline-transparent',
          )}
        >
          <Text className="text-center text-sm font-bold text-muted mb-4">
            {totalItems - limitPage * limit + 1} more items
          </Text>

          <Button
            size="xs"
            label="View more"
            onClick={() => setLimitPage(limitPage + 1)}
            className="rounded-full text-primary px-3"
          />
        </div>
      );
    }

    function handleOfferClick(offer?: Order) {
      if (!offer) {
        return;
      }

      const orderCreatedByAccount =
        offer.createdBy === accountAddress?.toLowerCase();

      const tokenId = collectibleOrder.metadata.tokenId;

      if (!orderCreatedByAccount) {
        showSellModal({
          chainId,
          collectionAddress,
          tokenId,
          order: {
            ...offer,
            priceUSDFormatted: offer.priceUSD?.toString() || '0',
          },
        });
      } else {
        router.push(
          `/${String(chainId)}/${collectionAddress}/${tokenId}/offers`,
        );
      }
    }

    if (limit && index >= limit * limitPage) {
      return null;
    }

    return (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error) => {
          console.error('Collectible card error:', error);
        }}
        key={`${collectionAddress}-${collectibleOrder.metadata.tokenId}`}
      >
        <Link
          href={`/${String(chainId)}/${collectionAddress}/${collectibleOrder.metadata.tokenId}/details`}
          className="cursor-pointer"
        >
          <CollectibleCard
            key={collectibleOrder.metadata.tokenId}
            collectibleId={collectibleOrder.metadata.tokenId}
            chainId={chainId}
            balanceIsLoading={collectionBalanceDetailsLoading}
            collectionAddress={collectionAddress}
            collectionType={collection?.type as ContractType}
            collectible={collectibleOrder}
            onOfferClick={({ order }) => handleOfferClick(order)}
            balance={
              collectionBalanceDetails?.balances?.find(
                (balance) =>
                  balance.tokenID === collectibleOrder.metadata.tokenId,
              )?.balance
            }
            cardLoading={
              collectibleOrdersLoading ||
              collectionLoading ||
              (accountAddress && collectionBalanceDetailsLoading)
            }
          />
        </Link>
      </ErrorBoundary>
    );
  }

  return (
    <div className="@container collectibles-grid">
      <VirtuosoGrid
        useWindowScroll
        components={{
          List: GridContainer,
        }}
        itemContent={(index: number, collectibleOrder: CollectibleOrder) =>
          renderItemContent({
            index,
            collectibleOrder,
            totalItems: collectibleOrders.length,
          })
        }
        endReached={endReached}
        overscan={250}
        data={
          limit
            ? collectibleOrders.slice(0, limitPage * limit)
            : collectibleOrders
        }
      />
    </div>
  );
}
