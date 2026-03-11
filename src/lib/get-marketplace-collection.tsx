'use server';

import { ssrClient } from '~/app/marketplace-sdk/ssr';
import type { MarketplaceType } from '~/types';

import type { MarketCollection, ShopCollection } from './types';
import type { Address } from 'viem';

type GetMarketplaceCollectionParams = {
  params: {
    marketplaceType: MarketplaceType;
    contractAddress: Address;
    chainId: number;
  };
};

const getMarketplaceCollection = async ({
  params,
}: GetMarketplaceCollectionParams): Promise<
  MarketCollection | ShopCollection | null
> => {
  // contract address is collection address if marketplaceType is market, sales address if marketplaceType is shop
  const { marketplaceType, contractAddress, chainId } = params;
  const { getMarketplaceConfig } = await ssrClient();
  const marketplaceConfig = await getMarketplaceConfig();

  if (marketplaceType === 'market') {
    const marketCollection = marketplaceConfig.market.collections.find(
      (c) =>
        c.itemsAddress === contractAddress &&
        Number(c.chainId) === Number(chainId),
    );

    //marketCollection?.itemsAddress

    return marketCollection ?? null;
  }

  if (marketplaceType === 'shop') {
    const shopCollection = marketplaceConfig.shop.collections.find(
      (c) =>
        c.saleAddress === contractAddress &&
        Number(c.chainId) === Number(chainId),
    );

    return shopCollection ?? null;
  }

  return null;
};

export default getMarketplaceCollection;
