'use client';

import type { MarketCollection, ShopCollection } from '~/lib/types';
import type { CollectionParams, MarketplaceType } from '~/types';

import { compareAddress } from '@0xsequence/marketplace-sdk';
import { useMarketplaceConfig } from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';

export function useMarketplaceCollection(marketplaceType: 'market'): {
  data: MarketCollection | undefined;
  isLoading: boolean;
  isError: boolean;
};

export function useMarketplaceCollection(marketplaceType: 'shop'): {
  data: ShopCollection | undefined;
  isLoading: boolean;
  isError: boolean;
};

export function useMarketplaceCollection(marketplaceType: MarketplaceType): {
  data: MarketCollection | ShopCollection | undefined;
  isLoading: boolean;
  isError: boolean;
};

export function useMarketplaceCollection(marketplaceType: MarketplaceType): {
  data: MarketCollection | ShopCollection | undefined;
  isLoading: boolean;
  isError: boolean;
} {
  const params = useParams() as unknown as CollectionParams;

  const contractAddress = params.contractAddress;
  const chainId = params.chainId;

  const {
    data: marketplaceConfig,
    isLoading: marketplaceConfigLoading,
    isError: marketplaceConfigError,
  } = useMarketplaceConfig();

  let marketplaceCollection = undefined;

  if (marketplaceType === 'market') {
    const marketCollection = marketplaceConfig?.market.collections.find(
      (c) =>
        compareAddress(c.itemsAddress, contractAddress) &&
        Number(c.chainId) === Number(chainId),
    );

    marketplaceCollection = marketCollection;
  }

  if (marketplaceType === 'shop') {
    const shopCollection = marketplaceConfig?.shop.collections.find(
      (c) =>
        compareAddress(c.saleAddress, contractAddress) &&
        Number(c.chainId) === Number(chainId),
    );

    marketplaceCollection = shopCollection;
  }

  return {
    data: marketplaceCollection,
    isLoading: marketplaceConfigLoading,
    isError: marketplaceConfigError,
  } as const;
}

export default useMarketplaceCollection;
