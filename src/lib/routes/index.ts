import { DEFAULT_NETWORK } from '~/config/consts';
import { getChainName } from '~/config/networks';

import { makeRoute } from './utils/makeRoute';
import { isAddress as viemIsAddress } from 'viem';
import { z } from 'zod';

const viewType = ['list', 'grid'] as const;
const ViewTypeEnum = z.enum(viewType);

const swapMode = ['buy', 'sell'] as const;
const swapModeEnum = z.enum(swapMode);

const isAddress = z.string().refine(viemIsAddress);

const chainParam = z.coerce.number().or(z.string());

const collectionId = isAddress;

const collectionParams = z.object({
  chainParam,
  collectionId,
  mode: swapModeEnum.optional(),
});

const tab = ['details', 'listings', 'offers'] as const;
const CollectibleTabEnum = z.enum(tab);

const collectibleParams = z.object({
  chainParam,
  collectionId,
  tokenId: z.string(),
  // tab: CollectibleTabEnum,
});

const chainToName = (chainParam: number | string) => {
  const chainName = getChainName(chainParam);
  return chainName ?? chainParam;
};

const inventoryParams = z.object({
  chainParam: chainParam.optional(),
  isConnected: z.boolean(),
  address: isAddress.optional(),
});

export const Routes = {
  // Landing
  landing: makeRoute(() => '/'),

  //collection
  collection: makeRoute(
    ({ chainParam, collectionId, mode }) =>
      `/collection/${chainToName(chainParam)}/${collectionId}/${mode}`,
    collectionParams,
  ),

  //collectible
  collectible: makeRoute(
    ({ chainParam, collectionId, tokenId }) =>
      `/collectible/${chainToName(chainParam)}/${collectionId}/${tokenId}`,
    collectibleParams,
  ),

  // inventory
  inventory: makeRoute(() => {
    return `/inventory`;
  }),

  terms: makeRoute(() => '/terms'),
  privacy: makeRoute(() => '/privacy'),
};
