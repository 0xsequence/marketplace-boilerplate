'use client';

import { Grid } from '~/components/grid';
import CustomSkeleton from '~/components/skeleton';
import { useIsMinWidth } from '~/hooks/ui/use-is-min-width';
import { useMarketplaceCollection } from '~/hooks/use-marketplace-collection';
import { getCollectionAddress } from '~/lib/utils';
import type { MarketplaceType } from '~/types';

import { Image, Text } from '@0xsequence/design-system';
import { formatPrice, OrderSide } from '@0xsequence/marketplace-sdk';
import {
  useCountOfCollectables,
  useCurrency,
  useFilterState,
  useFloorOrder,
} from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import type { Address } from 'viem';

const Metrics = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const marketplaceType = params.marketplaceType as MarketplaceType;
  const collectionData = useMarketplaceCollection(marketplaceType);
  const marketplaceCollection = collectionData.data;
  const collectionAddress = getCollectionAddress({
    collection: marketplaceCollection || null,
    marketplaceType: params.marketplaceType as MarketplaceType,
  });

  const { filterOptions, searchText, priceFilters } = useFilterState();

  const { isLoading: isTotalLoading, data: total } = useCountOfCollectables({
    chainId,
    collectionAddress,
  });

  const convertedPriceFilters = priceFilters.map((filter) => ({
    contractAddress: filter.contractAddress,
    min: filter.min ? BigInt(filter.min) : undefined,
    max: filter.max ? BigInt(filter.max) : undefined,
  }));

  const {
    isLoading: isListedCollectiblesCountLoading,
    data: listedCollectiblesCount,
  } = useCountOfCollectables({
    chainId,
    collectionAddress,
    filter: {
      includeEmpty: false,
      searchText,
      properties: filterOptions,
      prices: convertedPriceFilters,
    },
    side: OrderSide.listing,
  });

  const isMd = useIsMinWidth('@md');
  const metricsTemplate = isMd
    ? `"collection-metrics-listed collection-metrics-floor collection-metrics-volume collection-metrics-owners" auto
            / auto auto auto auto`
    : `[row1-start] "collection-metrics-listed collection-metrics-floor" auto [row1-end]
            [row2-start] "collection-metrics-volume collection-metrics-owners" auto [row2-end]`;

  const hasListings =
    !isListedCollectiblesCountLoading && (listedCollectiblesCount ?? 0) > 0;

  return (
    <Grid.Child name="collection-metrics" className="col-span-2">
      <Grid.Root template={metricsTemplate} className="gap-x-3 justify-start">
        <Grid.Child
          name="collection-metrics-listed"
          className="flex items-center gap-1"
        >
          <Text className="text-sm text-muted">Listed:</Text>

          {isListedCollectiblesCountLoading || isTotalLoading ? (
            <div className="flex w-16">
              <CustomSkeleton />
            </div>
          ) : (
            <Text className="text-sm text-secondary">
              {listedCollectiblesCount ?? 0} / {total ?? 0}
            </Text>
          )}
        </Grid.Child>

        {hasListings && <FloorPriceMetric />}
      </Grid.Root>
    </Grid.Child>
  );
};

const FloorPriceMetric = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const marketplaceType = params.marketplaceType as MarketplaceType;
  const collectionData = useMarketplaceCollection(marketplaceType);
  const marketplaceCollection = collectionData.data;
  const collectionAddress = getCollectionAddress({
    collection: marketplaceCollection || null,
    marketplaceType: params.marketplaceType as MarketplaceType,
  });

  const { isLoading: isFloorLoading, data: floor } = useFloorOrder({
    chainId,
    collectionAddress: collectionAddress,
  });
  const { isLoading: isCurrencyLoading, data: floorCurrency } = useCurrency({
    chainId,
    currencyAddress: (floor?.order?.priceCurrencyAddress ?? '') as Address,
  });

  if (isFloorLoading || isCurrencyLoading) {
    return (
      <div className="flex w-16">
        <CustomSkeleton />
      </div>
    );
  }

  if (!floor || !floorCurrency) {
    return null;
  }

  return (
    <Grid.Child
      name="collection-metrics-floor"
      className="flex items-center gap-1 pr-3 border-l border-primary/15 pl-3"
    >
      <Text className="text-sm text-muted">Floor:</Text>

      <div className="text-sm text-secondary">
        {floor?.order?.priceAmount ? (
          <div className="flex items-center gap-1">
            {floorCurrency.imageUrl && (
              <Image
                src={floorCurrency.imageUrl}
                alt={floorCurrency.symbol}
                className="rounded-full w-4 h-4"
              />
            )}
            <span>
              {formatPrice(
                BigInt(floor.order.priceAmount),
                floorCurrency.decimals,
              )}
            </span>

            <span>{floorCurrency.symbol}</span>
          </div>
        ) : (
          'N/A'
        )}
      </div>
    </Grid.Child>
  );
};

export default Metrics;
