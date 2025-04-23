import { ssrClient } from '~/app/marketplace-sdk/ssr';
import ScrollToTop from '~/components/ScrollToTop';

import { FilterBadges } from './_components/Badges';
import CollectionBanner from './_components/Banner';
import { FiltersSidebar } from './_components/Controls/Sidebar/FiltersSidebar';
import { SidebarProvider } from './_components/Controls/Sidebar/SidebarContext';
import CollectionHeader from './_components/Header/CollectionHeader';
import type { Hex } from 'viem';

type CollectionParams = {
  chainId: number;
  collectionAddress: Hex;
};

const CollectionPageLayout = async (props: {
  children: React.ReactNode;
  params: Promise<CollectionParams>;
}) => {
  const params = await props.params;
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress;

  const marketplaceConfig = await ssrClient().then((s) =>
    s.getMarketplaceConfig(),
  );

  const collectionConfig = marketplaceConfig.collections?.find(
    (c) =>
      c.address.toLowerCase() == collectionAddress.toLowerCase() &&
      chainId === c.chainId,
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
          <CollectionHeader />

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
