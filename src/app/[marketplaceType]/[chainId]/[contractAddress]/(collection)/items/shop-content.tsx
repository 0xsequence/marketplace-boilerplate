import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '~/components/collectables/components';
import { getCollectibleCardWidthClass } from '~/utils/get-collectible-card-width-class';

import { useShopFilters } from '../hooks/useShopFilters';
import { CollectiblesContent } from './collectibles-content';
import { cn, type ShopCollection } from '@0xsequence/marketplace-sdk';
import { useList1155ShopCardData } from '@0xsequence/marketplace-sdk/react';
import { useListPrimarySaleItems } from '@0xsequence/marketplace-sdk/react';
import {
  useCountOfPrimarySaleItems,
  useList721ShopCardData,
} from '@0xsequence/marketplace-sdk/react';
import { CollectibleCard } from '@0xsequence/marketplace-sdk/react';
import Link from 'next/link';
import type { Address } from 'viem';

type ShopContentProps = {
  chainId: number;
  salesContractAddress: Address;
  itemsContractAddress: Address;
  shopCollection: ShopCollection;
};

export function ShopContent({
  chainId,
  salesContractAddress,
  itemsContractAddress,
  shopCollection,
}: ShopContentProps) {
  const { filterOptions } = useShopFilters();

  const {
    data: primarySaleItems,
    isLoading: primarySaleItemsLoading,
    fetchNextPage: fetchNextPagePrimarySaleItems,
    isFetchingNextPage: isFetchingNextPagePrimarySaleItems,
    error: primarySaleItemsError,
  } = useListPrimarySaleItems({
    chainId,
    primarySaleContractAddress: salesContractAddress,
    filter: filterOptions,
  });
  // Flatten all primary sale items from all pages
  const allPrimarySaleItems =
    primarySaleItems?.pages.flatMap((page) => page.primarySaleItems) ?? [];

  // Check if we have minted tokens by looking at the first available token ID
  const hasMintedTokens = Number(allPrimarySaleItems[0]?.metadata.tokenId) > 0;

  const contractType = allPrimarySaleItems[0]?.primarySaleItem.contractType;

  // Fetch the total count of items
  const {
    data: countOfPrimarySaleItems,
    isLoading: countOfPrimarySaleItemsLoading,
    error: countOfPrimarySaleItemsError,
  } = useCountOfPrimarySaleItems({
    chainId,
    primarySaleContractAddress: shopCollection?.saleAddress,
    filter: filterOptions,
  });

  // Get the collectible card width class based on the count
  const collectibleCardWidthClassName = getCollectibleCardWidthClass(
    countOfPrimarySaleItems?.count,
  );

  const shouldIncludePrimarySale =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    !hasMintedTokens || contractType === 'ERC1155';

  const tokenIds = allPrimarySaleItems.map((item) => item.metadata.tokenId);

  const {
    collectibleCards: collectibleCards721,
    isLoading: collectibleCards721Loading,
    saleDetailsError: collectibleCards721SaleDetailsError,
  } = useList721ShopCardData({
    primarySaleItemsWithMetadata: allPrimarySaleItems,
    chainId,
    contractAddress: itemsContractAddress,
    salesContractAddress: salesContractAddress,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    enabled: tokenIds.length > 0 && contractType === 'ERC721',
  });
  const {
    collectibleCards: collectibleCards1155,
    isLoading: collectibleCards1155Loading,
    tokenSaleDetailsError: collectibleCards1155TokenSaleDetailsError,
  } = useList1155ShopCardData({
    primarySaleItemsWithMetadata: allPrimarySaleItems,
    chainId,
    contractAddress: itemsContractAddress,
    salesContractAddress: salesContractAddress,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    enabled: contractType === 'ERC1155',
  });
  const collectibleCards =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    contractType === 'ERC721' ? collectibleCards721 : collectibleCards1155;

  const collectibleCardsLoading =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    contractType === 'ERC721'
      ? collectibleCards721Loading
      : collectibleCards1155Loading;
  const collectibleCardsSaleDetailsError =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    contractType === 'ERC721'
      ? collectibleCards721SaleDetailsError
      : collectibleCards1155TokenSaleDetailsError;

  const fetchNextPage = async () => {
    if (
      shouldIncludePrimarySale &&
      primarySaleItems?.pages?.[primarySaleItems.pages.length - 1]?.page?.more
    ) {
      await fetchNextPagePrimarySaleItems();
    }
  };

  function renderItemContent({ index }: { index: number }) {
    const card = collectibleCards[index];
    if (!card || !shopCollection) return null;

    return (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error) => {
          console.error('Collectible card error:', error);
        }}
        key={`${shopCollection.itemsAddress}-${card.tokenId}`}
      >
        <Link
          href={`/shop/${String(chainId)}/${shopCollection.saleAddress}/${card.tokenId}/details`}
          className={cn('cursor-pointer', `${collectibleCardWidthClassName}`)}
          prefetch={false}
        >
          <CollectibleCard
            key={String(card.tokenId)}
            {...card}
            hideQuantitySelector={true}
            cardType="shop"
          />
        </Link>
      </ErrorBoundary>
    );
  }

  return (
    <>
      <CollectiblesContent
        fetchingError={
          collectibleCardsSaleDetailsError ||
          primarySaleItemsError ||
          countOfPrimarySaleItemsError
        }
        isLoading={
          collectibleCardsLoading ||
          primarySaleItemsLoading ||
          countOfPrimarySaleItemsLoading
        }
        collectiblesList={collectibleCards}
        collectionAddress={shopCollection.itemsAddress}
        chainId={chainId}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPagePrimarySaleItems}
        salesContractAddress={salesContractAddress}
        renderItemContent={(index) => renderItemContent({ index })}
        totalItemsCount={countOfPrimarySaleItems?.count}
        isLoadingCountData={countOfPrimarySaleItemsLoading}
        marketplaceType={'shop'}
      />
    </>
  );
}
