import type React from 'react';

import { type CollectibleCardProps } from '@0xsequence/marketplace-sdk/react';
import type { Address, Hex } from 'viem';

type GridVariant = 'stretch' | 'fixed';

export type CollectiblesGridProps = {
  collectionAddress: Hex;
  chainId: number;
  collectiblesList: CollectibleCardProps[];
  collectiblesListLoading: boolean;
  endReached?: () => void;
  limit?: number;
  salesContractAddress?: Address;
  renderItemContent: (index: number) => React.ReactNode;
  isFetchingNextPage?: boolean;
  totalItemsCount?: number;
  variant: GridVariant;
  filtersSidebarOpen?: boolean;
};

export type GridContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  as?: string;
  asChild?: boolean;
  templateRows?: string;
  templateColumns?: string;
  templateAreas?: string;
  template?: string;
  variant: GridVariant;
  filtersSidebarOpen?: boolean;
};

export type ErrorFallbackProps = {
  error: unknown;
  resetErrorBoundary: () => void;
};

export type ViewMoreButtonProps = {
  onClick: () => void;
  remainingItems: number;
};
