import { ssrClient } from '~/app/marketplace-sdk/ssr';
import CollectionBanner from '~/app/move-to-SDK/banner';
import ScrollToTop from '~/components/scroll-to-top';
import storeConfig from '~/store-config';

import { FilterBadges } from './_components/Badges';
import { FiltersSidebar } from './_components/Controls/Sidebar/FiltersSidebar';
import { SidebarProvider } from './_components/Controls/Sidebar/SidebarContext';
import { CollectionHeader } from './_components/Header';
import { compareAddress, type MarketplaceType } from '@0xsequence/marketplace-sdk';
import type { Hex } from 'viem';

type CollectionParams = {
  chainId: number;
  collectionAddress: Hex;
  marketplaceType: string;
};

const CollectionPageLayout = async (props: {
  children: React.ReactNode;
  params: Promise<CollectionParams>;
}) => {
  const params = await props.params;
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress;
  const marketplaceType = params.marketplaceType as MarketplaceType;
  const { getMarketplaceConfig } = await ssrClient();
  const marketplaceConfig = await getMarketplaceConfig();

  const collections =
    marketplaceType === 'market'
      ? marketplaceConfig.collections
      : storeConfig.shop.collections;

  const collectionConfig = collections.find(
    (c) =>
      compareAddress(c.address, collectionAddress) && chainId === c.chainId,
  );

  return (
    <>
      <ScrollToTop />

      <CollectionBanner
        bannerUrl={
          collectionConfig?.bannerUrl
            ? `${collectionConfig.bannerUrl}`
            : '/images/collection-banner-placeholder.png'
        }
      />
      <SidebarProvider>
        <div className="flex flex-col w-full lg:w-[960px]! mx-auto min-h-screen px-4 lg:px-0!">
          <CollectionHeader
            marketplaceType={marketplaceType}
            chainId={chainId}
            collectionAddress={collectionAddress}
          />

          <div className="flex w-full mx-auto ">
            <FiltersSidebar />

            <div className="flex pb-7 flex-col flex-1">
              {collectionConfig && <FilterBadges />}

              {props.children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default CollectionPageLayout;

export const runtime = 'edge';
