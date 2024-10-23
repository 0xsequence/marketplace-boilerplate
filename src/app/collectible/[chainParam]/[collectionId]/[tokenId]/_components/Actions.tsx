'use client';

import { useState } from 'react';

import { getThemeManagerElement } from '~/lib/utils/theme';

import { Button, Dialog, Flex, ScrollArea, Text } from '$ui';
import { useCollectableData } from '../_hooks/useCollectableData';
import { MarketplaceKind } from '@0xsequence/marketplace-sdk';
import {
  useCreateListingModal,
  useCurrencies,
  useHighestOffer,
  useLowestListing,
  useMakeOfferModal,
  useTokenBalances,
} from '@0xsequence/marketplace-sdk/react';
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
  const { show: showListModal, close: closeListModal } =
    useCreateListingModal();
  const { show: showOfferModal, close: closeOfferModal } = useMakeOfferModal();

  const { data: currencies } = useCurrencies({
    chainId,
    collectionAddress,
  });

  const currencyAddresses = currencies?.map((c) => c.contractAddress) || [];

  const { data: bestOffers, isLoading: isLoadingBestOffers } = useHighestOffer({
    chainId: String(chainId),
    collectionAddress,
    tokenId: tokenId,
    filter: {
      marketplace: [MarketplaceKind.sequence_marketplace_v1],
      currencies: currencyAddresses,
    },
    query: {
      enabled: !!currencies,
    },
  });

  const { data: bestListings, isLoading: isLoadingBestListings } =
    useLowestListing({
      chainId,
      collectionAddress,
      tokenId,
      filter: {
        marketplace: [MarketplaceKind.sequence_marketplace_v1],
      },
      query: {
        enabled: !!currencies,
      },
    });

  const { collectionMetadata, collectibleMetadata } = useCollectableData();

  const isERC1155 = collectionMetadata.data?.type === 'ERC1155';

  const { address, isConnected } = useAccount();

  const { data: userBalanceResp, isLoading: isBalanceLoading } =
    useTokenBalances({
      chainId: chainId,
      contractAddress: collectionAddress,
      tokenId,
      includeMetadata: false,
      accountAddress: address as string,
      query: {
        enabled: !!isConnected && !!address,
      },
    });

  const userBalance = userBalanceResp?.pages?.[0]?.balances[0]?.balance;

  const item721AlreadyOwned = !!userBalance && !isERC1155;

  const isLoading =
    isLoadingBestOffers ||
    isLoadingBestListings ||
    (isConnected && isBalanceLoading);

  const onClickBuy = () => {
    if (!bestListings || !bestListings) return;
    //TODO: buy
  };

  const onClickSell = () => {
    if (!bestOffers || !userBalance) return;
    //todo sell
  };

  const onClickOffer = () => {
    showOfferModal({
      collectionAddress,
      chainId: String(chainId),
      collectibleId: tokenId,
    });
  };

  const onClickList = () => {
    showListModal({
      collectionAddress,
      chainId: String(chainId),
      collectibleId: tokenId,
    });
  };

  const buyDisabled = !bestListings || item721AlreadyOwned;
  const offerDisabled = !isConnected;
  const listingDisabled = !isConnected || !userBalance;
  const sellDisabled = !bestOffers || !userBalance;

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
          <Button
            className="w-full justify-between"
            onClick={onClickOffer}
            size="lg"
            loading={false}
            disabled={offerDisabled}
          >
            <Text className="text-inherit">Offer</Text>
          </Button>
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
          <Button
            className="w-full justify-between"
            onClick={onClickList}
            size="lg"
            loading={false}
            disabled={listingDisabled}
          >
            <Text className="text-inherit">List</Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
