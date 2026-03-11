'use client';

import { CloseIcon, Skeleton, Text } from '@0xsequence/design-system';
import {
  useCollectionActiveListingsCurrencies,
  useFilterState,
} from '@0xsequence/marketplace-sdk/react/hooks';
import { formatUnits, type Address } from 'viem';

// Define PriceFilter type locally since we can't import from internal SDK files
type PriceFilter = {
  contractAddress: string;
  min?: bigint;
  max?: bigint;
};

type PriceBadgeProps = {
  priceFilter: PriceFilter;
  chainId: number;
  collectionAddress: Address;
};

export const PriceBadge = ({
  priceFilter,
  chainId,
  collectionAddress,
}: PriceBadgeProps) => {
  const { setPriceFilter, setShowListedOnly, priceFilters } = useFilterState();
  const { data: currencies, isLoading: marketCurrenciesLoading } =
    useCollectionActiveListingsCurrencies({
      chainId,
      collectionAddress,
    });

  const currency = currencies?.find(
    (c) => c.contractAddress === priceFilter.contractAddress,
  );

  // Don't render until currency data is loaded to avoid showing unformatted prices
  if (marketCurrenciesLoading || !currency) {
    return <Skeleton className="h-7 w-16 mb-2 rounded-sm" />;
  }

  const decimals = currency.decimals;

  // Convert token amounts back to user-friendly decimal values
  const minDecimal = priceFilter.min
    ? Number(formatUnits(priceFilter.min, decimals))
    : undefined;
  const maxDecimal = priceFilter.max
    ? Number(formatUnits(priceFilter.max, decimals))
    : undefined;

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPriceRange = () => {
    if (minDecimal !== undefined && maxDecimal !== undefined) {
      return `${formatNumber(minDecimal)} - ${formatNumber(maxDecimal)}`;
    }
    if (minDecimal !== undefined) {
      return `> ${formatNumber(minDecimal)}`;
    }
    if (maxDecimal !== undefined) {
      return `< ${formatNumber(maxDecimal)}`;
    }
    return '';
  };

  const handleRemove = () => {
    void setPriceFilter(priceFilter.contractAddress);
    // Only set showListedOnly to false if this is the last price filter
    if (priceFilters.length === 1) {
      void setShowListedOnly(false);
    }
  };

  return (
    <div className="flex items-center h-7 capitalize rounded-[8px] px-2 py-1 text-primary border border-background-secondary">
      <Text className="mr-1 text-xs" color="text50" fontWeight="bold">
        Price:
      </Text>

      <div className="flex items-center gap-1">
        {currency?.imageUrl ? (
          <img
            src={currency.imageUrl}
            alt={currency.symbol}
            className="h-3 w-3 rounded-full"
          />
        ) : (
          <div className="h-3 w-3 rounded-full border border-gray-400"></div>
        )}
        <Text className="text-xs" color="text100" fontWeight="bold">
          {formatPriceRange()} {currency?.symbol || ''}
        </Text>
      </div>

      <CloseIcon
        className="ml-2 h-4 w-4 cursor-pointer"
        onClick={handleRemove}
      />
    </div>
  );
};
