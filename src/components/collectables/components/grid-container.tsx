import React from 'react';

import { Grid } from '~/components/grid';
import { cn } from '~/lib/utils';

import type { GridContainerProps } from '../types';

export const GridContainer = React.forwardRef<
  HTMLDivElement,
  GridContainerProps
>((props, ref) => {
  const { className, ...otherProps } = props;
  return (
    <Grid.Root
      className={cn(
        'grid gap-2',
        'grid-cols-2',
        '@[550px]:grid-cols-3',
        '@[756px]:grid-cols-4',
        '@[800px]:grid-cols-4',
        '@[960px]:grid-cols-5',
        className,
      )}
      ref={ref}
      {...otherProps}
    />
  );
});

GridContainer.displayName = 'GridContainer';
