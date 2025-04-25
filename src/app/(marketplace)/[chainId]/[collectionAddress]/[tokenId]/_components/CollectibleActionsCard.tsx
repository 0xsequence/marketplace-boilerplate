'use client';

import React from 'react';

import ConnectButton from '~/components/connectButton/ConnectButton';
import CustomSkeleton from '~/components/custom-skeleton/CustomSkeleton';

import TimeRemaining from './TimeRemaining';
import { Text, useToast, Button, Image } from '@0xsequence/design-system';
import {
  compareAddress,
  ContractType,
  formatPrice,
  type Order,
} from '@0xsequence/marketplace-sdk';
import {
  useBuyModal,
  useCreateListingModal,
  useMakeOfferModal,
  useSellModal,
  useTransferModal,
} from '@0xsequence/marketplace-sdk/react';
import {
  useCollectible,
  useCollection,
  useCurrency,
  useListListingsForCollectible,
  useListOffersForCollectible,
  useLowestListing,
} from '@0xsequence/marketplace-sdk/react/hooks';
import { useBalanceOfCollectible } from '@0xsequence/marketplace-sdk/react/hooks';
import { useParams } from 'next/navigation';
import { type Hex } from 'viem';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';

type CollectibleActionCardProps = {
  isLoading?: boolean;
  externalUrl?: string;
};

export const CollectibleActionsCard = ({
  isLoading,
}: CollectibleActionCardProps) => {
  const { address: accountAddress } = useAccount();
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const tokenId = params.tokenId as string;

  const { data: lowestListing, isLoading: lowestListingLoading } =
    useLowestListing({
      chainId,
      collectionAddress,
      tokenId,
    });
  const { data: listings, isLoading: listingsLoading } =
    useListListingsForCollectible({
      chainId,
      collectionAddress,
      collectibleId: tokenId,
    });
  const userMadeLowestListing = compareAddress(
    accountAddress,
    lowestListing?.createdBy,
  );
  // TODO: Change it to useHighestOffer when it returns the highest offer for reservoir
  const { data: offersList, isLoading: offersListLoading } =
    useListOffersForCollectible({
      chainId,
      collectionAddress,
      collectibleId: tokenId,
    });
  const highestOffer = offersList?.offers[0];
  const userMadeHighestOffer = compareAddress(
    accountAddress,
    highestOffer?.createdBy,
  );

  const { data: collectableBalance, isLoading: balanceLoading } =
    useBalanceOfCollectible({
      chainId,
      collectionAddress,
      userAddress: accountAddress,
      collectableId: tokenId,
      query: {
        enabled: !!accountAddress,
      },
    });

  const { data: collection } = useCollection({
    chainId,
    collectionAddress,
  });

  const { data: currency, isLoading: currencyLoading } = useCurrency({
    chainId,
    currencyAddress: lowestListing?.priceCurrencyAddress as Address,
  });

  const isTokenOwned = Number(collectableBalance?.balance) > 0;
  const showBuyNowCta =
    lowestListing &&
    !userMadeLowestListing &&
    listings?.listings.length &&
    listings.listings.length > 0;
  const showSellCta = isTokenOwned && highestOffer && !userMadeHighestOffer;

  const isErc721 = collection?.type === ContractType.ERC721;

  //Show make offer if token is 721 and not owned or if token is 1155
  const showMakeOfferCta = isErc721 ? !isTokenOwned : true;

  const showCreateListingCta = isTokenOwned;

  const showTransferCta = isTokenOwned;

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

  if (
    isLoading ||
    balanceLoading ||
    currencyLoading ||
    lowestListingLoading ||
    offersListLoading ||
    listingsLoading
  ) {
    return <CollectibleActionCardSkeleton />;
  }

  // No listings, no offers
  if (!lowestListing && !highestOffer) {
    return (
      <div className="text-center flex flex-col gap-4">
        <Text className="text-base text-muted font-bold">No orders found</Text>
        {showCreateListingCta && <CreateListingCta />}
        {showMakeOfferCta && <MakeOfferCta />}
        {showTransferCta && <TransferCta />}
      </div>
    );
  }

  const priceAmount = BigInt(lowestListing?.priceAmount || 0);
  // const priceDecimals = lowestListing?.order?.priceDecimals;

  return (
    <div className="flex flex-col gap-2 rounded-3xl mb-2">
      {lowestListing &&
      listings?.listings.length &&
      listings.listings.length > 0 ? (
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center">
            <Image
              src={currency?.imageUrl || ''}
              alt={currency?.symbol || ''}
              className="w-5 h-5 rounded-full"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

            <Text className="text-xl font-bold text-primary ml-2">
              {formatPrice(priceAmount, lowestListing.priceDecimals)}{' '}
              {currency?.symbol}
            </Text>
          </div>
          <p className="text-xs text-muted">
            ~ ${lowestListing.priceUSDFormatted}
          </p>
        </div>
      ) : null}

      {showBuyNowCta && lowestListing && (
        <BuyNowCta lowestListing={lowestListing} />
      )}
      {showSellCta && highestOffer && <SellCta highestOffer={highestOffer} />}
      {showMakeOfferCta && <MakeOfferCta />}
      {showCreateListingCta && <CreateListingCta />}
      {showTransferCta && <TransferCta />}
    </div>
  );
};

