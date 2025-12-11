import { type Currency, formatPrice } from '@0xsequence/marketplace-sdk';

export interface PriceDisplayData {
  formattedCryptoPrice: string;
  formattedPriceUsd: string | null;
}

interface UsePriceCalculationProps {
  saleAmount: bigint;
  currency: Currency | undefined;
}

export const usePriceCalculation = ({
  saleAmount,
  currency,
}: UsePriceCalculationProps): PriceDisplayData => {
  const formattedCryptoPrice = formatPrice(saleAmount, currency?.decimals || 0);

  const cryptoPriceNumber = Number(formattedCryptoPrice.replace(/,/g, ''));

  const priceUsd =
    currency?.exchangeRate && !isNaN(cryptoPriceNumber)
      ? cryptoPriceNumber * currency.exchangeRate
      : null;

  const formattedPriceUsd =
    priceUsd !== null && !isNaN(priceUsd)
      ? priceUsd < 0.01
        ? `<$0.01`
        : `$${priceUsd.toFixed(2)}`
      : null;

  return {
    formattedCryptoPrice,
    formattedPriceUsd,
  };
};
