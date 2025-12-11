import { useState, useEffect } from 'react';

import { useOpenConnectModal } from '@0xsequence/connect';
import { useBuyModal } from '@0xsequence/marketplace-sdk/react';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';

type SalePrice = {
  amount: bigint;
  currencyAddress: Address;
};

interface UseBuyHandlerProps {
  chainId: number;
  collectionAddress: Address;
  salesContractAddress: Address;
  quantity: number;
  salePrice: SalePrice;
  supplyCap: number;
  tokenId: bigint;
}

export const useBuyHandler = ({
  chainId,
  collectionAddress,
  salesContractAddress,
  quantity,
  salePrice,
  supplyCap,
  tokenId,
}: UseBuyHandlerProps) => {
  const { show: showBuyModal } = useBuyModal();
  const { setOpenConnectModal } = useOpenConnectModal();
  const { isConnected } = useAccount();
  const [cachedBuyAction, setCachedBuyAction] =
    useState<UseBuyHandlerProps | null>(null);

  const handleBuy = () => {
    if (!supplyCap) return;

    const buyParams = {
      chainId,
      collectionAddress,
      salesContractAddress,
      quantity,
      salePrice,
      supplyCap,
      tokenId,
    };

    if (!isConnected) {
      setCachedBuyAction(buyParams);
      setOpenConnectModal(true);
      return;
    }

    showBuyModal({
      chainId: buyParams.chainId,
      collectionAddress: buyParams.collectionAddress,
      salesContractAddress: buyParams.salesContractAddress,
      cardType: 'shop',
      quantityRemaining: BigInt(supplyCap),
      hideQuantitySelector: true,
      item: {
        tokenId: buyParams.tokenId,
        quantity: BigInt(buyParams.quantity),
      },
      salePrice: {
        amount: buyParams.salePrice.amount,
        currencyAddress: buyParams.salePrice.currencyAddress,
      },
    });
  };

  useEffect(() => {
    if (isConnected && cachedBuyAction) {
      showBuyModal({
        chainId: cachedBuyAction.chainId,
        collectionAddress: cachedBuyAction.collectionAddress,
        salesContractAddress: cachedBuyAction.salesContractAddress,
        hideQuantitySelector: true,
        cardType: 'shop',
        quantityRemaining: BigInt(supplyCap),
        item: {
          tokenId: cachedBuyAction.tokenId,
          quantity: BigInt(cachedBuyAction.quantity),
        },
        salePrice: {
          amount: cachedBuyAction.salePrice.amount,
          currencyAddress: cachedBuyAction.salePrice.currencyAddress,
        },
      });
      setCachedBuyAction(null);
    }
  }, [isConnected, cachedBuyAction, showBuyModal, supplyCap]);

  return {
    handleBuy,
    isConnected,
  };
};
