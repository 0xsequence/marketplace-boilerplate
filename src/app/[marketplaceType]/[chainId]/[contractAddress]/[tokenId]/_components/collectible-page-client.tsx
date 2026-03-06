'use client';

import { useCollectableData } from '../_hooks/use-collectable-data';
import CollectibleHeading from './Heading';
import CollectibleSidebar from './Sidebar';
import CollectibleTabs from './collectible-tabs';
import CollectibleDetailsTab from './details';
import { cn } from '@0xsequence/marketplace-sdk';
import { Media } from '@0xsequence/marketplace-sdk/react';
import { useParams } from 'next/navigation';

export default function CollectiblePageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { marketplaceType } = useParams();
  const isShop = marketplaceType === 'shop';

  const { collectibleMetadata, owner } = useCollectableData();
  const { data: collectible } = collectibleMetadata;

  const animationUrl = collectible?.animation_url;
  const videoUrl = collectible?.video;
  const imageUrl = collectible?.image;
  const assets = [animationUrl, videoUrl, imageUrl];

  return (
    <div
      className={cn(
        'flex flex-col',
        'gap-4 @xl/collectibleViewContainer:gap-10!',
        'pb-0 @xl/collectibleViewContainer:pb-[90px]!',
      )}
    >
      <div className="block md:hidden!">
        <CollectibleHeading />
      </div>

      <Media
        assets={assets}
        isLoading={collectibleMetadata.isLoading || owner.isLoading}
        containerClassName="w-full h-full aspect-square object-cover rounded-xl"
        mediaClassname="object-contain"
      />

      <div className="block md:hidden!">
        <CollectibleSidebar />
      </div>

      {isShop ? (
        <CollectibleDetailsTab />
      ) : (
        // CollectibleTabs includes details and offers & listings tables
        <CollectibleTabs>{children}</CollectibleTabs>
      )}
    </div>
  );
}

export const runtime = 'edge';
