'use client';

import { Grid } from '~/components/ui';

import { IntBadge } from './IntBadge';
import { StringAndArrayBadge } from './StringAndArrayBadge';
import { Button } from '@0xsequence/design-system';
import { useFilterState } from '@0xsequence/marketplace-sdk/react/hooks';
import { PropertyType, type PropertyFilter } from '@0xsequence/metadata';

export const FilterBadges = () => {
  const { filterOptions, clearAllFilters, getFilter } = useFilterState();

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
          const filterType = getFilter(filter.name)?.type;

          switch (filterType) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
            case PropertyType.STRING:
            // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
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
