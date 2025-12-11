import ConnectButton from '~/components/connect-button';
import type { ShopCollection } from '~/lib/types';

import { usePriceCalculation } from '../../(collection)/_components/Header/shop/721-header/hooks/usePriceCalculation';
import { useCollectableData } from '../_hooks/use-collectable-data';
import { Button, Image, Skeleton, Text } from '@0xsequence/design-system';
import { compareAddress, ContractType } from '@0xsequence/marketplace-sdk';
import {
  useMarketplaceConfig,
  usePrimarySaleItem,
} from '@0xsequence/marketplace-sdk/react';
import { useBuyModal, useCurrency } from '@0xsequence/marketplace-sdk/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';

type ShopCollectibleActionsProps = {
  collectionType: ContractType;
};

function PriceInfo({
  cryptoPrice,
  currencySymbol,
  usdPrice,
  currencyImage,
}: {
  cryptoPrice: string;
  currencySymbol: string;
  usdPrice: string | null;
  currencyImage: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-center gap-2">
        <Image
          src={currencyImage}
          alt={currencySymbol}
          className="w-5 h-5 rounded-full"
        />
        <Text className="text-base text-primary font-bold">
          {cryptoPrice} {currencySymbol}
        </Text>
      </div>
      {usdPrice && <Text className="text-xs text-muted">~ {usdPrice}</Text>}
    </div>
  );
}

