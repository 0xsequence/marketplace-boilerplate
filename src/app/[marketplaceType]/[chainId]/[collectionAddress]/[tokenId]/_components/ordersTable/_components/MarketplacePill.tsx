'use client';

import Pill from './Pill';
import { Text } from '@0xsequence/design-system';
import {
  getMarketplaceDetails,
  type MarketplaceKind,
} from '@0xsequence/marketplace-sdk';

const MarketplacePill = ({
  originName,
  marketplace: marketplaceKind,
}: {
  originName: string;
  marketplace: MarketplaceKind;
}) => {
  const marketplaceDetails = getMarketplaceDetails({
    originName: originName,
    kind: marketplaceKind,
  });

  if (!marketplaceDetails) {
    return (
      <Pill>
        <Text className="text-xs text-secondary font-medium">Unknown</Text>
      </Pill>
    );
  }

  return (
    <Pill>
      {marketplaceDetails.logo && (
        <marketplaceDetails.logo className="w-4 h-4" />
      )}

      <Text className="text-xs text-secondary font-medium">
        {marketplaceDetails.displayName}
      </Text>
    </Pill>
  );
};

export default MarketplacePill;