function CreateListingCta() {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const tokenId = params.tokenId as string;
  const toast = useToast();

  const { show } = useCreateListingModal({
    onError: (error) => {
      console.log('error while creating listing', error);
      toast({
        title: 'An error occurred while creating listing',
        variant: 'error',
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: 'You created a listing',
        variant: 'success',
        description: 'The listing has been successfully created.',
      });
    },
  });

  const openCreateListingModal = () =>
    show({
      chainId,
      collectionAddress,
      collectibleId: tokenId,
    });

  return (
    <Button
      className="w-full rounded-xl bg-secondary/10 hover:bg-secondary/20 h-[52px] [&>div]:justify-center"
      onClick={() => openCreateListingModal()}
      label="Create listing"
    />
  );
}

function MakeOfferCta() {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const tokenId = params.tokenId as string;
  const toast = useToast();

  const { show: showMakeOfferModal } = useMakeOfferModal({
    onError: (error) => {
      console.log('error while making offer', error);
      toast({
        title: 'An error occurred while making offer',
        variant: 'error',
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: 'You made an offer',
        variant: 'success',
        description: 'The offer has been successfully made.',
      });
    },
  });

  return (
    <Button
      className="w-full rounded-xl bg-secondary/10 hover:bg-secondary/20 h-[52px] [&>div]:justify-center"
      onClick={() =>
        showMakeOfferModal({
          collectibleId: tokenId,
          collectionAddress,
          chainId,
        })
      }
      label="Make offer"
    />
  );
}

function BuyNowCta({ lowestListing }: { lowestListing: Order }) {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const tokenId = params.tokenId as string;
  const toast = useToast();
  const { show: openBuyModal } = useBuyModal({
    onError: (error) => {
      toast({
        title: 'An error occurred while purchasing',
        variant: 'error',
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: 'You purchased the collectible',
        variant: 'success',
        description: 'The collectible has been successfully purchased.',
      });
    },
  });

  return (
    <>
      <Button
        className="w-full rounded-xl h-[52px] [&>div]:justify-center hover:opacity-80"
        style={{
          background: 'var(--seq-color-gradient-primary)',
        }}
        onClick={() =>
          openBuyModal({
            collectionAddress,
            chainId,
            collectibleId: tokenId,
            orderId: lowestListing.orderId,
            marketplace: lowestListing.marketplace,
          })
        }
        label="Buy now"
      />

      <TimeRemaining endDate={lowestListing.validUntil} />
    </>
  );
}

function TransferCta() {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const tokenId = params.tokenId as string;
  const { show } = useTransferModal();
  const { data: collectible } = useCollectible({
    chainId,
    collectionAddress,
    collectibleId: tokenId,
  });

  const openTransferModal = () => {
    if (!collectible) return;

    show({
      chainId,
      collectionAddress,
      collectibleId: tokenId,
    });
  };

  return (
    <Button
      className="w-full rounded-xl bg-secondary/10 hover:bg-secondary/20 h-[52px] [&>div]:justify-center"
      onClick={() => openTransferModal()}
      label="Transfer"
    />
  );
}

function SellCta({ highestOffer }: { highestOffer: Order }) {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const tokenId = params.tokenId as string;
  const toast = useToast();
  const { show: showSellModal } = useSellModal({
    onError: (error) => {
      toast({
        title: 'An error occurred while selling the collectible',
        variant: 'error',
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: 'You sold the collectible',
        variant: 'success',
        description: 'The collectible has been successfully sold.',
      });
    },
  });

  const { data: currency } = useCurrency({
    chainId,
    currencyAddress: highestOffer.priceCurrencyAddress as Address,
  });

  const openSellModal = () =>
    showSellModal({
      collectionAddress,
      chainId,
      tokenId,
      order: highestOffer,
    });

  return (
    <>
      <Button
        className="w-full rounded-xl h-[52px] [&>div]:justify-center hover:opacity-80"
        onClick={openSellModal}
        label={`Sell for ${highestOffer.priceAmountFormatted} ${currency?.symbol}`}
        style={{
          background: 'var(--seq-color-gradient-primary)',
        }}
      />

      <TimeRemaining endDate={highestOffer.validUntil} />
    </>
  );
}

function CollectibleActionCardSkeleton() {
  return (
    <div className="flex flex-col rounded-3xl mb-2">
      <div className="flex flex-row items-center justify-start">
        <div className="mr-1.5">
          <CustomSkeleton style={{ width: 20, height: 20, borderRadius: 10 }} />
        </div>

        <CustomSkeleton />

        <div className="flex-1" />

        <CustomSkeleton style={{ width: 28, height: 28, borderRadius: 14 }} />
      </div>
      <div className="mt-1">
        <CustomSkeleton />
      </div>
    </div>
  );
}
