import storeConfig from '~/store-config';

import { getMetadataClient } from './getMetadataClient';
import type {
  MarketplaceConfig,
  MarketplaceType,
  SdkConfig,
} from '@0xsequence/marketplace-sdk';
import {
  useConfig,
  useMarketplaceConfig,
} from '@0xsequence/marketplace-sdk/react';
import { queryOptions, useQuery } from '@tanstack/react-query';

type FetchListCollectionsArgs = {
  marketplaceConfig: MarketplaceConfig;
  marketplaceType: MarketplaceType;
  // query?: TODO: Add query
};

const fetchListCollections = async (
  { marketplaceConfig, marketplaceType }: FetchListCollectionsArgs,
  config: SdkConfig,
) => {
  const metadataClient = getMetadataClient(config);
  const shopConfig = storeConfig.shop;

  const collections =
    marketplaceType === 'shop'
      ? storeConfig.shop.collections
      : marketplaceConfig.collections;

  if (!collections?.length) {
    return [];
  }

  // Group collections by chainId
  const collectionsByChain = collections.reduce<Record<string, string[]>>(
    (acc, curr) => {
      const { chainId, address } = curr;
      if (!acc[chainId]) {
        acc[chainId] = [];
      }
      acc[chainId].push(address);
      return acc;
    },
    {},
  );

  // Fetch collections for each chain
  const promises = Object.entries(collectionsByChain).map(
    ([chainId, addresses]) =>
      metadataClient
        .getContractInfoBatch({
          chainID: chainId,
          contractAddresses: addresses,
        })
        .then((resp) => Object.values(resp.contractInfoMap)),
  );

  const results = await Promise.all(promises);
  const metadataInfos = results.flat();

  return collections.map((collection) => {
    const address = collection.address.toLowerCase();
    const metadataInfo = metadataInfos.find(
      (info) => info.address?.toLowerCase() === address,
    )!;

    return {
      ...collection,
      ...metadataInfo,
    };
  });
};

export const listCollectionsOptions = (
  args: FetchListCollectionsArgs,
  config: SdkConfig,
) => {
  return queryOptions({
    // TODO: Add query key
    queryKey: ['collections', args.marketplaceType],
    queryFn: () => fetchListCollections(args, config),
  });
};

export const useListCollections = ({
  marketplaceType,
}: {
  marketplaceType: MarketplaceType;
}) => {
  const config = useConfig();
  const { data: marketplaceConfig, isLoading: isLoadingConfig } =
    useMarketplaceConfig();

  return useQuery({
    ...listCollectionsOptions(
      { marketplaceConfig: marketplaceConfig!, marketplaceType },
      config,
    ),
    enabled: !isLoadingConfig && !!marketplaceConfig,
  });
};
