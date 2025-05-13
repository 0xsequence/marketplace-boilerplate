import { cn } from '~/lib/utils';

import type { ViewMoreButtonProps } from '../types';
import { Button, Text } from '@0xsequence/design-system';

export const ViewMoreButton = ({
  onClick,
  remainingItems,
}: ViewMoreButtonProps) => (
  <div
    className={cn(
      'flex h-[300px]',
      'flex-col items-center justify-center ',
      'rounded-xl bg-transparent border border-border-normal outline-2 outline-transparent',
    )}
  >
    <Text className="text-center text-sm font-bold text-muted mb-4">
      {remainingItems} more items
    </Text>

    <Button
      size="xs"
      label="View more"
      onClick={onClick}
      className="rounded-full text-primary px-3"
    />
  </div>
);
