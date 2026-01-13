'use client';

import { useEffect } from 'react';

import CopyButton from '~/components/copy-button';
import { Portal } from '~/components/portal';
import { useIsMinWidth } from '~/hooks/ui/use-is-min-width';
import type { CollectionParams, MarketplaceType } from '~/types';
import getStickyFilterSidebarTop from '~/utils/get-sticky-filter-sidebar-top';

import { PriceFilter } from './price-filter';
import { PropertyFilters } from './property-filters';
import { useSidebarState } from './sidebar-context';
import {
  CloseIcon,
  IconButton,
  Switch,
  Text,
  Button,
  Scroll,
  cn,
} from '@0xsequence/design-system';
import { type ContractType, truncateMiddle } from '@0xsequence/marketplace-sdk';
import {
  useCollection,
  useFiltersProgressive,
  useFilterState,
} from '@0xsequence/marketplace-sdk/react/hooks';
import { type ChainId, networks } from '@0xsequence/network';
import { useParams } from 'next/navigation';
import type { Address } from 'viem';

type FiltersSidebarProps = {
  collectionAddress: Address;
};

export const FiltersSidebar = ({ collectionAddress }: FiltersSidebarProps) => {
  const isMD = useIsMinWidth('@md');
  const { filtersSidebarOpen } = useSidebarState();
  const params = useParams();
  const { data: collectionData } = useCollection({
    chainId: Number(params.chainId),
    collectionAddress: collectionAddress,
  });

  const stickyFilterSidebarTop = getStickyFilterSidebarTop({
    marketplaceType: params.marketplaceType as MarketplaceType,
    collectionType: collectionData?.type as ContractType,
  });

  if (!filtersSidebarOpen) {
    return null;
  }

  if (!isMD) {
    return (
      <FiltersModalsForSmallScreens collectionAddress={collectionAddress} />
    );
  }

  return (
    <div
      className={'flex sticky w-[194px] mr-2.5'}
      style={{
        top: stickyFilterSidebarTop,
        maxHeight: `calc(100vh - ${stickyFilterSidebarTop})`,
      }}
    >
      <Filters collectionAddress={collectionAddress} />
    </div>
  );
};

const Filters = ({ collectionAddress }: { collectionAddress: Address }) => {
  const params = useParams() as unknown as CollectionParams;
  const chainId = Number(params.chainId);
  const { data: collectionData } = useCollection({
    chainId: Number(params.chainId),
    collectionAddress,
  });
  const isMD = useIsMinWidth('@md');
  const explorerUrl = `${networks[chainId as unknown as ChainId]?.blockExplorer?.rootUrl}address/${collectionAddress}`;
  const isShop = params.marketplaceType === 'shop';

  const {
    data: filters,
    isFetchingValues,
    isLoadingNames,
    isError: filtersError,
  } = useFiltersProgressive({
    chainId,
    collectionAddress,
    query: { enabled: !!collectionAddress && !isShop }, // Only fetch property filters for market
  });

  const { showListedOnly, setShowListedOnly } = useFilterState();
  const stickyFilterSidebarTop = getStickyFilterSidebarTop({
    marketplaceType: params.marketplaceType,
    collectionType: collectionData?.type as ContractType,
  });

  return (
    <div className="[&>div]:before:to-transparent [&>div>div]:pr-2 w-full">
      <Scroll className={isMD ? 'h-full pr-0 md:pr-[14px]' : 'pr-0'}>
        <div
          className={'flex w-full flex-col'}
          style={{
            height: isMD
              ? `calc(100vh - calc(var(--headerHeight) + ${stickyFilterSidebarTop}))`
              : 'auto',
          }}
        >
          <ListedOnlySwitch
            checked={showListedOnly}
            onCheckedChange={setShowListedOnly}
            description={isShop ? 'Show available only' : 'Show listed only'}
          />

          {!isShop && (
            <PriceFilter
              chainId={chainId}
              collectionAddress={collectionAddress}
            />
          )}

          {!isShop && !filtersError && (
            <div className="flex flex-col gap-3">
              <PropertyFilters
                filters={filters}
                isLoadingNames={isLoadingNames}
                isFetchingValues={isFetchingValues}
              />
            </div>
          )}

          {!isShop && filtersError && (
            <div className="flex flex-col p-2 rounded-md bg-background-error">
              <Text className="text-xs text-error">
                Failed to load filters. Please try again.
              </Text>
            </div>
          )}

          <div
            className={cn(
              'flex flex-row md:flex-col! justify-between mb-2 pb-10',
              !isShop && 'border-t border-t-border-normal pt-4 mt-4',
            )}
          >
            <Text className="pl-2 text-xs text-muted font-medium">
              Collection address
            </Text>

            <div className="flex items-center">
              <CopyButton
                className="w-7 h-7 p-0 mr-1"
                size="xs"
                textToCopy={collectionAddress ?? ''}
              />

              <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
                <Text className="text-xs text-primary font-medium">
                  {truncateMiddle(collectionAddress ?? '', 4, 3)}
                </Text>
              </a>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
  );
};

function FiltersModalsForSmallScreens({
  collectionAddress,
}: {
  collectionAddress: Address;
}) {
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
      <div className="fixed top-0 left-0 w-screen! h-screen! z-20 bg-background-primary flex flex-col">
        {/* Fixed header */}
        <div className="flex justify-between items-center p-4 mb-2">
          <Text className="text-large text-primary font-bold">Filters</Text>

          <IconButton
            variant="secondary"
            size="sm"
            icon={CloseIcon}
            onClick={closeFiltersModal}
          />
        </div>

        <div className="flex-1 overflow-auto pb-[100px]">
          <div className="p-4 pt-0">
            <Filters collectionAddress={collectionAddress} />
          </div>
        </div>

        {/* Fixed footer with buttons */}
        <div className="flex items-center justify-between gap-3 bg-background-primary p-4 w-full pb-safe">
          <Button
            className="flex-1 rounded-lg bg-button-glass hover:bg-button-glass/80"
            onClick={handleClearAllFilters}
            shape="square"
          >
            Clear all
          </Button>

          <Button
            className="flex-1 rounded-lg"
            style={{
              background: 'var(--seq-color-gradient-primary)',
            }}
            onClick={closeFiltersModal}
            shape="square"
          >
            Apply
          </Button>
        </div>
      </div>
    </Portal>
  );
}

const ListedOnlySwitch = ({
  checked,
  onCheckedChange,
  description,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  description: string;
}) => {
  return (
    <div
      className={
        'flex items-center justify-between space-x-2 border-b border-b-border-normal pb-4 mb-4'
      }
    >
      <Text className="text-primary text-sm">{description}</Text>
      <Switch
        size="sm"
        id={'show-listed-only'}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};
