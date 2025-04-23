import React, { useEffect } from 'react';

import OrdersTable from '~/app/(marketplace)/[chainId]/[collectionAddress]/[tokenId]/_components/ordersTable/OrdersTable';

import {
  PaginationProvider,
  usePagination,
} from '../pagination/PaginationContext';
import { Text } from '@0xsequence/design-system';
import {
  useCountOffersForCollectible,
  useListOffersForCollectible,
} from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import { type Hex } from 'viem';

const OffersTable = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const tokenId = params.tokenId as string;

  return (
    <PaginationProvider>
      <OffersContent
        chainId={chainId}
        collectionAddress={collectionAddress}
        tokenId={tokenId}
      />
    </PaginationProvider>
  );
};

const OffersContent: React.FC<{
  chainId: number;
  collectionAddress: Hex;
  tokenId: string;
}> = ({ chainId, collectionAddress, tokenId }) => {
  const page = usePagination();

  const { data: offers, isLoading: offersLoading } =
    useListOffersForCollectible({
      chainId,
      collectionAddress: collectionAddress,
      collectibleId: tokenId,
      page: {
        page: page.page,
        pageSize: page.pageSize,
      },
    });

  useEffect(() => {
    if (offers?.page?.more !== undefined && offers.page.more !== page.more) {
      page.set('more', offers.page.more);
    }
  }, [offers?.page?.more, page]);

  const { data: countOfOffers, isLoading: countOfOffersLoading } =
    useCountOffersForCollectible({
      collectionAddress,
      chainId,
      collectibleId: tokenId,
    });

  if (!offers?.offers.length && !offersLoading) {
    return (
      <div className="border border-border-normal py-8 rounded-md w-full text-center">
        <Text className="text-sm text-muted font-medium">
          Your offers will appear here
        </Text>
      </div>
    );
  }

  return (
    <OrdersTable
      orders={offers?.offers}
      ordersCount={countOfOffers?.count}
      ordersCountLoading={countOfOffersLoading}
      page={page}
      isLoading={offersLoading}
      chainId={chainId}
      collectionAddress={collectionAddress}
      tokenId={tokenId}
    />
  );
};

export default OffersTable;
