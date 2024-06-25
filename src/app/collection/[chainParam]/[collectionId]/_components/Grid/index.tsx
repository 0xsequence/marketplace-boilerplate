'use client';

import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import type { ListRange } from 'react-virtuoso';
import { VirtuosoGrid } from 'react-virtuoso';

import { classNames } from '~/config/classNames';

import { Grid, cn } from '$ui';
import type { CollectibleCardData } from './CollectableCard';
import { CollectibleCard } from './CollectableCard';

export type CollectiblesGridProps = {
  virtuosoKey: string;
  totalCount?: number;
  data: CollectibleCardData[];

  onRangeChanged?: (range: ListRange) => void;
  endReached?: () => void;
};

export const CollectiblesGrid = ({
  virtuosoKey,
  totalCount,
  onRangeChanged,
  endReached,
  data,
}: CollectiblesGridProps) => {
  return (
    <VirtuosoGrid
      className="@container/collectiblesGridContainer"
      key={virtuosoKey}
      totalCount={totalCount}
      overscan={{
        main: window.innerHeight * 3,
        reverse: window.innerHeight,
      }}
      useWindowScroll
      components={{
        List: GridContainer,
      }}
      itemContent={(index, data) => <CollectibleCard key={index} data={data} />}
      rangeChanged={onRangeChanged}
      endReached={endReached}
      data={data}
    />
  );
};

type GridContainerProps = {
  className: string;
  [key: string]: any;
};

const GridContainer = forwardRef(
  (props: GridContainerProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { className, ...otherProps } = props;

    return (
      <Grid.Root
        className={cn(
          `${classNames.collectiblesGrid} ${className}`,
          'auto-rows-[minmax(400px,min-content) grid-flow-row',
          'grid-rows-[repeat(auto-fill,minmax(300px, min-content))] grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-1',
          '@md/collectiblesGridContainer:grid-rows-[repeat(auto-fill,minmax(350px, min-content))] @md/collectiblesGridContainer:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]',
          '@lg/collectiblesGridContainer:grid-rows-[repeat(auto-fill,minmax(350px, min-content))] @lg/collectiblesGridContainer:grid-cols-[repeat(auto-fill,minmax(225px,1fr))]',
          '@xl/collectiblesGridContainer:grid-rows-[repeat(auto-fill,minmax(400px, min-content))] @xl/collectiblesGridContainer:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]',
          '@md/collectiblesGridContainer:gap-2 @xl/collectiblesGridContainer:gap-3',
        )}
        ref={ref}
        {...otherProps}
      />
    );
  },
);