import storeConfig from '~/store-config';

import { ssrClient } from '../marketplace-sdk/ssr';
import { LandingPageGrid } from './landing-page-grid';
import { Text } from '@0xsequence/design-system';
import { MarketplaceType } from '@0xsequence/marketplace-sdk';
import { redirect } from 'next/navigation';

const Page = async ({
  params,
}: {
  params: Promise<{ marketplaceType: MarketplaceType }>;
}) => {
  const { getMarketplaceConfig } = await ssrClient();
  const marketplaceConfig = await getMarketplaceConfig();

  const { marketplaceType } = await params;
  const isShop = marketplaceType === 'shop';

  const collections = isShop
    ? storeConfig.shop.collections
    : marketplaceConfig.collections;

  const bannerUrl = isShop
    ? storeConfig.shop.bannerUrl
    : marketplaceConfig.bannerUrl;

  if (collections?.length === 1) {
    const firstCollection = collections[0]!;
    const { chainId, address } = firstCollection;
    redirect(`/${marketplaceType}/${chainId}/${address}/items`);
  }

  const landingBannerUrl =
    bannerUrl || '/images/landing-banner-placeholder.png';

  return (
    <div className="relative w-full min-h-[calc(100vh-var(--headerHeight))] flex flex-col">
      <div
        style={{
          backgroundImage: `url(${landingBannerUrl})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        className="h-60 md:h-[412px] flex justify-center items-center"
      >
        <div className="w-[278px] md:w-[420px] h-[208px] md:h-[315px]" />
      </div>

      {collections?.length === 0 ? (
        <div className="flex flex-col sm:flex-row justify-center items-center h-full mt-4 gap-1.5">
          <Text className="text-xl" color="text100" fontWeight="medium">
            There are no collections in this
          </Text>
          <Text
            className="bg-yellow-300 px-1.5 rounded-xs text-xl leading-7"
            fontWeight="semibold"
          >
            {marketplaceType}
          </Text>
        </div>
      ) : (
        <LandingPageGrid
          collectionsLength={collections?.length || 0}
          marketplaceType={marketplaceType}
        />
      )}
    </div>
  );
};

export default Page;

export const runtime = 'edge';
