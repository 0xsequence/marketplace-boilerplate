'use client';

import { useCallback } from 'react';

import { Grid } from '~/components/ui';

import { useFilters } from '../FilterProvider';
import { IntBadge } from './IntBadge';
import { StringAndArrayBadge } from './StringAndArrayBadge';
import { Button } from '@0xsequence/design-system';
import { useFilters as useFiltersMeta } from '@0xsequence/marketplace-sdk/react/hooks';
import { PropertyType, type PropertyFilter } from '@0xsequence/metadata';
import { useParams } from 'next/navigation';
import { type Hex } from 'viem';

export const FilterBadges = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const { filterOptions, clearAllFilters } = useFilters();

  const { data } = useFiltersMeta({
    chainId,
    collectionAddress,
  });

  const getFilterType = useCallback(
    (name: string) => data?.find((f) => f.name === name)?.type,
    [data],
  );

  if (!filterOptions.length) return null;

  return (
    <Grid.Child
      name="collection-filter-badges"
      className="bg-background-primary pb-3 w-full"
      style={{
        position: 'sticky',
        zIndex: 11,
        top: 'calc(var(--headerHeight) + var(--stickyCollectionHeaderHeight))',
      }}
    >
      <div className="flex w-full gap-2 flex-wrap">
        {filterOptions.map((filter: PropertyFilter) => {
          const filterType = getFilterType(filter.name);

          switch (filterType) {
            case PropertyType.STRING:
            case PropertyType.ARRAY:
              if (filter?.values?.length) {
                return (
                  <StringAndArrayBadge
                    key={`string-${filter.name}`}
                    filter={filter}
                  />
                );
              }
              return null;
            case PropertyType.INT:
              return (
                <IntBadge
                  key={`int-${filter.name}`}
                  name={filter.name}
                  min={filter.min}
                  max={filter.max}
                />
              );
            default:
              return null;
          }
        })}

        {filterOptions.length > 0 && (
          <Button
            className="rounded-lg bg-background-secondary"
            size="xs"
            variant="raised"
            onClick={clearAllFilters}
            label="Clear all"
            shape="square"
          />
        )}
      </div>
    </Grid.Child>
  );
};
