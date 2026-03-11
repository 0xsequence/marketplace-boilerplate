'use client';

import { useEffect } from 'react';

import GridOutlineIcon from '~/components/icons/grid-outline-icon';

import CollectionBalance from './_components/collection-balance';
import ConnectWalletPrompt from './_components/connect-wallet-prompt';
import InventoryControls from './_components/controls1';
import InventoryHeader from './_components/header1';
import {
  InventoryProvider,
  useInventory,
} from './_components/inventory-context';
import { Text } from '@0xsequence/design-system';
import { useMarketplaceConfig } from '@0xsequence/marketplace-sdk/react';
import { useAccount } from 'wagmi';

const EmptyInventory = () => (
  <div className="flex items-center justify-center flex-col gap-4 mt-10">
    <GridOutlineIcon className="w-7 h-7 text-muted" />

    <Text className="text-sm text-muted font-bold">No inventory to show</Text>
  </div>
);

const InventoryPageContent = () => {
  const { address: accountAddress } = useAccount();
  const { data: config } = useMarketplaceConfig();
  const { balances, totalCollections, setTotalCollections } = useInventory();

  const marketCollections = config?.market.collections || [];
  const allShopCollections = config?.shop.collections || [];

  // Filter out collections from shopCollections that already exist in marketCollections
  const shopCollections = allShopCollections.filter(
    (shopCollection, index, self) => {
      const existsInMarket = marketCollections.some(
        (marketCollection) =>
          marketCollection.chainId === shopCollection.chainId &&
          marketCollection.itemsAddress.toLowerCase() ===
            shopCollection.itemsAddress.toLowerCase(),
      );

      if (existsInMarket) return false;

      const firstIndex = self.findIndex(
        (c) =>
          c.chainId === shopCollection.chainId &&
          c.itemsAddress.toLowerCase() ===
            shopCollection.itemsAddress.toLowerCase(),
      );

      return firstIndex === index;
    },
  );
  const collectionsLength = marketCollections.length + shopCollections.length;
  const fetchedCount = Object.values(balances).filter(
    (balance) => balance.fetched,
  ).length;
  const allBalancesFetched =
    collectionsLength > 0 && fetchedCount === collectionsLength;

  useEffect(() => {
    if (!config?.market.collections) {
      return;
    }

    if (totalCollections !== collectionsLength) {
      setTotalCollections(collectionsLength);
    }
  }, [
    config?.market.collections,
    totalCollections,
    setTotalCollections,
    collectionsLength,
  ]);

  const isEmpty =
    Object.values(balances).every((balance) =>
      balance.balance.every((item) => item.balance === 0),
    ) && allBalancesFetched;

  const hasTokensInCollection = (
    collectionAddress: string,
    chainId: number,
  ) => {
    const key = `${chainId}-${collectionAddress.toLowerCase()}`;
    const balance = balances[key];
    return balance?.fetched && balance.balance.some((item) => item.balance > 0);
  };
  const hasTradableTokens = marketCollections.some((collection) =>
    hasTokensInCollection(collection.itemsAddress, collection.chainId),
  );
  const hasNonTradableTokens = shopCollections.some((collection) =>
    hasTokensInCollection(collection.itemsAddress, collection.chainId),
  );

  if (!accountAddress) {
    return <ConnectWalletPrompt />;
  }

  return (
    <div
      className="flex flex-col gap-y-8 md:gap-y-10!"
      style={{
        minHeight: 'calc(100vh - var(--headerHeight) - 80px)',
      }}
    >
      <InventoryHeader />

      {!isEmpty && allBalancesFetched && <InventoryControls />}

      {isEmpty && <EmptyInventory />}

      {!isEmpty && (
        <div className="flex flex-col gap-y-4">
          {allBalancesFetched &&
            hasTradableTokens &&
            shopCollections.length !== 0 && (
              <Text className="text-sm text-muted font-bold">
                Tradable Collectibles
              </Text>
            )}
          {marketCollections?.map((collection) => (
            <CollectionBalance
              key={`${collection.chainId}-${collection.itemsAddress}`}
              cardType="market"
              collectionAddress={collection.itemsAddress}
              chainId={collection.chainId}
              isTradable={true}
            />
          ))}
        </div>
      )}

      {!isEmpty && shopCollections.length !== 0 && (
        <div className="flex flex-col gap-y-4">
          {allBalancesFetched && hasNonTradableTokens && (
            <Text className="text-sm text-muted font-bold">
              Non-Tradable Collectibles
            </Text>
          )}
          {shopCollections?.map((collection) => {
            return (
              <CollectionBalance
                key={`${collection.chainId}-${collection.itemsAddress}`}
                cardType="inventory-non-tradable"
                collectionAddress={collection.itemsAddress}
                chainId={collection.chainId}
                isTradable={false}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const InventoryPage = () => {
  return (
    <InventoryProvider>
      <InventoryPageContent />
    </InventoryProvider>
  );
};

export default InventoryPage;

export const runtime = 'edge';
