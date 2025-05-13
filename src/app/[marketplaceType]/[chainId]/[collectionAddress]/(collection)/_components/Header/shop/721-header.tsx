'use client';

import { useState } from 'react';

import { CollectionTitle } from './collection-title';
import {
  Button,
  Text,
  NetworkImage,
  Progress,
  cn,
} from '@0xsequence/design-system';
import { AddIcon, SubtractIcon } from '@0xsequence/design-system';
import { useCollection, useCurrency } from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import { type Hex } from 'viem';

export function Shop721CollectionHeader() {
  const usdcAddress = '0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582';
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;

  const { data: collection } = useCollection({
    chainId,
    collectionAddress,
  });
  const { data: currency, isLoading: currencyIsLoading } = useCurrency({
    chainId,
    currencyAddress: usdcAddress,
  });

  // Log the collection object to see its properties
  console.log('Collection object:', collection);

  const [quantity, setQuantity] = useState(1);

  const handleBuy = () => {
    // TODO: add a buy function
  };

  // TODO: remove the hardcoded values once the data is fetched
  const price = '10';
  const priceUsd = '1000';
  const soldPercentage = 0.35; // 35% of the total supply has been sold
  const totalSupply = 100; // total token supply
  const soldSupply = totalSupply * soldPercentage;
  const remainingSupply = totalSupply - soldSupply;

  return (
    <div className="flex flex-col gap-8 mb-5">
      <div className="flex flex-col md:flex-row! pt-5">
        <CollectionTitle
          title={collection?.name || 'Collection'}
          name={collection?.name || 'Collection'}
          image=""
          tokenType="ERC-721"
          chainId={chainId}
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between w-full md:w-[300px]! h-9">
            <div className="flex flex-col">
              <div className="flex items-center h-5">
                <NetworkImage chainId={chainId} className="w-5 h-5 mr-2" />

                <div
                  className={cn(
                    'flex items-center',
                    currencyIsLoading && 'loading w-20 h-7',
                  )}
                >
                  <Text className="text-xl font-semibold text-primary">
                    {price} {currency?.symbol}
                  </Text>
                </div>
              </div>

              {priceUsd && (
                <Text className="text-[10px] font-bold text-muted">
                  ~ ${priceUsd}
                </Text>
              )}
            </div>

            <Quantity value={quantity} onChange={setQuantity} />
          </div>

          <Button
            variant="primary"
            size="md"
            shape="square"
            onClick={handleBuy}
            label="Buy"
            className="[&>div]:justify-center"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <Text className="text-xs font-medium text-secondary">
            {remainingSupply} out of {totalSupply} left
          </Text>

          <Text className="text-xs font-medium text-secondary">
            {soldPercentage * 100}%
          </Text>
        </div>

        <Progress
          value={0.5}
          className="h-3 bg-background-secondary! [&>div]:bg-selected-highlight"
        />
      </div>
    </div>
  );
}

interface QuantityProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

function Quantity({ value, onChange, min = 1, max = Infinity }: QuantityProps) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      if (newValue >= min && newValue <= max) {
        onChange(newValue);
      }
    }
  };

  return (
    <div className="quantity h-full flex items-center justify-between border border-background-secondary rounded-xl w-[100px] overflow-hidden">
      <Button
        variant="ghost"
        onClick={handleDecrement}
        className="p-1.5 rounded-none"
        disabled={value <= min}
        label={<SubtractIcon className="w-4 h-4 text-primary" />}
      />

      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className="w-8 bg-transparent flex-1 text-primary text-sm font-medium h-9 text-center focus:outline-none"
        aria-label="Quantity"
      />

      <Button
        variant="ghost"
        onClick={handleIncrement}
        className="p-1.5 rounded-none"
        disabled={value >= max}
        label={<AddIcon className="w-4 h-4 text-primary" />}
      />
    </div>
  );
}

export default Shop721CollectionHeader;
