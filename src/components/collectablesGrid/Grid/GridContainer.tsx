import { type ForwardedRef, forwardRef } from 'react';

import { Grid } from '~/components/ui';
import { cn } from '~/lib/utils';

type GridContainerProps = {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export const GridContainer = forwardRef(
  (props: GridContainerProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { className, ...otherProps } = props;

    return (
      <Grid.Root
        className={cn(
          className,
          'grid gap-2',
          'grid-cols-2',
          '@[550px]:grid-cols-3',
          '@[756px]:grid-cols-4',
          '@[800px]:grid-cols-4',
          '@[960px]:grid-cols-5',
        )}
        ref={ref}
        {...otherProps}
      />
    );
  },
);

GridContainer.displayName = 'GridContainer';
