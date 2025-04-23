'use client';

import { cn } from '~/lib/utils';

import { useListCollectiblesArgs } from '../../_hooks/useListCollectiblesArgs';
import CollectionSearch from './Search';
import { useSidebarState } from './Sidebar/SidebarContext';
import { Button, FilterIcon, Text } from '@0xsequence/design-system';
import { useCountOfCollectables } from '@0xsequence/marketplace-sdk/react';
import { useFilterState } from '@0xsequence/marketplace-sdk/react';

export const CollectionControls = () => {
  const { filtersSidebarOpen, toggleSidebar, searchBarOpen } =
    useSidebarState();
  const { filterOptions } = useFilterState();
  const { data: filteredCollectiblesCount } = useCountOfCollectables(
    useListCollectiblesArgs(),
  );

  return (
    <div
      className={cn(
        'flex items-center gap-2 bg-background-primary',
        `${searchBarOpen ? 'mb-2' : 'mb-6'} md:mb-8`,
      )}
    >
      <Button
        variant="raised"
        className={cn(
          'flex items-center justify-center border-none font-medium rounded-[8px] h-9 p-2',
          filterOptions.length > 0 ? 'w-auto' : 'w-9',
          filtersSidebarOpen && 'bg-background-control',
        )}
        onClick={toggleSidebar}
        label={
          <div className="flex items-center gap-2">
            <FilterIcon className="w-5 h-5" />

            {filterOptions.length > 0 && (
              <Text className="text-primary font-bold">
                {filterOptions.length}{' '}
              </Text>
            )}
          </div>
        }
      />

      <CollectionSearch />

      <Text className="text-sm text-muted">
        {filteredCollectiblesCount} results
      </Text>
      <div className="grow" />
    </div>
  );
};
