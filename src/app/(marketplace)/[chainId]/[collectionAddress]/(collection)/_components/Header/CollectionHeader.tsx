'use client';

import CustomNetworkImage from '~/components/custom-network-image/CustomNetworkImage';
import CustomSkeleton from '~/components/custom-skeleton/CustomSkeleton';
import CollectionAvatar from '~/components/icons/CollectionAvatar';
import { cn } from '~/lib/utils';

import { Grid } from '$ui';
import { CollectionControls } from '../Controls/CollectionControls';
import { CollectionSearchInput } from '../Controls/Search';
import { useSidebarState } from '../Controls/Sidebar/SidebarContext';
import Metrics from './Metrics';
import { BugIcon, Image, Text } from '@0xsequence/design-system';
import { useCollection } from '@0xsequence/marketplace-sdk/react/hooks';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import { type Hex } from 'viem';

const CollectionHeader = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const { searchBarOpen } = useSidebarState();
  const {
    data: collection,
    isLoading: collectionLoading,
    isError: collectionError,
  } = useCollection({
    chainId,
    collectionAddress,
  });

  const name = collection?.name;
  const logo = collection?.logoURI;
  const image = collection?.extensions?.ogImage;

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
        className={'bg-background-primary flex-col w-full'}
        style={{
          position: 'sticky',
          top: 'var(--headerHeight)',
          zIndex: 11,
        }}
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
            {logo ? (
              <Image
                src={logo}
                alt={name}
                className="h-[60px] w-[60px] rounded-full"
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
                <CustomNetworkImage size="xs" chainId={Number(chainId)} />
              </Grid.Child>
              <Grid.Child name="collection-metrics">
                <Metrics />
              </Grid.Child>
            </Grid.Root>
          </Grid.Root>
        </Grid.Root>

        <CollectionControls />

        {searchBarOpen && (
          <CollectionSearchInput className="flex [&>label]:w-full md:hidden mb-6" />
        )}
      </div>
    </>
  );
};

export default CollectionHeader;
