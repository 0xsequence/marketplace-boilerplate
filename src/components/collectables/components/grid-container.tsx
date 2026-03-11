import React from 'react';

import { Grid } from '~/components/grid';
import { cn } from '~/lib/utils';

import type { GridContainerProps } from '../types';
import './grid-container.css';

export function GridContainer({
  className,
  ref,
  totalItemsCount,
  variant,
  filtersSidebarOpen,
  ...otherProps
}: GridContainerProps & {
  ref?: React.Ref<HTMLDivElement>;
  totalItemsCount?: number;
  filtersSidebarOpen?: boolean;
}) {
  const getItemsAttribute = () => {
    if (!totalItemsCount || totalItemsCount >= 4) return 'many';
    return totalItemsCount.toString();
  };

  const gridClass =
    variant === 'stretch' && totalItemsCount && totalItemsCount < 5
      ? 'grid-container--stretch'
      : 'grid-container--fixed';

  return (
    <Grid.Root
      className={cn(gridClass, className)}
      data-sidebar-open={filtersSidebarOpen ? 'true' : 'false'}
      data-items={variant === 'stretch' ? getItemsAttribute() : undefined}
      ref={ref}
      {...otherProps}
    />
  );
}
