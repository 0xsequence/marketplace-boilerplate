import React from 'react';

import { cn, Skeleton } from '@0xsequence/design-system';

function CustomSkeleton({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Skeleton
      className={cn(
        'animate-shimmer bg-linear-to-r from-background-control to-background-secondary rounded-md',
        className,
      )}
      size="normal"
      style={style}
    />
  );
}

export default CustomSkeleton;
