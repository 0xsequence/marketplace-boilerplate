// TODO: Remove this hook when new indexer balance endpoints support tokenId filter

'use client';

import { ERC1155_ABI } from '@0xsequence/marketplace-sdk';
import { useAccount, useReadContract } from 'wagmi';

type Use1155BalanceParams = {
  collectionAddress: `0x${string}`;
  chainId: number;
  tokenId: string | number | bigint;
  accountAddress?: `0x${string}`;
};

type Use1155BalanceReturn = {
  balance: bigint | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export function use1155Balance({
  collectionAddress,
  chainId,
  tokenId,
  accountAddress: providedAccountAddress,
}: Use1155BalanceParams): Use1155BalanceReturn {
  const { address: connectedAddress } = useAccount();
  const accountAddress = providedAccountAddress || connectedAddress;

  const {
    data: balance,
    isLoading,
    isError,
    error,
  } = useReadContract({
    address: collectionAddress,
    abi: ERC1155_ABI,
    functionName: 'balanceOf',
    args: accountAddress ? [accountAddress, BigInt(tokenId)] : undefined,
    chainId,
    query: {
      enabled: !!accountAddress && !!collectionAddress && !!chainId,
    },
  });

  return {
    balance,
    isLoading,
    isError,
    error: error as Error | null,
  };
}
