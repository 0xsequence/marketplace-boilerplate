'use client';

import CopyButton from '~/components/copy-button';
import { truncateMiddle } from '~/lib/truncate';

import { useInventory } from './inventory-context';
import { GradientAvatar, Skeleton, Text } from '@0xsequence/design-system';
import { useAccount } from 'wagmi';

const InventoryHeader = () => {
  const { address } = useAccount();
  const { balances, totalCollections } = useInventory();

  const balancesFetched =
    Object.values(balances).filter((balance) => balance.fetched).length ===
      totalCollections && totalCollections > 0;

  const collectiblesCount = Object.values(balances).reduce(
    (acc, collection) => {
      const collectionTotal = collection.balance.reduce((itemSum, item) => {
        if (collection.decimals && collection.decimals > 0) {
          return itemSum + item.balance / 10 ** collection.decimals;
        }
        return itemSum + item.balance;
      }, 0);

      return acc + collectionTotal;
    },
    0,
  );

  const collectionsCount = Object.values(balances).filter((collection) =>
    collection.balance.some((item) => item.balance > 0),
  ).length;

  if (!address) {
    return null;
  }

  return (
    <div className="flex w-full items-center gap-5">
      <GradientAvatar size="xl" address={address.toLowerCase()} />

      <div className="flex flex-col gap-2 justify-between">
        <div className="flex items-center gap-1">
          <Text className="text-xl font-bold text-primary">
            {truncateMiddle(address, 4, 4)}
          </Text>

          <CopyButton textToCopy={address} className="p-0 w-7 h-7" />
        </div>

        <div className="flex items-center">
          {!balancesFetched && (
            <>
              <Skeleton className="w-16 h-5" />

              <Skeleton className="w-16 h-5 ml-4" />
            </>
          )}

          {balancesFetched && (
            <>
              <Text className="text-sm text-muted mr-1">Collections:</Text>

              <Text className="text-sm text-secondary">{collectionsCount}</Text>

              <Text className="text-sm text-muted border-l border-border-normal mr-1 ml-3 pl-3">
                Collectibles: {` `}
              </Text>

              <Text className="text-sm text-secondary">
                {collectiblesCount}
              </Text>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryHeader;
