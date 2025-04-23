import { ssrClient } from '~/app/marketplace-sdk/ssr';
import ScrollToTop from '~/components/ScrollToTop';
import { cn } from '~/lib/utils';

import type { Metadata } from 'next';

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'mx-auto flex-col gap-24 px-2 py-10',
        'w-full lg:w-[960px]! lg:px-0! min-h-screen',
        'relative z-1',
      )}
      style={{ minHeight: 'calc(100vh - var(--headerHeight))' }}
    >
      <ScrollToTop />

      {children}
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const marketplaceConfig = await ssrClient().then((s) =>
    s.getMarketplaceConfig(),
  );

  return {
    title: `${marketplaceConfig.title} - Inventory`,
  };
}
