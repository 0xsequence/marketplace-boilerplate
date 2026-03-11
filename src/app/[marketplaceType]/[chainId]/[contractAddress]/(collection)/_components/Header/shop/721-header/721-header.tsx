'use client';

import { useState } from 'react';

import { useMarketplaceCollection } from '~/hooks/use-marketplace-collection';
import { getCollectionAddress } from '~/lib/utils';

import { CollectionTitle } from '../collection-title';
import { useBuyHandler } from './hooks/useBuyHandler';
import { usePriceCalculation } from './hooks/usePriceCalculation';
import MintedProgressSection from './minted-progress';
import PriceDisplay from './price';
import Sale721QuantityInput from './sale-quantity-input';
import { Button } from '@0xsequence/design-system';
import {
  useCollection,
  useCurrency,
  useErc721SaleDetails,
  useListPrimarySaleItems,
} from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import type { Address } from 'viem';

interface Shop721CollectionHeaderProps {
  isLoading: boolean;
}

export function Shop721CollectionHeader({
  isLoading,
}: Shop721CollectionHeaderProps) {
  const params = useParams();
  const chainId = Number(params.chainId);
  const salesContractAddress = params.contractAddress! as Address;
  const [quantity, setQuantity] = useState(1);

  const collectionData = useMarketplaceCollection('shop');
  const marketplaceCollection = collectionData.data;

  const collectionAddress = getCollectionAddress({
    collection: marketplaceCollection || null,
    marketplaceType: 'shop',
  });

  const { data: collection, isLoading: isLoadingCollection } = useCollection({
    chainId,
    collectionAddress,
  });
  const { data: primarySaleItems, isLoading: isLoadingPrimarySaleItems } =
    useListPrimarySaleItems({
      chainId,
      primarySaleContractAddress: salesContractAddress,
    });
  const primarySaleItem =
    primarySaleItems?.pages[0]?.primarySaleItems[0]?.primarySaleItem;
  const salePrice = {
    amount: primarySaleItem?.priceAmount,
    currencyAddress: (primarySaleItem?.currencyAddress ?? '') as Address,
  };

  const {
    quantityMinted,
    quantityRemaining,
    quantityTotal,
    isLoading: isLoadingSalesData,
  } = useErc721SaleDetails({
    chainId,
    salesContractAddress,
    itemsContractAddress: collectionAddress,
    enabled: true,
  });
  const { data: currency, isLoading: currencyIsLoading } = useCurrency({
    chainId,
    currencyAddress: salePrice.currencyAddress,
  });

  const { handleBuy } = useBuyHandler({
    chainId,
    collectionAddress,
    salesContractAddress,
    quantity,
    salePrice: {
      amount: salePrice.amount ?? 0n,
      currencyAddress: salePrice.currencyAddress,
    },
    supplyCap: Number(quantityTotal),
    tokenId: BigInt(params.tokenId as string),
  });

  const priceDisplayData = usePriceCalculation({
    saleAmount: salePrice?.amount ?? 0n,
    currency,
  });

  const loading =
    isLoading ||
    isLoadingCollection ||
    isLoadingSalesData ||
    currencyIsLoading ||
    isLoadingPrimarySaleItems;

  return (
    <div className="flex flex-col gap-8 mb-5 bg-background-primary w-full">
      <div className="flex flex-col md:flex-row! pt-5">
        <CollectionTitle
          name={collection?.name || 'Collection'}
          image={''}
          tokenType="ERC-721"
          chainId={chainId}
          isLoading={loading}
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between w-full md:w-[300px]! h-9">
            <PriceDisplay
              currency={currency}
              priceDisplayData={priceDisplayData}
              currencyIsLoading={currencyIsLoading}
            />
            <Sale721QuantityInput
              value={quantity}
              onChange={setQuantity}
              max={Number(quantityRemaining)}
              disabled={loading || !quantityRemaining}
            />
          </div>

          <Button
            variant="primary"
            size="md"
            shape="square"
            onClick={handleBuy}
            disabled={loading || !quantityRemaining}
            className="[&>div]:justify-center"
          >
            {!loading && !quantityRemaining ? 'Sold Out' : 'Buy'}
          </Button>
        </div>
      </div>

      <MintedProgressSection
        quantityTotal={quantityTotal || BigInt(0)}
        quantityMinted={quantityMinted || BigInt(0)}
        quantityRemaining={quantityRemaining || BigInt(0)}
        isLoading={loading}
      />
    </div>
  );
}

export default Shop721CollectionHeader;
