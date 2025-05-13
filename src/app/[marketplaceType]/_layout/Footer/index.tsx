import { ssrClient } from '~/app/marketplace-sdk/ssr';
import { cn } from '~/lib/utils';

import { Button, Text } from '@0xsequence/design-system';
import NextLink from 'next/link';

export const Footer = async () => {
  const marketplaceConfig = await ssrClient().then((s) =>
    s.getMarketplaceConfig(),
  );
  const { title: marketplaceTitle } = marketplaceConfig;
  const year = new Date().getFullYear();

  return (
    <div
      className={cn(
        'flex-col md:flex-row!',
        'flex gap-2 md:justify-between! md:items-center!',
        'w-full px-8 py-5',
        'border-t border-border-normal',
        'mt-auto',
      )}
    >
      <Text className="text-sm font-bold text-muted text-center">
        ⓒ{year} {marketplaceTitle}
      </Text>

      <div className="flex gap-2 md:gap-7! items-center justify-center">
        <Button asChild size="sm" variant="text" className="text-muted p-0">
          <NextLink href="/privacy">Privacy Policy</NextLink>
        </Button>

        <Button asChild size="sm" variant="text" className="text-muted p-0">
          <NextLink href="/terms">Terms of Service</NextLink>
        </Button>
      </div>
    </div>
  );
};
