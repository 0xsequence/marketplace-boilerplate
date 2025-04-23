'use client';

import { useEffect } from 'react';

import CopyButton from '~/components/CopyButton';
import { useIsMinWidth } from '~/hooks/ui/useIsMinWidth';

import { Portal } from '$ui';
import { PropertyFilters } from './PropertyFilters';
import { useSidebarState } from './SidebarContext';
import {
  CloseIcon,
  IconButton,
  Switch,
  Text,
  Button,
  Scroll,
  cn,
} from '@0xsequence/design-system';
import { truncateMiddle } from '@0xsequence/marketplace-sdk';
import {
  useFiltersProgressive,
  useFilterState,
} from '@0xsequence/marketplace-sdk/react/hooks';
import { type ChainId, networks } from '@0xsequence/network';
import { useParams } from 'next/navigation';
import { type Hex } from 'viem';

export const FiltersSidebar = () => {
  const isMD = useIsMinWidth('@md');
  const { filtersSidebarOpen } = useSidebarState();

  if (!filtersSidebarOpen) {
    return null;
  }

  if (!isMD) {
    return <FiltersModalsForSmallScreens />;
  }

  return (
    <div
      className={'flex sticky w-[194px] mr-2.5'}
      style={{
        top: 'calc(var(--headerHeight) + var(--stickyCollectionHeaderHeight))',
        maxHeight:
          'calc(100vh - calc(var(--headerHeight) + var(--stickyCollectionHeaderHeight)))',
      }}
    >
      <Filters />
    </div>
  );
};

const Filters = () => {
  const params = useParams();
  const chainId = Number(params.chainId);
  const collectionAddress = params.collectionAddress as Hex;
  const isMD = useIsMinWidth('@md');
  const explorerUrl = `${networks[chainId as unknown as ChainId]?.blockExplorer?.rootUrl}address/${collectionAddress}`;

  const {
    data: filters,
    isFetchingValues,
    isLoadingNames,
    isError: filtersError,
  } = useFiltersProgressive({
    chainId,
    collectionAddress,
  });

  const { showListedOnly, setShowListedOnly } = useFilterState();

  return (
    <div className="[&>div]:before:to-transparent [&>div>div]:pr-2">
      <Scroll className={isMD ? 'h-full pr-0 md:pr-[14px]' : 'pr-0'}>
        <div
          className={'flex w-full flex-col'}
          style={{
            height: isMD
              ? 'calc(100vh - calc(var(--headerHeight) + var(--stickyCollectionHeaderHeight)))'
              : 'auto',
          }}
        >
          <ListedOnlySwitch
            checked={showListedOnly}
            onCheckedChange={setShowListedOnly}
          />

          {filtersError ? (
            <div className="flex flex-col p-2 rounded-md bg-background-error">
              <Text className="text-xs text-error">
                Failed to load filters. Please try again.
              </Text>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <PropertyFilters
                filters={filters}
                isLoadingNames={isLoadingNames}
                isFetchingValues={isFetchingValues}
              />
            </div>
          )}

          <div className="flex flex-row md:flex-col! justify-between mb-2 pb-10 border-t border-t-border-normal pt-4 mt-4">
            <Text className="pl-2 text-xs text-muted font-medium">
              Collection address
            </Text>

            <div className="flex items-center">
              <CopyButton
                className="w-7 h-7 p-0 mr-1"
                size="xs"
                textToCopy={collectionAddress}
              />

              <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
                <Text className="text-xs text-primary font-medium">
                  {truncateMiddle(collectionAddress, 4, 3)}
                </Text>
              </a>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
  );
};

function FiltersModalsForSmallScreens() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const { toggleSidebar } = useSidebarState();
  const { clearAllFilters } = useFilterState();

  const closeFiltersModal = () => {
    toggleSidebar();
    document.body.style.overflow = 'initial';
  };

  const handleClearAllFilters = () => {
    clearAllFilters();
    closeFiltersModal();
  };

  return (
    <Portal>
      <div className="absolute top-0 left-0 w-screen! h-screen! z-20 bg-background-primary flex flex-col">
        {/* Fixed header */}
        <div className="flex justify-between items-center p-4 mb-2">
          <Text className="text-large text-primary font-bold">Filters</Text>

          <IconButton
            variant="raised"
            size="sm"
            icon={CloseIcon}
            onClick={closeFiltersModal}
          />
        </div>

        <div className="flex-1 overflow-auto pb-[100px]">
          <div className="p-4 pt-0">
            <Filters />
          </div>
        </div>

        {/* Fixed footer with buttons */}
        <div className="flex items-center justify-between gap-3 bg-background-primary p-4 w-full pb-safe">
          <Button
            className="flex-1 rounded-lg bg-button-glass hover:bg-button-glass/80"
            onClick={handleClearAllFilters}
            shape="square"
            label="Clear all"
          />

          <Button
            className="flex-1 rounded-lg"
            style={{
              background: 'var(--seq-color-gradient-primary)',
            }}
            onClick={closeFiltersModal}
            shape="square"
            label="Apply"
          />
        </div>
      </div>
    </Portal>
  );
}

const ListedOnlySwitch = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => {
  return (
    <div
      className={cn(
        'flex items-center space-x-2 [&>label]:w-full [&>label]:justify-between [&>label>div>span]:text-primary',
        'border-b border-b-border-normal pb-4 mb-4',
      )}
    >
      <Switch
        id={'show-listed-only'}
        description="Show listed only"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};
