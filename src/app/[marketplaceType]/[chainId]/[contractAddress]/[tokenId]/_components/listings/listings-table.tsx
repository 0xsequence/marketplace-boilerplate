import { useEffect } from 'react';

import OrdersTable from '~/app/[marketplaceType]/[chainId]/[contractAddress]/[tokenId]/_components/orders-table/orders-table';
import { useMarketplaceCollection } from '~/hooks/use-marketplace-collection';
import { getCollectionAddress } from '~/lib/utils';
import type { MarketplaceType } from '~/types';

import {
  PaginationProvider,
  usePagination,
} from '../pagination/pagination-context';
import { Text } from '@0xsequence/design-system';
import {
  useCountListingsForCollectible,
  useListListingsForCollectible,
} from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import type { Address } from 'viem';

const ListingsTable = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const { data: marketplaceCollection } = useMarketplaceCollection(
    params.marketplaceType as MarketplaceType,
  );
  const collectionAddress = getCollectionAddress({
    collection: marketplaceCollection || null,
    marketplaceType: params.marketplaceType as MarketplaceType,
  });
  const tokenId = BigInt(params.tokenId as string);

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
  collectionAddress: Address;
  tokenId: bigint;
}> = ({ chainId, collectionAddress, tokenId }) => {
  const page = usePagination();

  const { data: listings, isLoading: listingsLoading } =
    useListListingsForCollectible({
      chainId,
      collectionAddress,
      tokenId,
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
      chainId,
      collectionAddress,
      tokenId,
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
      ordersCount={countOfListings}
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
