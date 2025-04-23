import { OrderSide } from '@0xsequence/marketplace-sdk';
import { useFilterState } from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import type { Hex } from 'viem';

export const useListCollectiblesArgs = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const { filterOptions, searchText, showListedOnly } = useFilterState();

  return {
    chainId,
    collectionAddress,
    filter: {
      searchText,
      includeEmpty: !showListedOnly,
      properties: filterOptions,
    },
    side: OrderSide.listing,
  };
};