export default function ShopCollectibleActions({
  collectionType,
}: ShopCollectibleActionsProps) {
  const params = useParams();
  // contractAddress is the sale contract address for shop collections
  const {
    chainId,
    contractAddress: saleContractAddress,
    tokenId,
  } = params as unknown as {
    chainId: string;
    contractAddress: string;
    tokenId: string;
  };
  const { address: accountAddress } = useAccount();
  const { show: showBuyModal } = useBuyModal();
  const { data: marketplaceConfig } = useMarketplaceConfig();
  const { collectibleMetadata } = useCollectableData();
  const collectible = collectibleMetadata.data;

  const collectionAddress = marketplaceConfig?.shop?.collections?.find(
    (c: ShopCollection) => compareAddress(c.saleAddress, saleContractAddress),
  )?.itemsAddress;

  const {
    data: primarySaleItemData,
    isLoading: primarySaleItemsLoading,
    error: primarySaleItemError,
  } = usePrimarySaleItem({
    chainId: Number(chainId),
    primarySaleContractAddress: saleContractAddress,
    tokenId: BigInt(tokenId),
  });

  const primarySaleItemWrapper = primarySaleItemData?.item;
  const primarySaleItem = primarySaleItemWrapper?.primarySaleItem;
  const isFree = primarySaleItem?.priceAmount === 0n;

  const { data: currency, isLoading: currencyLoading } = useCurrency({
    chainId: Number(chainId),
    currencyAddress: (primarySaleItem?.currencyAddress ?? '') as Address,
    query: {
      enabled: !!primarySaleItem?.currencyAddress,
    },
  });

  const priceDisplayData = usePriceCalculation({
    saleAmount: primarySaleItem?.priceAmount ?? 0n,
    currency,
  });

  if (primarySaleItemsLoading || currencyLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-1/4" />

          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>

        <Skeleton className="h-6 w-1/4 mb-4" />

        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    );
  }

  // Check if the sale item is still available for 721 tokens
  const isSaleItemAvailable = primarySaleItemWrapper !== undefined;

  if (primarySaleItemError) {
    console.error(primarySaleItemError);
    return (
      <div className="flex flex-col gap-4">
        <Text className="text-lg font-bold text-primary">
          {collectible?.name || 'Collectible'}
        </Text>

        <Text className="text-base text-primary font-bold">
          Error loading sale data
        </Text>

        <Text className="text-sm text-muted font-medium">
          Unable to load sale information. Please try again later.
        </Text>
      </div>
    );
  }

  if (!accountAddress) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Text className="text-lg font-bold text-primary">
            {collectible?.name || 'Collectible'}
          </Text>
          {currency && !isFree && (
            <PriceInfo
              cryptoPrice={priceDisplayData.formattedCryptoPrice}
              currencySymbol={currency.symbol}
              usdPrice={priceDisplayData.formattedPriceUsd}
              currencyImage={currency.imageUrl}
            />
          )}
        </div>

        <Text className="text-base text-center text-muted font-bold">
          Connect your wallet to see options
        </Text>

        <ConnectButton
          className="w-full rounded-xl"
          showIcon={false}
          variant="primary"
          shape="square"
          size="lg"
        />
      </div>
    );
  }

  if (
    primarySaleItem?.unlimitedSupply &&
    collectionType === ContractType.ERC1155
  ) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Text className="text-lg font-bold text-primary">
            {collectible?.name || 'Collectible'}
          </Text>
          {currency && !isFree && (
            <PriceInfo
              cryptoPrice={priceDisplayData.formattedCryptoPrice}
              currencySymbol={currency.symbol}
              usdPrice={priceDisplayData.formattedPriceUsd}
              currencyImage={currency.imageUrl}
            />
          )}
        </div>

        <Text className="text-base text-primary font-bold">
          Unlimited supply
        </Text>

        <Button
          className="rounded-xl [&>div]:justify-center"
          variant="primary"
          shape="square"
          size="lg"
          onClick={() =>
            showBuyModal({
              chainId: Number(chainId),
              collectionAddress: String(collectionAddress) as Address,
              salesContractAddress: saleContractAddress as Address,
              hideQuantitySelector: true,
              item: {
                tokenId: BigInt(tokenId),
                quantity: 1n,
              },
              cardType: 'shop',
              salePrice: {
                amount: primarySaleItem?.priceAmount ?? 0n,
                currencyAddress: primarySaleItem?.currencyAddress ?? '0x',
              },
              // TODO: This is 0 for unlimited supply, fix it
              quantityRemaining: primarySaleItem?.supply ?? 0n,
            })
          }
        >
          {isFree ? 'Buy now for free' : 'Buy now'}
        </Button>
      </div>
    );
  }

  if (
    primarySaleItem?.supply === 0n ||
    // if 721 token was purchased, primarySaleItemWrapper will be undefined
    (collectionType === ContractType.ERC721 && !isSaleItemAvailable)
  ) {
    return (
      <div className="flex flex-col gap-4">
        <Text className="text-lg font-bold text-primary">
          {collectible?.name || 'Collectible'}
        </Text>

        <Text className="text-base text-primary font-bold">Out of stock</Text>

        <Text className="text-sm text-muted font-medium">
          This item is no longer available in this sale.
        </Text>

        <Link
          href={`/shop/${String(chainId)}/${String(saleContractAddress)}/items`}
        >
          <Button
            className="rounded-xl [&>div]:justify-center"
            variant="primary"
            shape="square"
            size="lg"
          >
            Back to sale
          </Button>
        </Link>
      </div>
    );
  }

  if (Number(primarySaleItem?.supply) > 0) {
    const copy721 =
      "You can't buy this item directly. Go to the sale page to get the next available item.";

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Text className="text-lg font-bold text-primary">
            {collectible?.name || 'Collectible'}
          </Text>
          {currency && !isFree && (
            <PriceInfo
              cryptoPrice={priceDisplayData.formattedCryptoPrice}
              currencySymbol={currency.symbol}
              usdPrice={priceDisplayData.formattedPriceUsd}
              currencyImage={currency.imageUrl}
            />
          )}
        </div>

        <Text className="text-base text-primary font-bold">
          Available: {primarySaleItem?.supply}
        </Text>

        <Text className="text-sm text-muted font-medium">
          {collectionType === ContractType.ERC721 && copy721}
        </Text>

        {collectionType === ContractType.ERC721 && (
          <Link
            href={`/shop/${String(chainId)}/${String(saleContractAddress)}/items`}
            className="w-full"
          >
            <Button
              className="w-full rounded-xl [&>div]:justify-center"
              variant="primary"
              shape="square"
              size="lg"
            >
              Back to sale
            </Button>
          </Link>
        )}

        {collectionType === ContractType.ERC1155 && (
          <Button
            className="rounded-xl [&>div]:justify-center"
            variant="primary"
            shape="square"
            size="lg"
            onClick={() =>
              showBuyModal({
                chainId: Number(chainId),
                collectionAddress: String(collectionAddress) as Address,
                salesContractAddress: saleContractAddress as Address,
                hideQuantitySelector: true,
                item: {
                  tokenId: BigInt(tokenId),
                  quantity: 1n,
                },
                cardType: 'shop',
                salePrice: {
                  amount: primarySaleItem?.priceAmount ?? 0n,
                  currencyAddress: primarySaleItem?.currencyAddress ?? '0x',
                },
                quantityRemaining: primarySaleItem?.supply ?? 0n,
              })
            }
          >
            {isFree ? 'Buy now for free' : 'Buy now'}
          </Button>
        )}
      </div>
    );
  }
}
