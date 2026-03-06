import { Image, Text } from '@0xsequence/design-system';
import { cn } from '@0xsequence/marketplace-sdk';
import type { Currency } from '@0xsequence/marketplace-sdk';

export interface PriceDisplayData {
  formattedCryptoPrice: string;
  formattedPriceUsd: string | null;
}
interface PriceDisplayProps {
  currency: Currency | undefined;
  priceDisplayData: PriceDisplayData;
  currencyIsLoading: boolean;
}

function PriceDisplay({
  currency,
  priceDisplayData,
  currencyIsLoading,
}: PriceDisplayProps) {
  return (
    <div className="flex flex-col">
      <div
        className={cn(
          'flex items-center h-5',
          currencyIsLoading && 'loading w-28 h-7',
        )}
      >
        <Image
          src={currency?.imageUrl}
          alt={currency?.symbol}
          className="w-5 h-5 mr-2"
        />

        <div className={cn('flex items-center')}>
          <Text className="text-xl font-semibold text-primary ellipsis">
            {priceDisplayData.formattedCryptoPrice} {currency?.symbol}
          </Text>
        </div>
      </div>

      {priceDisplayData.formattedPriceUsd && (
        <Text className="text-[10px] font-bold text-muted">
          ~ {priceDisplayData.formattedPriceUsd}
        </Text>
      )}
    </div>
  );
}

export default PriceDisplay;
