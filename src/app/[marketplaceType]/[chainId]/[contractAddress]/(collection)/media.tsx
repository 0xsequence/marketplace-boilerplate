'use client';

import { Media } from '@0xsequence/marketplace-sdk/react';

export const MediaWrapper = ({ bannerUrl }: { bannerUrl?: string }) => {
  return (
    <Media
      assets={[
        bannerUrl
          ? `${bannerUrl}`
          : '/images/collection-banner-placeholder.png',
      ]}
      containerClassName="w-full h-auto max-h-[200px] overflow-hidden md:max-h-[400px] min-h-[100px] aspect-auto flex items-center justify-center"
      shouldListenForLoad={false}
      mediaClassname="object-contain h-fit relative"
    />
  );
};
