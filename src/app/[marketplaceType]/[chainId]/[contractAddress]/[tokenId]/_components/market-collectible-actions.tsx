'use client';

import React from 'react';

import ConnectButton from '~/components/connect-button';
import { useMarketplaceCollection } from '~/hooks/use-marketplace-collection';
import { getCollectionAddress } from '~/lib/utils';
import type { MarketplaceType } from '~/types';

import { useCollectableData } from '../_hooks/use-collectable-data';
import TimeRemaining from './time-remaining';
import { Text, Button, Image, Skeleton } from '@0xsequence/design-system';
import {
  compareAddress,
  ContractType,
  formatPrice,
  type Order,
} from '@0xsequence/marketplace-sdk';
import {
  useBuyModal,
  useCreateListingModal,
  useHighestOffer,
  useMakeOfferModal,
  useSellModal,
  useTransferModal,
} from '@0xsequence/marketplace-sdk/react';
import {
  useCollectible,
  useCollection,
  useCurrency,
  useLowestListing,
} from '@0xsequence/marketplace-sdk/react/hooks';
import { useParams } from 'next/navigation';
import type { Address } from 'viem';
import { useAccount } from 'wagmi';

type MarketCollectibleActionsProps = {
  isLoading?: boolean;
};

export const MarketCollectibleActions = ({
  isLoading,
}: MarketCollectibleActionsProps) => {
  const { address: accountAddress } = useAccount();
  const { owner, collectibleMetadata } = useCollectableData();
  const params = useParams();
  const chainId = Number(params.chainId);
  const { data: collection } = useMarketplaceCollection(
    params.marketplaceType as MarketplaceType,
  );
  const collectionAddress = getCollectionAddress({
    collection: collection || null,
    marketplaceType: params.marketplaceType as MarketplaceType,
  });
  const tokenId = BigInt(params.tokenId as string);

  const { data: lowestListing, isLoading: lowestListingLoading } =
    useLowestListing({
      chainId,
      collectionAddress,
      tokenId,
    });
  const userMadeLowestListing = compareAddress(
    accountAddress,
    lowestListing?.createdBy,
  );
  const { data: highestOffer, isLoading: highestOfferLoading } =
    useHighestOffer({
      chainId,
      collectionAddress,
      tokenId,
    });
  const userMadeHighestOffer = compareAddress(
    accountAddress,
    highestOffer?.createdBy,
  );

  const { data: sdkCollection } = useCollection({
    chainId,
    collectionAddress,
  });

  const { data: currency, isLoading: currencyLoading } = useCurrency({
    chainId,
    currencyAddress: (lowestListing?.priceCurrencyAddress ?? '') as Address,
  });

  const isTokenOwned =
    !!accountAddress &&
    !isLoading &&
    !owner.isLoading &&
    owner.data != null &&
    owner.data === accountAddress;
  const showBuyNowCta = lowestListing && !userMadeLowestListing;
  const showSellCta = isTokenOwned && highestOffer && !userMadeHighestOffer;

  const isErc721 = sdkCollection?.type === ContractType.ERC721;

  //Show make offer if token is 721 and not owned or if token is 1155
  const showMakeOfferCta = isErc721 ? !isTokenOwned : true;

  const showCreateListingCta = isTokenOwned;

  const showTransferCta = isTokenOwned;

  if (!accountAddress) {
    return (
      <div className="flex flex-col gap-4">
        <Text className="text-lg font-bold text-primary">
          {collectibleMetadata.data?.name || 'Collectible'}
        </Text>

        <Text className="text-base text-muted font-bold">
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
    owner.isLoading ||
    currencyLoading ||
    lowestListingLoading ||
    highestOfferLoading ||
    !sdkCollection?.address
  ) {
    return <CollectibleActionsSkeleton />;
  }

  // No listings, no offers
  if (
    !lowestListing &&
    !highestOffer &&
    !isLoading &&
    !owner.isLoading &&
    collectibleMetadata.data?.name
  ) {
    return (
      <div className="flex flex-col gap-4">
        <Text className="text-lg font-bold text-primary">
          {collectibleMetadata.data?.name}
        </Text>

        <Text className="text-base text-center text-muted font-bold">
          No orders found
        </Text>
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
      <Text className="text-lg font-bold text-primary">
        {collectibleMetadata.data?.name || 'Collectible'}
      </Text>

      {lowestListing ? (
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
  const { data: collection } = useMarketplaceCollection(
    params.marketplaceType as MarketplaceType,
  );
  const collectionAddress = getCollectionAddress({
    collection: collection || null,
    marketplaceType: params.marketplaceType as MarketplaceType,
  });
  const tokenId = BigInt(params.tokenId as string);

  const { show } = useCreateListingModal();

  const openCreateListingModal = () =>
    show({
      chainId,
      collectionAddress,
      tokenId,
    });

  return (
    <Button
      className="w-full rounded-xl bg-secondary/10 hover:bg-secondary/20 h-[52px] [&>div]:justify-center"
      onClick={() => openCreateListingModal()}
    >
      Create listing
    </Button>
  );
}

function MakeOfferCta() {
  const params = useParams();
  const chainId = Number(params.chainId);
  const { data: collection } = useMarketplaceCollection(
    params.marketplaceType as MarketplaceType,
  );
  const collectionAddress = getCollectionAddress({
    collection: collection || null,
    marketplaceType: params.marketplaceType as MarketplaceType,
  });
  const tokenId = BigInt(params.tokenId as string);

  const { show: showMakeOfferModal } = useMakeOfferModal();

  return (
    <Button
      className="w-full rounded-xl bg-secondary/10 hover:bg-secondary/20 h-[52px] [&>div]:justify-center"
      onClick={() =>
        showMakeOfferModal({
          tokenId,
          collectionAddress,
          chainId,
        })
      }
    >
      Make offer
    </Button>
  );
}

function BuyNowCta({ lowestListing }: { lowestListing: Order }) {
  const params = useParams();
  const chainId = Number(params.chainId);
  const { data: collection } = useMarketplaceCollection(
    params.marketplaceType as MarketplaceType,
  );
  const collectionAddress = getCollectionAddress({
    collection: collection || null,
    marketplaceType: params.marketplaceType as MarketplaceType,
  });
  const tokenId = BigInt(params.tokenId as string);

  const { show: openBuyModal } = useBuyModal();

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
            tokenId,
            orderId: lowestListing.orderId,
            marketplace: lowestListing.marketplace,
            cardType: 'market',
            hideQuantitySelector: true,
          })
        }
      >
        Buy now
      </Button>

      <TimeRemaining endDate={lowestListing.validUntil} />
    </>
  );
}

function TransferCta() {
  const params = useParams();
  const chainId = Number(params.chainId);
  const { data: collection } = useMarketplaceCollection(
    params.marketplaceType as MarketplaceType,
  );
  const collectionAddress = getCollectionAddress({
    collection: collection || null,
    marketplaceType: params.marketplaceType as MarketplaceType,
  });
  const tokenId = BigInt(params.tokenId as string);
  const { show } = useTransferModal();
  const { data: collectible } = useCollectible({
    chainId,
    collectionAddress,
    tokenId,
  });

  const openTransferModal = () => {
    if (!collectible) return;

    show({
      chainId,
      collectionAddress,
      tokenId,
    });
  };

  return (
    <Button
      className="w-full rounded-xl bg-secondary/10 hover:bg-secondary/20 h-[52px] [&>div]:justify-center"
      onClick={() => openTransferModal()}
    >
      Transfer
    </Button>
  );
}

function SellCta({ highestOffer }: { highestOffer: Order }) {
  const params = useParams();
  const chainId = Number(params.chainId);
  const { data: collection } = useMarketplaceCollection(
    params.marketplaceType as MarketplaceType,
  );
  const collectionAddress = getCollectionAddress({
    collection: collection || null,
    marketplaceType: params.marketplaceType as MarketplaceType,
  });
  const tokenId = BigInt(params.tokenId as string);
  const { show: showSellModal } = useSellModal();

  const { data: currency } = useCurrency({
    chainId,
    currencyAddress: highestOffer.priceCurrencyAddress,
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
        style={{
          background: 'var(--seq-color-gradient-primary)',
        }}
      >
        {`Sell for ${highestOffer.priceAmountFormatted} ${currency?.symbol}`}
      </Button>

      <TimeRemaining endDate={highestOffer.validUntil} />
    </>
  );
}

export function CollectibleActionsSkeleton() {
  return (
    <div className="flex flex-col rounded-3xl mb-2">
      <div className="flex flex-col gap-2">
        <Skeleton size="sm" className="h-7" />

        <Skeleton size="sm" className="h-7 w-3/4" />

        <Skeleton size="sm" className="h-4 w-1/4" />
      </div>

      <div className="mt-2">
        <Skeleton size="md" className="w-full h-[52px] rounded-xl" />
      </div>
    </div>
  );
}
