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
  useCountOffersForCollectible,
  useListOffersForCollectible,
} from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';
import type { Address } from 'viem';

const OffersTable = () => {
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
  collectionAddress: Address;
  tokenId: bigint;
}> = ({ chainId, collectionAddress, tokenId }) => {
  const page = usePagination();

  const { data: offers, isLoading: offersLoading } =
    useListOffersForCollectible({
      chainId,
      collectionAddress,
      tokenId,
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
      tokenId,
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
      ordersCount={countOfOffers}
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
