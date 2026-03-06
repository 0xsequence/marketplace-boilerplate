'use client';

import React from 'react';
import { VirtuosoGrid } from 'react-virtuoso';

import { GridContainer } from './components';
import type { CollectiblesGridProps, GridContainerProps } from './types';
import { Spinner } from '@0xsequence/design-system';

export function CollectiblesGrid({
  endReached,
  collectiblesList,
  renderItemContent,
  isFetchingNextPage,
  totalItemsCount,
  variant,
  filtersSidebarOpen,
}: CollectiblesGridProps) {
  return (
    <div className="@container collectibles-grid">
      <VirtuosoGrid
        useWindowScroll
        itemClassName="flex justify-center"
        components={{
          // @ts-expect-error TODO: 'variant' is declared here.
          // eslint-disable-next-line react/display-name
          List: React.forwardRef<HTMLDivElement, GridContainerProps>(
            (props, ref) => (
              <GridContainer
                {...props}
                ref={ref}
                totalItemsCount={totalItemsCount}
                variant={variant}
                filtersSidebarOpen={filtersSidebarOpen}
              />
            ),
          ),
        }}
        itemContent={(index) => renderItemContent(index)}
        endReached={endReached}
        overscan={250}
        totalCount={collectiblesList?.length || 0}
        data={collectiblesList || []}
      />

      {isFetchingNextPage && (
        <div className="flex justify-center w-full pt-8">
          <Spinner size="md" />
        </div>
      )}
    </div>
  );
}
