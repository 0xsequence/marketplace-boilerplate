import ConnectButton from '~/components/connect-button';
import storeConfig from '~/store-config';

import { Button, Text } from '@0xsequence/design-system';
import { ERC1155_SALES_CONTRACT_ABI } from '@0xsequence/marketplace-sdk';
import {
  useBuyModal,
  useGetTokenSuppliesMap,
} from '@0xsequence/marketplace-sdk/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { type Address } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

type ShopCollectibleActionsProps = {
  is1155: boolean;
  is721: boolean;
};

export default function ShopCollectibleActions({
  is1155,
  is721,
}: ShopCollectibleActionsProps) {
  const params = useParams();
  const { chainId, collectionAddress, tokenId } = params;
  const { address: accountAddress } = useAccount();
  const { show: showBuyModal } = useBuyModal();
  const salesContractAddress = storeConfig.shop.collections.find(
    (c) => c.address == collectionAddress,
  )?.salesAddress as Address;

  const { data: paymentToken, isLoading: paymentTokenIsLoading } =
    useReadContract({
      chainId: Number(chainId),
      address: salesContractAddress,
      abi: ERC1155_SALES_CONTRACT_ABI,
      functionName: 'paymentToken',
    });

  const { data: tokenSaleDetails, isLoading: tokenSaleDetailsLoading } =
    useReadContract({
      chainId: Number(chainId),
      address: salesContractAddress,
      abi: ERC1155_SALES_CONTRACT_ABI,
      functionName: 'tokenSaleDetails',
      args: [BigInt(tokenId as string)],
    });

  const { data: getTokenSuppliesMap, isLoading: isLoadingGetTokenSuppliesMap } =
    useGetTokenSuppliesMap({
      collectionAddress: String(collectionAddress),
      tokenIds: [String(tokenId)],
      chainId: Number(chainId),
    });

  const itemsInStock = Number(
    getTokenSuppliesMap?.supplies[String(collectionAddress)]?.[0]?.supply ?? 0,
  );

  if (
    tokenSaleDetailsLoading ||
    paymentTokenIsLoading ||
    isLoadingGetTokenSuppliesMap
  ) {
    return <div>Loading...</div>;
  }

  if (!accountAddress) {
    return (
      <div className="flex flex-col gap-4">
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

  if (itemsInStock === 0) {
    return (
      <div className="flex flex-col gap-4">
        <Text className="text-base text-primary font-bold">Out of stock</Text>

        <Text className="text-sm text-muted font-medium">
          This item is no longer available in this sale.
        </Text>

        <Button
          className="rounded-xl [&>div]:justify-center"
          variant="primary"
          shape="square"
          size="lg"
          label="Back to sale"
        />
      </div>
    );
  }

  if (itemsInStock > 0) {
    const copy721 =
      "You can't buy this item directly. Go to the sale page to get the next available item.";

    return (
      <div className="flex flex-col gap-4">
        <Text className="text-base text-primary font-bold">
          Stock: {itemsInStock}
        </Text>

        <Text className="text-sm text-muted font-medium">
          {is721 && copy721}
        </Text>

        {is721 && (
          <Link
            href={`/shop/${String(chainId)}/${String(collectionAddress)}/items`}
            className="w-full"
          >
            <Button
              className="w-full rounded-xl [&>div]:justify-center"
              variant="primary"
              shape="square"
              size="lg"
              label="Back to sale"
            />
          </Link>
        )}

        {is1155 && (
          <Button
            className="rounded-xl [&>div]:justify-center"
            variant="primary"
            shape="square"
            size="lg"
            label="Buy now"
            onClick={() =>
              showBuyModal({
                chainId: Number(chainId),
                collectionAddress: String(collectionAddress) as `0x${string}`,
                salesContractAddress: storeConfig.shop.collections.find(
                  (collection) =>
                    collection.address === String(collectionAddress),
                )?.salesAddress as `0x${string}`,
                items: [
                  {
                    tokenId: String(tokenId),
                    quantity: '1', // TODO: this is overwritten later, should not be exposed
                  },
                ],
                marketplaceType: 'shop',
                salePrice: {
                  amount: tokenSaleDetails?.cost.toString() ?? '',
                  currencyAddress: paymentToken ?? '0x',
                },
                quantityDecimals: 0,
                quantityRemaining: itemsInStock.toString(),
              })
            }
          />
        )}
      </div>
    );
  }
}
