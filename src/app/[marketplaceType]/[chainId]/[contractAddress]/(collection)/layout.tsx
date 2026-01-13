import { ssrClient } from '~/app/marketplace-sdk/ssr';
import ScrollToTop from '~/components/scroll-to-top';
import getMarketplaceCollection from '~/lib/get-marketplace-collection';
import { getCollectionAddress } from '~/lib/utils';
import type { MarketplaceType } from '~/types';

import { FilterBadges } from './_components/Badges';
import { FiltersSidebar } from './_components/Controls/sidebar/filters-sidebar';
import { SidebarProvider } from './_components/Controls/sidebar/sidebar-context';
import { CollectionHeader } from './_components/Header';
import { MediaWrapper } from './media';
import type { Address } from 'viem';

type CollectionParams = {
  chainId: number;
  contractAddress: Address;
  marketplaceType: MarketplaceType;
};

const CollectionPageLayout = async (props: {
  children: React.ReactNode;
  params: Promise<CollectionParams>;
}) => {
  const params = await props.params;
  const chainId = Number(params.chainId);
  const collection = await getMarketplaceCollection({
    params: {
      ...params,
      contractAddress: params.contractAddress,
    },
  });
  const { marketplaceType } = params;
  const collectionAddress = getCollectionAddress({
    collection,
    marketplaceType,
  });
  const { getMarketplaceConfig, showPreviewBanner } = await ssrClient();
  const marketplaceConfig = await getMarketplaceConfig();

  const collections =
    marketplaceType === 'market'
      ? marketplaceConfig.market.collections
      : marketplaceConfig.shop.collections;
  const marketShopBannerUrl =
    marketplaceType === 'market'
      ? marketplaceConfig.market.bannerUrl
      : marketplaceConfig.shop.bannerUrl;
  const bannerUrl =
    collection?.bannerUrl ||
    (collections.length === 1 ? marketShopBannerUrl : undefined);

  return (
    <>
      <ScrollToTop />

      <MediaWrapper bannerUrl={bannerUrl} />
      <SidebarProvider>
        <div className="flex flex-col w-full lg:w-[960px]! mx-auto min-h-screen px-4 lg:px-0!">
          <CollectionHeader
            marketplaceType={marketplaceType}
            chainId={chainId}
            collectionAddress={collectionAddress}
            showPreviewBanner={showPreviewBanner}
          />

          <div className="flex w-full mx-auto ">
            <FiltersSidebar collectionAddress={collectionAddress} />

            <div className="flex pb-7 flex-col flex-1">
              {!!collection && <FilterBadges />}

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
