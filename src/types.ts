import type { Address } from 'viem';

export type MarketplaceType = 'market' | 'shop';

export type CollectionParams = {
  chainId: number;
  contractAddress: Address;
  marketplaceType: MarketplaceType;
};
