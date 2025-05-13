import { useCallback } from 'react';

import type { Order } from '@0xsequence/marketplace-sdk';
import { useSellModal } from '@0xsequence/marketplace-sdk/react';
import { useRouter } from 'next/navigation';
import type { Hex } from 'viem';
import { useAccount } from 'wagmi';

/**
 * Hook for handling offer clicks in marketplace collectibles
 */
export const useOfferClick = (collectionAddress: Hex, chainId: number) => {
  const { address: accountAddress } = useAccount();
  const router = useRouter();
  const { show: showSellModal } = useSellModal();

  const handleOfferClick = useCallback(
    (offer?: Order, tokenId?: string) => {
      if (!offer) return;

      const orderCreatedByAccount =
        offer.createdBy === accountAddress?.toLowerCase();

      if (!orderCreatedByAccount && tokenId) {
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
          `/market/${String(chainId)}/${collectionAddress}/${tokenId}/offers`,
        );
      }
    },
    [accountAddress, chainId, collectionAddress, router, showSellModal],
  );

  return {
    handleOfferClick,
  };
};
