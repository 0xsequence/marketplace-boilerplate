'use client';

import type React from 'react';
import { useMemo } from 'react';

import { cn } from '~/lib/utils';

import { useFilters } from '../FilterProvider';
import { IconButton, SearchIcon, SearchInput } from '@0xsequence/design-system';
import { debounce } from 'radash';

function CollectionSearch() {
  const { searchBarOpen, toggleSearchBar } = useFilters();

  return (
    <>
      <CollectionSearchInput className="w-[216px] hidden md:flex!" />

      <IconButton
        variant="raised"
        className={cn(
          'flex items-center justify-center border-none font-medium rounded-[8px] w-9 h-9 p-2',
          searchBarOpen && 'bg-background-control',
          'md:hidden!',
        )}
        onClick={toggleSearchBar}
        icon={SearchIcon}
      />
    </>
  );
}

export function CollectionSearchInput({ className }: { className?: string }) {
  const { setSearchText } = useFilters();

  const debouncedSearch = useMemo(
    () =>
      debounce(
        { delay: 500 },
        ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
          void setSearchText(value);
        },
      ),
    [setSearchText],
  );

  return (
    <div className="[&>label>div>div]:w-[216px] [&>label>div>div]:h-9 [&>label>div>div]:rounded-lg [&>label>div>div]:pl-2 [&>label>div>div>input]:bg-none! [&>label>div>div>input]:h-8">
      <SearchInput
        name="search"
        placeholder="Search name or ID"
        className={cn(
          'bg-background-primary border border-border-normal focus-visible:border-border-focus',
          className,
        )}
        onChange={debouncedSearch}
        onClear={() => setSearchText('')}
      />
    </div>
  );
}

export default CollectionSearch;
