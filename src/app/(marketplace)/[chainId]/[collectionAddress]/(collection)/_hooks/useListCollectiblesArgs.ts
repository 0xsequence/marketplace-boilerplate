import { useFilters } from '../_components/FilterProvider';
import { OrderSide } from '@0xsequence/marketplace-sdk';
import { useParams } from 'next/navigation';
import type { Hex } from 'viem';

export const useListCollectiblesArgs = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const { filterOptions, searchText, showListedOnly } = useFilters();

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
