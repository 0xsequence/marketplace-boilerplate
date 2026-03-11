'use client';

import { cn } from '~/lib/utils';

import CollectionSearch from '../../Controls/Search';
import { useSidebarState } from '../../Controls/sidebar/sidebar-context';
import { Button, FilterIcon, Text } from '@0xsequence/design-system';
import { ContractType } from '@0xsequence/marketplace-sdk';
import { useFilterState } from '@0xsequence/marketplace-sdk/react';

export const ShopControls = ({
  filteredCollectiblesCount,
  collectionType,
}: {
  filteredCollectiblesCount: number;
  collectionType?: ContractType | undefined;
}) => {
  const { filtersSidebarOpen, toggleSidebar, searchBarOpen } =
    useSidebarState();
  const { filterOptions } = useFilterState();

  return (
    <div
      className={cn(
        'flex items-center gap-2 bg-background-primary',
        `${searchBarOpen ? 'mb-2' : 'mb-6'} md:mb-8`,
      )}
    >
      <Button
        variant="secondary"
        className={cn(
          'flex items-center justify-center border-none font-medium rounded-[8px] h-9 p-2',
          filterOptions.length > 0 ? 'w-auto' : 'w-9!',
          filtersSidebarOpen && 'bg-background-raised',
        )}
        onClick={toggleSidebar}
      >
        <div className="flex items-center gap-2">
          <FilterIcon className="w-5 h-5" />

          {filterOptions.length > 0 && (
            <Text className="text-primary font-bold">
              {filterOptions.length}{' '}
            </Text>
          )}
        </div>
      </Button>

      {collectionType === ContractType.ERC1155 && <CollectionSearch />}

      <Text className="text-sm text-muted">
        {filteredCollectiblesCount} results
      </Text>
      <div className="grow" />
    </div>
  );
};
