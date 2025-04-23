'use client';

import CustomSkeleton from '~/components/custom-skeleton/CustomSkeleton';
import { Grid } from '~/components/ui';
import { useIsMinWidth } from '~/hooks/ui/useIsMinWidth';

import { Image, Text } from '@0xsequence/design-system';
import { formatPrice, OrderSide } from '@0xsequence/marketplace-sdk';
import {
  useCountOfCollectables,
  useCurrencies,
  useFloorOrder,
} from '@0xsequence/marketplace-sdk/react/hooks';
import { useParams } from 'next/navigation';
import type { Hex } from 'viem';

const Metrics = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;

  const { isLoading: isTotalLoading, data: total } = useCountOfCollectables({
    chainId,
    collectionAddress,
  });

  const {
    isLoading: isListedCollectiblesCountLoading,
    data: listedCollectiblesCount,
  } = useCountOfCollectables({
    chainId,
    collectionAddress,
    filter: {
      includeEmpty: false,
    },
    side: OrderSide.listing,
  });

  const isMd = useIsMinWidth('@md');
  const metricsTemplate = isMd
    ? `"collection-metrics-listed collection-metrics-floor collection-metrics-volume collection-metrics-owners" auto
            / auto auto auto auto`
    : `[row1-start] "collection-metrics-listed collection-metrics-floor" auto [row1-end]
            [row2-start] "collection-metrics-volume collection-metrics-owners" auto [row2-end]`;

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
              {listedCollectiblesCount} / {total}
            </Text>
          )}
        </Grid.Child>

        <FloorPriceMetric />
      </Grid.Root>
    </Grid.Child>
  );
};

const FloorPriceMetric = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;

  const { isLoading: isFloorLoading, data: floor } = useFloorOrder({
    chainId,
    collectionAddress,
  });

  const { isLoading: isCurrenciesLoading, data: currencies } = useCurrencies({
    chainId,
  });

  const floorCurrency = currencies?.find(
    (currency) =>
      currency.contractAddress === floor?.order?.priceCurrencyAddress,
  );
  if (isFloorLoading || isCurrenciesLoading) {
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
