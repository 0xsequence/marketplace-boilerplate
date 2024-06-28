'use client';

import { useState } from 'react';

import { OrderModalContent } from '~/components/modals/OrderModalContent';
import { SEQUENCE_MARKET_V1_ADDRESS } from '~/config/consts';
import { indexerQueries, marketplaceQueries } from '~/lib/queries';
import { _addToCart_ } from '~/lib/stores/cart/Cart';
import { CartType } from '~/lib/stores/cart/types';
import { defaultSelectionQuantity } from '~/lib/utils/quantity';
import { getThemeManagerElement } from '~/lib/utils/theme';
import { OrderItemType } from '~/types/OrderItemType';

import { Button, Dialog, Flex, ScrollArea, Text } from '$ui';
import { useCollectableData } from '../_hooks/useCollectableData';
import { SortOrder } from '@0xsequence/indexer';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

interface CollectibleTradeActionsProps {
  chainId: number;
  tokenId: string;
  collectionAddress: string;
}
export const CollectibleTradeActions = ({
  chainId,
  tokenId,
  collectionAddress,
}: CollectibleTradeActionsProps) => {
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);

  const { data: currencies } = useQuery(
    marketplaceQueries.currencies({
      chainId,
    }),
  );

  const currencyAddresses =
    currencies?.currencies.map((c) => c.contractAddress) || [];

  const { data: bestOffers, isLoading: isLoadingBestOffers } = useQuery({
    ...marketplaceQueries.topOrder({
      chainId,
      collectionAddress,
      currencyAddresses,
      orderbookContractAddress: SEQUENCE_MARKET_V1_ADDRESS,
      tokenIDs: [tokenId],
      isListing: false,
      priceSort: SortOrder.DESC,
    }),
    enabled: !!currencies,
  });

  const bestOffer = bestOffers?.orders[0];

  const { data: bestListings, isLoading: isLoadingBestListings } = useQuery(
    marketplaceQueries.topOrder({
      chainId,
      collectionAddress,
      currencyAddresses,
      orderbookContractAddress: SEQUENCE_MARKET_V1_ADDRESS,
      tokenIDs: [tokenId],
      isListing: true,
      priceSort: SortOrder.DESC,
    }),
  );

  const bestListing = bestListings?.orders[0];

  const { collectionMetadata, collectibleMetadata } = useCollectableData();

  const isERC1155 = collectionMetadata.data?.type === 'ERC1155';

  const { address, isConnected } = useAccount();

  const { data: userBalanceResp, isLoading: isBalanceLoading } =
    useInfiniteQuery({
      ...indexerQueries.tokenBalance({
        chainId: chainId,
        contractAddress: collectionAddress,
        tokenId,
        includeMetadata: false,
        accountAddress: address as string,
      }),
      enabled: !!isConnected && !!address,
    });

  const userBalance = userBalanceResp?.pages?.[0]?.balances[0];

  const item721AlreadyOwned = !!userBalance && !isERC1155;

  const isLoading =
    isLoadingBestOffers ||
    isLoadingBestListings ||
    (isConnected && isBalanceLoading);

  const onClickBuy = () => {
    if (!bestListing) return;
    _addToCart_({
      type: CartType.ORDERBOOK,
      item: {
        chainId,
        itemType: OrderItemType.BUY,
        collectibleMetadata: {
          collectionAddress: bestListing.tokenContract,
          tokenId: bestListing.tokenId,
          name: collectibleMetadata.data?.name || '',
          imageUrl: collectibleMetadata.data?.image || '',
          decimals: collectibleMetadata.data?.decimals || 0,
          chainId,
        },
        quantity: defaultSelectionQuantity({
          type: OrderItemType.BUY,
          tokenDecimals: collectibleMetadata.data?.decimals || 0,
          tokenUserBalance: BigInt(userBalance?.toString() || 0),
          tokenAvailableAmount: BigInt(Number(bestListing.quantityRemaining)),
        }),
        orderId: bestListing.orderId,
      },
      options: {
        toggle: true,
      },
    });
  };

  const onClickSell = () => {
    if (!bestOffer) return;
    _addToCart_({
      type: CartType.ORDERBOOK,
      item: {
        chainId,
        itemType: OrderItemType.SELL,
        collectibleMetadata: {
          collectionAddress: bestOffer.tokenContract,
          tokenId: bestOffer.tokenId,
          name: collectibleMetadata.data?.name || '',
          imageUrl: collectibleMetadata.data?.image || '',
          decimals: collectibleMetadata.data?.decimals || 0,
          chainId,
        },
        quantity: defaultSelectionQuantity({
          type: OrderItemType.SELL,
          tokenDecimals: collectibleMetadata.data?.decimals || 0,
          tokenUserBalance: BigInt(userBalance?.toString() || 0),
          tokenAvailableAmount: BigInt(Number(bestOffer.quantityRemaining)),
        }),
        orderId: bestOffer.orderId,
      },
      options: {
        toggle: true,
      },
    });
  };

  const buyDisabled = !bestListing || item721AlreadyOwned;
  const offerDisabled = !isConnected;
  const listingDisabled = !isConnected || !userBalance;
  const sellDisabled = !bestOffer || !userBalance;

  return (
    <Flex className="flex-col gap-4">
      <Flex className="flex-row gap-4">
        <Button
          size="lg"
          className="w-full justify-between"
          loading={isLoading}
          disabled={buyDisabled}
          onClick={onClickBuy}
        >
          <Text className="text-inherit">Buy</Text>
        </Button>
        <Flex className="w-full flex-col gap-3">
          <Dialog.Root
            open={isOfferModalOpen}
            onOpenChange={(isOpen) => setIsOfferModalOpen(isOpen)}
          >
            <Dialog.Trigger asChild>
              <Button
                className="w-full justify-between"
                size="lg"
                loading={false}
                disabled={offerDisabled}
              >
                <Text className="text-inherit">Offer</Text>
              </Button>
            </Dialog.Trigger>

            <Dialog.BaseContent
              container={getThemeManagerElement()}
              className="max-h-screen max-w-[700px] p-5"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Dialog.Title>Create an offer</Dialog.Title>
              <OrderModalContent
                chainId={chainId}
                collectionAddress={collectionAddress}
                tokenId={tokenId}
                bestOrder={bestListing}
                open={isOfferModalOpen}
                setOpen={setIsOfferModalOpen}
                type="offer"
              />
            </Dialog.BaseContent>
          </Dialog.Root>
        </Flex>
      </Flex>
      <Flex className="flex-row gap-4">
        <Button
          className="w-full justify-between"
          size="lg"
          loading={isLoading}
          disabled={sellDisabled}
          onClick={onClickSell}
        >
          <Text className="text-inherit">Sell</Text>
        </Button>

        <Flex className="w-full flex-col gap-3">
          <Dialog.Root
            open={isListingModalOpen}
            onOpenChange={(isOpen) => setIsListingModalOpen(isOpen)}
          >
            <Dialog.Trigger asChild>
              <Button
                className="w-full justify-between"
                size="lg"
                loading={false}
                disabled={listingDisabled}
              >
                <Text className="text-inherit">List</Text>
              </Button>
            </Dialog.Trigger>

            <Dialog.BaseContent
              container={getThemeManagerElement()}
              className="flex max-w-[700px] flex-col overflow-hidden p-0"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <ScrollArea.Base viewportClassName="max-h-screen">
                <Flex className="h-full w-full flex-col gap-4 p-5">
                  <Dialog.Title>Make a listing</Dialog.Title>

                  <OrderModalContent
                    chainId={chainId}
                    collectionAddress={collectionAddress}
                    tokenId={tokenId}
                    bestOrder={bestOffer}
                    open={isListingModalOpen}
                    setOpen={setIsListingModalOpen}
                    type="listing"
                  />
                </Flex>
              </ScrollArea.Base>
            </Dialog.BaseContent>
          </Dialog.Root>
        </Flex>
      </Flex>
    </Flex>
  );
};
