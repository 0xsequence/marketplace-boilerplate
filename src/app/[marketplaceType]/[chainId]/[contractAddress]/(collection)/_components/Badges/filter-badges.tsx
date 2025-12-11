'use client';

import { Grid } from '~/components/grid';

import { IntBadge } from './int-badge';
import { PriceBadge } from './price-badge';
import { StringAndArrayBadge } from './string-and-array-badge';
import { Button } from '@0xsequence/design-system';
import { type PropertyFilter, PropertyType } from '@0xsequence/marketplace-sdk';
import { useFilterState } from '@0xsequence/marketplace-sdk/react/hooks';
import { useParams } from 'next/navigation';
import type { Address } from 'viem';

export const FilterBadges = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.contractAddress as Address;
  const { filterOptions, priceFilters, clearAllFilters, getFilter } =
    useFilterState();

  const hasFilters = filterOptions.length > 0 || priceFilters.length > 0;

  if (!hasFilters) return null;

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
        {/* Property filters */}
        {filterOptions.map((filter: PropertyFilter) => {
          const filterType = getFilter(filter.name)?.type;

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

        {/* Price filters */}
        {priceFilters.map((priceFilter) => (
          <PriceBadge
            key={`price-${priceFilter.contractAddress}`}
            priceFilter={priceFilter}
            chainId={chainId}
            collectionAddress={collectionAddress}
          />
        ))}

        {hasFilters && (
          <Button
            className="rounded-lg bg-background-secondary"
            size="xs"
            variant="secondary"
            onClick={clearAllFilters}
            shape="square"
          >
            Clear all
          </Button>
        )}
      </div>
    </Grid.Child>
  );
};
