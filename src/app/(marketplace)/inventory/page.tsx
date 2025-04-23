'use client';

import { useEffect } from 'react';

import GridOutlineIcon from '~/components/icons/GridOutlineIcon';

import CollectionBalance from './_components/CollectionBalance';
import ConnectWalletPrompt from './_components/ConnectWalletPrompt';
import InventoryControls from './_components/Controls';
import InventoryHeader from './_components/Header';
import {
  InventoryProvider,
  useInventory,
} from './_components/InventoryContext';
import { Text } from '@0xsequence/design-system';
import { useMarketplaceConfig } from '@0xsequence/marketplace-sdk/react';
import type { Address } from 'viem';
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
  // count of balances that are fetched is equal to the total number of collections
  const allBalancesFetched =
    Object.values(balances).filter((balance) => balance.fetched).length ===
    config?.collections?.length;
  console.log(balances);
  useEffect(() => {
    if (!config?.collections) {
      return;
    }

    const collectionsLength = config.collections.length;

    if (totalCollections !== collectionsLength) {
      setTotalCollections(collectionsLength);
    }
  }, [config?.collections, totalCollections, setTotalCollections]);

  const isEmpty =
    Object.values(balances).every((balance) =>
      balance.balance.every((item) => item.balance === 0),
    ) && allBalancesFetched;

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

      {/*!allBalancesFetched && (
        <div className="flex items-center justify-center">
          <Spinner label="Loading Inventory Collectibles" />
        </div>
      )*/}

      {!isEmpty && allBalancesFetched && <InventoryControls />}

      {isEmpty && <EmptyInventory />}

      {!isEmpty &&
        config?.collections?.map((collection) => (
          <CollectionBalance
            key={collection.address}
            collectionAddress={collection.address as Address}
          />
        ))}
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
