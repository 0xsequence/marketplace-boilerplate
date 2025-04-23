'use client';

import { cn } from '~/lib/utils';

import CollectibleTabs from './CollectibleTabs';
import CollectibleHeading from './Heading';
import { CollectibleImage } from './Image';
import CollectibleSidebar from './Sidebar';

export default function CollectiblePageClient({
  children,
}: {
  children: React.ReactNode;
}) {
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

      <CollectibleTabs>{children}</CollectibleTabs>
    </div>
  );
}

export const runtime = 'edge';
