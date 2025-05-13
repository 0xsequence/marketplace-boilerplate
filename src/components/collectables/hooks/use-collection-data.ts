import {
  useCollection,
  useCollectionBalanceDetails,
} from '@0xsequence/marketplace-sdk/react';
import type { Hex } from 'viem';

export const useCollectionData = (
  collectionAddress: Hex,
  chainId: number,
  accountAddress?: string,
  enabled?: boolean,
) => {
  const { data: collection, isLoading: collectionLoading } = useCollection({
    collectionAddress,
    chainId,
    query: {
      enabled,
    },
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

  return {
    collection,
    collectionLoading,
    collectionBalanceDetails,
    collectionBalanceDetailsLoading,
  };
};
