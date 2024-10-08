'use client';

import React, { useState, useEffect } from 'react';

import { type Currency } from '~/lib/queries/marketplace/marketplace.gen';
import { getThemeManagerElement } from '~/lib/utils/theme';

import { Flex, Image, Select, Text } from '$ui';

interface CurrencyDropdownProps {
  defaultCurrency: Currency;
  currencies: Currency[];
  onSetCurrency: (currency: Currency) => void;
  resetCurrencyAmount: () => void;
}

export const CurrencyDropdown = ({
  currencies,
  defaultCurrency,
  onSetCurrency,
  resetCurrencyAmount,
}: CurrencyDropdownProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);

  useEffect(() => {
    onSetCurrency(selectedCurrency);
    resetCurrencyAmount();
  }, [selectedCurrency]);

  return (
    <Select.Root
      onValueChange={(contractAddress) => {
        const newSelectedCurrency = currencies.find(
          (currency) => currency.contractAddress === contractAddress,
        );
        if (newSelectedCurrency) {
          setSelectedCurrency(newSelectedCurrency);
        }
      }}
      defaultValue={selectedCurrency?.contractAddress}
    >
      <Select.Trigger className="h-12 w-full">
        <Flex className="w-full gap-2">
          <Image.Base
            src={selectedCurrency?.imageUrl}
            alt={selectedCurrency?.name}
            className="h-5 w-5"
          />
          <Text className="font-medium">{selectedCurrency?.name}</Text>
        </Flex>
      </Select.Trigger>
      <Select.Options container={getThemeManagerElement()}>
        {currencies.map((currency, index) => (
          <Select.Option value={currency.contractAddress} key={index}>
            <Flex className="w-full gap-2">
              <Image.Base
                src={currency.imageUrl}
                alt={currency.name}
                className="h-5 w-5"
              />
              <Text>{currency.name}</Text>
            </Flex>
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
};
