'use client';

import { useShopFilters } from '../../../hooks/useShopFilters';
import { CollectionSearchInput } from '../../Controls/Search';
import { useSidebarState } from '../../Controls/sidebar/sidebar-context';
import Shop721CollectionHeader from './721-header/721-header';
import { Shop1155CollectionHeader } from './1155-header';
import { CollectionTitle } from './collection-title';
import { ShopControls } from './shop-controls';
import { cn, ContractType } from '@0xsequence/marketplace-sdk';
import {
  useCollection,
  useCountOfPrimarySaleItems,
} from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import type { Address } from 'viem';

const CollectionHeaderSkeleton = () => {
  const params = useParams();
  const chainId = Number(params.chainId);

  return (
    <div className="flex flex-col w-full bg-black pb-4 mt-5">
      <CollectionTitle
        name="Collection"
        image={undefined}
        tokenType={undefined}
        chainId={chainId}
        isLoading={true}
      />
    </div>
  );
};

export const ShopCollectionHeader = ({
  chainId,
  collectionAddress,
}: {
  chainId: number;
  collectionAddress: string;
}) => {
  const { contractAddress } = useParams();
  const { data: collection, isLoading: isLoadingCollection } = useCollection({
    chainId,
    collectionAddress: collectionAddress as Address,
  });

  const { filterOptions } = useShopFilters();
  const { searchBarOpen } = useSidebarState();
  const collectionType = collection?.type as ContractType;

  const {
    data: filteredCollectiblesCount,
    isLoading: isLoadingFilteredCollectiblesCount,
  } = useCountOfPrimarySaleItems({
    chainId,
    primarySaleContractAddress: contractAddress as Address,
    filter: filterOptions,
  });

  const isLoading = isLoadingCollection || isLoadingFilteredCollectiblesCount;

  return (
    <div
      className={cn(
        'mb-8 bg-background-primary sticky z-[11] outline-[2px] outline-background-primary my-[2px]',
        'top-[var(--headerHeight)]!',
      )}
    >
      {isLoadingCollection || !collection ? (
        <CollectionHeaderSkeleton />
      ) : collectionType === ContractType.ERC721 ? (
        <Shop721CollectionHeader isLoading={isLoading} />
      ) : collectionType === ContractType.ERC1155 ? (
        <Shop1155CollectionHeader isLoading={isLoading} />
      ) : null}

      <ShopControls
        filteredCollectiblesCount={filteredCollectiblesCount?.count ?? 0}
        collectionType={collectionType}
      />

      {searchBarOpen && (
        <CollectionSearchInput className="flex [&>label]:w-full md:hidden! mb-6" />
      )}
    </div>
  );
};
