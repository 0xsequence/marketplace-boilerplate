import { useMemo, useCallback } from 'react';

import type {
  CollectibleCardAction,
  ContractType,
  Order,
} from '@0xsequence/marketplace-sdk';
import {
  useInventory,
  useSellModal,
  type CollectibleWithBalance,
} from '@0xsequence/marketplace-sdk/react';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';

type InventoryCollectible = CollectibleWithBalance;

interface CardBaseProps {
  chainId: number;
  collectionAddress: Address;
  collectionType: ContractType;
  marketplaceType: 'market';
  assetSrcPrefixUrl?: string;
  onCollectibleClick?: (tokenId: string) => void;
  onCannotPerformAction?: (action: CollectibleCardAction) => void;
}

interface UseListInventoryCardDataProps extends CardBaseProps {
  prioritizeOwnerActions?: boolean;
  query?: {
    enabled?: boolean;
  };
}

const useInventoryData = (props: {
  accountAddress: Address | undefined;
  collectionAddress: Address;
  chainId: number;
  enabled: boolean;
}) => {
  const { accountAddress, collectionAddress, chainId, enabled } = props;

  const inventoryQuery = useInventory({
    userAddress: accountAddress,
    collectionAddress,
    chainId,
    query: { enabled },
  });

  return {
    ...inventoryQuery,
    allCollectibles: inventoryQuery.data?.collectibles ?? [],
  };
};

const useCollectibleCards = (props: {
  allCollectibles: InventoryCollectible[];
  baseProps: CardBaseProps;
  isLoading: boolean;
  prioritizeOwnerActions: boolean;
}) => {
  const { allCollectibles, baseProps, isLoading, prioritizeOwnerActions } =
    props;
  const { address: accountAddress } = useAccount();
  const { show: showSellModal } = useSellModal();

  const handleOfferClick = useCallback(
    (collectible: InventoryCollectible) =>
      ({ order }: { order: Order | null }) => {
        if (!accountAddress || !order) return;

        showSellModal({
          chainId: baseProps.chainId,
          collectionAddress: baseProps.collectionAddress,
          tokenId: collectible.metadata.tokenId,
          order,
        });
      },
    [
      accountAddress,
      baseProps.chainId,
      baseProps.collectionAddress,
      showSellModal,
    ],
  );

  return useMemo(
    () =>
      allCollectibles.map((collectible) => ({
        ...baseProps,
        tokenId: collectible.metadata.tokenId,
        cardLoading: isLoading,
        collectible,
        balance: collectible.balance,
        balanceIsLoading: false,
        prioritizeOwnerActions,
        onOfferClick: handleOfferClick(collectible),
      })),
    [
      allCollectibles,
      baseProps,
      handleOfferClick,
      isLoading,
      prioritizeOwnerActions,
    ],
  );
};

export function useListInventoryCardData({
  collectionAddress,
  chainId,
  collectionType,
  onCollectibleClick,
  onCannotPerformAction,
  assetSrcPrefixUrl,
  prioritizeOwnerActions = true,
  query,
  marketplaceType = 'market',
}: UseListInventoryCardDataProps) {
  const { address: accountAddress } = useAccount();

  const enabled =
    !!accountAddress &&
    !!collectionAddress &&
    !!chainId &&
    (query?.enabled ?? true);

  const baseProps = useMemo(
    () => ({
      chainId,
      collectionAddress,
      collectionType,
      marketplaceType,
      onCollectibleClick,
      onCannotPerformAction,
      assetSrcPrefixUrl,
    }),
    [
      chainId,
      collectionAddress,
      collectionType,
      marketplaceType,
      onCollectibleClick,
      onCannotPerformAction,
      assetSrcPrefixUrl,
    ],
  );

  const { allCollectibles, isLoading, error, isSuccess } = useInventoryData({
    accountAddress,
    collectionAddress,
    chainId,
    enabled,
  });

  const collectibleCards = useCollectibleCards({
    allCollectibles,
    baseProps,
    isLoading,
    prioritizeOwnerActions,
  });

  return {
    collectibleCards,
    isLoading,
    error,
    allCollectibles,
    isSuccess,
  };
}
