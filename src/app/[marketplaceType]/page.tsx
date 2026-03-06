import { type MarketCollection, type ShopCollection } from '~/lib/types';
import type { MarketplaceType } from '~/types';

import { ssrClient } from '../marketplace-sdk/ssr';
import { LandingPageGrid } from './landing-page-grid';
import { Text } from '@0xsequence/design-system';
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

  if (isShop && !marketplaceConfig.shop.enabled) {
    redirect('/');
  } else if (!isShop && !marketplaceConfig.market.enabled) {
    redirect('/');
  }

  const collections = isShop
    ? marketplaceConfig.shop.collections
    : marketplaceConfig.market.collections;

  const bannerUrl = isShop
    ? marketplaceConfig.shop.bannerUrl
    : marketplaceConfig.market.bannerUrl;

  if (collections?.length === 1) {
    const firstCollection = collections[0]!;
    const { chainId } = firstCollection;
    if (isShop) {
      const { saleAddress } = firstCollection as unknown as ShopCollection;
      redirect(`/${marketplaceType}/${chainId}/${saleAddress}/items`);
    } else {
      const { itemsAddress } = firstCollection as unknown as MarketCollection;
      redirect(`/${marketplaceType}/${chainId}/${itemsAddress}/items`);
    }
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
        className="h-60 md:h-[412px] flex flex-col justify-end items-center"
      />

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
        <LandingPageGrid showPreviewBanner={false} />
      )}
    </div>
  );
};

export default Page;

export const runtime = 'edge';
