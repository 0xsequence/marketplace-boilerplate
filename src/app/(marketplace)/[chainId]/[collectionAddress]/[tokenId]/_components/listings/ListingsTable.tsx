import React, { useEffect } from 'react';

import OrdersTable from '~/app/(marketplace)/[chainId]/[collectionAddress]/[tokenId]/_components/ordersTable/OrdersTable';

import {
  PaginationProvider,
  usePagination,
} from '../pagination/PaginationContext';
import { Text } from '@0xsequence/design-system';
import {
  useCountListingsForCollectible,
  useListListingsForCollectible,
} from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import { type Hex } from 'viem';

const ListingsTable = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const tokenId = params.tokenId as string;

  return (
    <PaginationProvider>
      <ListingsContent
        chainId={chainId}
        collectionAddress={collectionAddress}
        tokenId={tokenId}
      />
    </PaginationProvider>
  );
};

const ListingsContent: React.FC<{
  chainId: number;
  collectionAddress: Hex;
  tokenId: string;
}> = ({ chainId, collectionAddress, tokenId }) => {
  const page = usePagination();

  const { data: listings, isLoading: listingsLoading } =
    useListListingsForCollectible({
      chainId,
      collectionAddress,
      collectibleId: tokenId,
      page: {
        page: page.page,
        pageSize: page.pageSize,
      },
    });

  useEffect(() => {
    if (
      listings?.page?.more !== undefined &&
      listings.page.more !== page.more
    ) {
      page.set('more', listings.page.more);
    }
  }, [listings?.page?.more, page]);

  const { data: countOfListings, isLoading: countOfListingsLoading } =
    useCountListingsForCollectible({
      collectionAddress,
      chainId,
      collectibleId: tokenId,
    });

  if (!listings?.listings.length && !listingsLoading) {
    return (
      <div className="border border-border-normal py-8 rounded-md w-full text-center">
        <Text className="text-sm text-muted font-medium">
          Your listings will appear here
        </Text>
      </div>
    );
  }

  return (
    <OrdersTable
      orders={listings?.listings}
      ordersCount={countOfListings?.count}
      ordersCountLoading={countOfListingsLoading}
      page={page}
      isLoading={listingsLoading}
      chainId={chainId}
      collectionAddress={collectionAddress}
      tokenId={tokenId}
    />
  );
};

export default ListingsTable;
