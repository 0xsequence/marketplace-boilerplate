import type { MarketplaceConfig } from '@0xsequence/marketplace-sdk';

//TODO: this should be exported from marketplace-sdk
export type MarketCollection =
  MarketplaceConfig['market']['collections'][number];

export type ShopCollection = MarketplaceConfig['shop']['collections'][number];
