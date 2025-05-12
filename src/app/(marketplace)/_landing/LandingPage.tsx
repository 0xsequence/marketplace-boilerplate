import { ssrClient } from '~/app/marketplace-sdk/ssr';
import { cn } from '~/lib/utils';

import { CollectionCard } from './Card';
import { Text } from '@0xsequence/design-system';
import type { MarketplaceCollection } from '@0xsequence/marketplace-sdk';

export default async function LandingPage() {
  const marketplaceConfig = await ssrClient().then((s) =>
    s.getMarketplaceConfig(),
  );

  const landingBannerUrl =
    marketplaceConfig.landingBannerUrl ||
    '/images/landing-banner-placeholder.png';

  return (
    <div className="relative w-full min-h-[calc(100vh-var(--headerHeight))] flex flex-col">
      <div
        style={{
          backgroundImage: `url(${landingBannerUrl})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        className={cn('h-60 md:h-[412px]', 'flex justify-center items-center')}
      >
        <div
          className={cn('w-[278px] md:w-[420px] ', 'h-[208px] md:h-[315px]')}
        />
      </div>

      <LandingPageContent collections={marketplaceConfig.collections} />
    </div>
  );
}

async function LandingPageContent({
  collections,
}: {
  collections: MarketplaceCollection[];
}) {
  if (collections.length === 0) {
    return (
      <div className="flex flex-col sm:flex-row justify-center items-center h-full mt-4 gap-1.5">
        <Text className="text-xl" color="text100" fontWeight="medium">
          There are no collections in this
        </Text>
        <Text
          className="bg-yellow-300 px-1.5 rounded-xs text-xl leading-7"
          fontWeight="semibold"
        >
          marketplace
        </Text>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'mt-4 md:mt-[49px] px-4 md:px-8',
        'mb-[28px] md:mb-[65px]',
        'flex-col justify-center gap-4 ',
      )}
    >
      <h2 className="font-bold text-xl text-center mb-4 text-primary">
        Select a Collection
      </h2>

      <div
        className={cn(
          'max-w-[1440px] mx-auto',
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          'auto-rows-[240px] md:auto-rows-[250px]',
          'gap-3 align-center justify-center',
        )}
      >
        {collections.map((collection) => {
          return <CollectionCard key={collection.address} {...collection} />;
        })}
      </div>
    </div>
  );
}
