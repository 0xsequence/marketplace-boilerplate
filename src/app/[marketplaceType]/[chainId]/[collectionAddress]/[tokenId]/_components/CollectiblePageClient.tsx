'use client';

import { cn } from '~/lib/utils';

import CollectibleTabs from './CollectibleTabs';
import CollectibleHeading from './Heading';
import { CollectibleImage } from './Image';
import CollectibleSidebar from './Sidebar';
import CollectibleDetailsTab from './details';
import { useParams } from 'next/navigation';

export default function CollectiblePageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { marketplaceType } = useParams();
  const isShop = marketplaceType === 'shop';

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

      <CollectibleImage />

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
