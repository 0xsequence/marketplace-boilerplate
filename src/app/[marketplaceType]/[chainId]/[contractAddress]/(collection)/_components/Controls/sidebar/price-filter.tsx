'use client';

import { useEffect, useState } from 'react';

import { cn } from '~/lib/utils';

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Text,
} from '@0xsequence/design-system';
import { type Currency } from '@0xsequence/marketplace-sdk';
import {
  useFilterState,
  useCollectionActiveListingsCurrencies,
} from '@0xsequence/marketplace-sdk/react';
import { formatUnits, parseUnits, type Address } from 'viem';

export function PriceFilter({
  chainId,
  collectionAddress,
}: {
  chainId: number;
  collectionAddress: Address;
}) {
  const { data: currencies, isLoading: currenciesLoading } =
    useCollectionActiveListingsCurrencies({
      chainId,
      collectionAddress,
    });

  const { setPriceFilter, getPriceFilter, setShowListedOnly } =
    useFilterState();

  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  // Initialize selected currency when currencies load
  useEffect(() => {
    if (currencies && currencies.length > 0 && !selectedCurrency) {
      setSelectedCurrency(currencies[0]?.contractAddress || '');
    }
  }, [currencies, selectedCurrency]);

  // Load existing price filter if it exists
  useEffect(() => {
    if (selectedCurrency && currencies) {
      const existingFilter = getPriceFilter(selectedCurrency);
      if (existingFilter) {
        const selectedCurrencyData = currencies.find(
          (c: Currency) => c.contractAddress === selectedCurrency,
        );
        const decimals = selectedCurrencyData?.decimals || 0;

        const minDecimal = existingFilter.min
          ? formatUnits(BigInt(existingFilter.min), decimals)
          : '';
        const maxDecimal = existingFilter.max
          ? formatUnits(BigInt(existingFilter.max), decimals)
          : '';

        setMinPrice(minDecimal);
        setMaxPrice(maxDecimal);
      } else {
        setMinPrice('');
        setMaxPrice('');
      }
    }
  }, [selectedCurrency, currencies, getPriceFilter]);

  const validatePrices = (min: string, max: string): string => {
    if (min && max) {
      const minNum = Number.parseFloat(min);
      const maxNum = Number.parseFloat(max);

      if (Number.isNaN(minNum) || Number.isNaN(maxNum)) {
        return 'Please enter valid numbers';
      }

      if (minNum < 0 || maxNum < 0) {
        return 'Prices must be positive';
      }

      if (minNum > maxNum) {
        return 'Minimum price cannot be greater than maximum price';
      }
    }

    if (min && Number.isNaN(Number.parseFloat(min))) {
      return 'Please enter a valid minimum price';
    }

    if (max && Number.isNaN(Number.parseFloat(max))) {
      return 'Please enter a valid maximum price';
    }

    return '';
  };

  const handleApplyFilter = () => {
    const error = validatePrices(minPrice, maxPrice);

    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError('');

    if (selectedCurrency && currencies) {
      const selectedCurrencyData = currencies.find(
        (c: Currency) => c.contractAddress === selectedCurrency,
      );
      const decimals = selectedCurrencyData?.decimals || 0;

      // Convert user-friendly decimal values to actual token amounts
      const minTokenAmount = minPrice
        ? parseUnits(minPrice, decimals)
        : undefined;
      const maxTokenAmount = maxPrice
        ? parseUnits(maxPrice, decimals)
        : undefined;

      setPriceFilter(
        selectedCurrency,
        minTokenAmount?.toString(),
        maxTokenAmount?.toString(),
      );

      void setShowListedOnly(true);
    }
  };

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
    setMinPrice('');
    setMaxPrice('');
    setValidationError('');
  };

  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
    setValidationError('');
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
    setValidationError('');
  };

  if (currenciesLoading) {
    return (
      <div className="border-b border-border-normal pb-4 mb-4 flex flex-col">
        <Skeleton className="h-4 w-8 mb-2 rounded-sm" />

        <Skeleton className="w-full h-[52px] rounded-md mb-4" />

        <div className="flex items-center justify-between gap-2">
          <Skeleton className="w-20 h-[34px] rounded-md" />
          <Skeleton className="w-20 h-[34px] rounded-md" />
        </div>

        <Skeleton className="w-full h-7 rounded-md mt-4" />
      </div>
    );
  }

  if (currencies && currencies.length > 0) {
    return (
      <div className="border-b border-border-normal pb-4 mb-4 flex flex-col">
        <Text className="text-xs text-text-100 font-medium mb-2">Price</Text>

        <div
          className={cn(
            'flex items-center justify-between w-full',
            '[&>button]:w-full [&>button]:h-9! [&>button]:rounded-md',
          )}
        >
          <Select
            value={selectedCurrency}
            onValueChange={(value) => handleCurrencyChange(value)}
            disabled={currenciesLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem
                  key={currency.contractAddress}
                  value={currency.contractAddress}
                >
                  <div className="flex items-center gap-2">
                    {currency.imageUrl ? (
                      <img
                        src={currency.imageUrl}
                        alt={currency.symbol}
                        className="h-4 w-4 rounded-full"
                      />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-gray-400"></div>
                    )}
                    <Text className="font-bold text-xs">{currency.symbol}</Text>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => handleMinPriceChange(e.target.value)}
            min="0"
            step="any"
            className={`w-14 rounded-md border ${validationError ? 'border-red-500' : 'border-border-normal'} bg-background-primary p-2 font-bold text-primary text-xs placeholder-muted focus:outline-none`}
          />

          <Text className="font-bold text-xs">to</Text>

          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => handleMaxPriceChange(e.target.value)}
            min="0"
            step="any"
            className={`w-14 rounded-md border ${validationError ? 'border-red-500' : 'border-border-normal'} bg-background-primary p-2 font-bold text-primary text-xs placeholder-muted focus:outline-none`}
          />
        </div>

        {validationError && (
          <div className="mt-2">
            <Text className="text-warning text-xs">{validationError}</Text>
          </div>
        )}

        <Button
          variant="primary"
          size="xs"
          shape="square"
          className="mt-4 w-full"
          onClick={handleApplyFilter}
        >
          Apply
        </Button>
      </div>
    );
  }

  return <Text className="text-sm text-text-50">No currencies found</Text>;
}
