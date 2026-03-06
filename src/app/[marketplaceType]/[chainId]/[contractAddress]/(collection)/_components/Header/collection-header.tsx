'use client';

import { useState } from 'react';

import { Grid } from '~/components/grid';
import CollectionAvatar from '~/components/icons/collection-avatar';
import CustomNetworkImage from '~/components/network-image';
import CustomSkeleton from '~/components/skeleton';
import { useMarketplaceCollection } from '~/hooks/use-marketplace-collection';
import { getCollectionAddress } from '~/lib/utils';
import type { MarketplaceType } from '~/types';

import { CollectionSearchInput } from '../Controls/Search';
import { CollectionControls } from '../Controls/collection-controls';
import { useSidebarState } from '../Controls/sidebar/sidebar-context';
import Metrics from './metrics';
import { BugIcon, cn, Image, Text } from '@0xsequence/design-system';
import { OrderSide } from '@0xsequence/marketplace-sdk';
import {
  useCollection,
  useCountOfCollectables,
  useFilterState,
} from '@0xsequence/marketplace-sdk/react/hooks';
import Head from 'next/head';
import { useParams } from 'next/navigation';

const MarketCollectionHeader = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionData = useMarketplaceCollection(
    params.marketplaceType as MarketplaceType,
  );
  const marketplaceCollection = collectionData.data;
  const collectionAddress = getCollectionAddress({
    collection: marketplaceCollection || null,
    marketplaceType: params.marketplaceType as MarketplaceType,
  });
  const { searchBarOpen } = useSidebarState();
  const {
    data: sdkCollection,
    isLoading: collectionLoading,
    isError: collectionError,
  } = useCollection({
    chainId,
    collectionAddress,
  });

  const { filterOptions, searchText, showListedOnly, priceFilters } =
    useFilterState();

  const convertedPriceFilters = priceFilters.map((filter) => ({
    contractAddress: filter.contractAddress,
    min: filter.min ? BigInt(filter.min) : undefined,
    max: filter.max ? BigInt(filter.max) : undefined,
  }));

  const { data: filteredCollectiblesCount } = useCountOfCollectables({
    chainId,
    collectionAddress,
    filter: {
      searchText,
      includeEmpty: !showListedOnly,
      properties: filterOptions,
      prices: convertedPriceFilters,
    },
    side: OrderSide.listing,
  });

  const name = sdkCollection?.name;
  const logo = sdkCollection?.logoURI;
  const image = sdkCollection?.extensions?.ogImage;
  const [imageError, setImageError] = useState(false);

  if (collectionError) {
    return (
      <Grid.Root className={'p-4'}>
        <BugIcon />
        <Text className="text-negative">
          Error loading Collection Metadata. please try again later.
        </Text>
      </Grid.Root>
    );
  }

  return (
    <>
      <Head>
        {image ? <link rel="preload" as="image" href={image} /> : null}
      </Head>
      <div
        className={cn(
          'bg-background-primary flex-col w-full sticky z-[11] outline-[2px] outline-background-primary mb-[2px] mt-[2px]',
          'top-[var(--headerHeight)]',
        )}
      >
        <Grid.Root
          className={cn(
            'gap-x-4 relative items-start',
            'px-0! md:px-2 mt-4 md:mt-5 mb-6',
          )}
          template={`
  "collection-image collection-details" auto
  / auto 1fr
`}
        >
          <Grid.Child name="collection-image" className="flex items-center">
            {logo && !imageError ? (
              <Image
                src={logo}
                alt={name}
                className="h-[60px] w-[60px] rounded-full"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex rounded-full p-4 bg-background-secondary">
                <CollectionAvatar className="w-7 h-7 text-primary/30" />
              </div>
            )}
          </Grid.Child>

          <Grid.Root className="h-full">
            <Grid.Root
              template={`
      "collection-name collection-network" auto
      "collection-metrics collection-metrics" auto
      / min-content 1fr
    `}
              className="gap-y-2"
            >
              <Grid.Child
                name="collection-name"
                className="flex items-center mr-2"
              >
                {collectionLoading ? (
                  <CustomSkeleton />
                ) : (
                  <Text
                    className={cn(
                      'ellipsis text-xl font-semibold text-primary',
                    )}
                    asChild
                  >
                    <h1>{name}</h1>
                  </Text>
                )}
              </Grid.Child>

              <Grid.Child
                name="collection-network"
                className="flex items-center"
              >
                <CustomNetworkImage size="xs" chainId={chainId} />
              </Grid.Child>
              <Grid.Child name="collection-metrics">
                <Metrics />
              </Grid.Child>
            </Grid.Root>
          </Grid.Root>
        </Grid.Root>

        <CollectionControls
          filteredCollectiblesCount={filteredCollectiblesCount ?? 0}
        />

        {searchBarOpen && (
          <CollectionSearchInput className="flex [&>label]:w-full md:hidden mb-6" />
        )}
      </div>
    </>
  );
};

export default MarketCollectionHeader;
