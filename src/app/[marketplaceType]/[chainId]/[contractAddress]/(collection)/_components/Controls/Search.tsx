'use client';

import type React from 'react';
import { useMemo } from 'react';

import { cn } from '~/lib/utils';

import { useSidebarState } from './sidebar/sidebar-context';
import { IconButton, SearchIcon, SearchInput } from '@0xsequence/design-system';
import { useFilterState } from '@0xsequence/marketplace-sdk/react';
import { debounce } from 'radash';

function CollectionSearch() {
  const { searchBarOpen, toggleSearchBar } = useSidebarState();

  return (
    <>
      <CollectionSearchInput className="w-[230px] hidden md:flex!" />

      <IconButton
        variant="secondary"
        className={cn(
          'flex items-center justify-center border-none font-medium rounded-[8px] w-9 h-9 p-2',
          searchBarOpen && 'bg-background-raised',
          'md:hidden!',
        )}
        onClick={toggleSearchBar}
        icon={SearchIcon}
      />
    </>
  );
}

export function CollectionSearchInput({ className }: { className?: string }) {
  const { setSearchText } = useFilterState();

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
    <div className={className}>
      <SearchInput
        name="search"
        placeholder="Search name or ID"
        className={
          'bg-background-primary border border-border-normal focus-visible:border-border-focus h-9 rounded-md'
        }
        onChange={debouncedSearch}
      />
    </div>
  );
}

export default CollectionSearch;
