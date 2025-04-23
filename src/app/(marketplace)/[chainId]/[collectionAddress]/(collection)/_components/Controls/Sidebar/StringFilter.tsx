'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import { useIsMinWidth } from '~/hooks/ui/useIsMinWidth';
import { cn } from '~/lib/utils';

import type { FilterProps } from './PropertyFilters';
import { Checkbox, SearchInput, Text } from '@0xsequence/design-system';
import { useFilterState } from '@0xsequence/marketplace-sdk/react';
import Fuse from 'fuse.js';
import { capitalize } from 'radash';

export const StringFilter = ({ filter }: FilterProps) => {
  const { name, values } = filter;
  const [options, setOptions] = useState<string[]>(values as string[]);
  const [search, setSearch] = useState('');
  const showSearchInput = values && values.length > 5;
  const fuse = new Fuse((values as string[]) || []);
  const handleSearch = (value: string) => {
    setSearch(value);
    if (!value) {
      setOptions(values as string[]);
      return;
    }
    const filtered = fuse.search(value);
    setOptions(filtered.map((filteredItem) => filteredItem.item));
  };
  const isMD = useIsMinWidth('@md');
  const { toggleStringFilterValue, isStringValueSelected } = useFilterState();

  const onCheckChange = (value: string) => {
    // apply filters instantly when a filter is toggled, for wide screens. wait user to click on "Apply" button for mobile
    if (isMD) {
      toggleStringFilterValue(name, value);
    } else {
      toggleStringFilterValue(name, value);
    }
  };

  return (
    <AccordionItem
      value={name}
      className="text-primary rounded-[8px] py-2.5 pl-3 pr-2 bg-background-secondary"
    >
      <AccordionTrigger className="pr-2 font-bold text-primary text-left">
        {capitalize(name)}
      </AccordionTrigger>
      <AccordionContent>
        {showSearchInput ? (
          <div
            className={cn(
              'my-2',
              '[&>label>div>div>div]:h-9 [&>label>div>div>div]:rounded-lg [&>label>div>div>div]:px-2',
              '[&>label>div>div>div>svg]:w-3',
              '[&>label>div>div>div>input]:bg-none! [&>label>div>div>div>input]:h-8 [&>label>div>div>div>input]:text-xs',
              '[&>label>div>div>div>button]:w-[20px] [&>label>div>div>div>button]:h-[20px]',
              '[&>label>div>div>div>button>svg]:w-[10px]',
            )}
          >
            <SearchInput
              name={name}
              id="property-search"
              placeholder="Search"
              className="border-border-normal focus-within:border-border-normal"
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleSearch(e.target.value)
              }
            />
          </div>
        ) : (
          <div className="my-2" />
        )}
        {options.length === 0 && (
          <Text className="text-muted" asChild>
            <span>No Results</span>
          </Text>
        )}
        <Virtuoso
          style={{ height: '400px' }}
          totalCount={options.length}
          // Add a key based on filterOptions to force re-render when filters change
          context={{ name }}
          itemContent={(index) => {
            const property = options[index];
            if (!property) return null;

            const isChecked = isStringValueSelected(name, property);
            return (
              <div
                className={cn(
                  'flex cursor-pointer items-center text-primary! gap-2',
                  'py-1 pr-2',
                )}
                onClick={() => onCheckChange(property)}
              >
                <Checkbox
                  className="ring-border-normal [&>span>svg]:w-[14px] [&>span>svg]:h-[14px]"
                  id={property}
                  checked={isChecked}
                  onCheckedChange={() => onCheckChange(property)}
                />

                <Text aria-label={property} className="text-xs text-secondary">
                  {property}
                </Text>
              </div>
            );
          }}
        />
      </AccordionContent>
    </AccordionItem>
  );
};
