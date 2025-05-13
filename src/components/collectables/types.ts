import type React from 'react';

import type { CollectibleOrder } from '@0xsequence/marketplace-sdk';
import type { Address, Hex } from 'viem';

export type CollectiblesGridProps = {
  collectionAddress: Hex;
  chainId: number;
  collectiblesList: CollectibleOrder[];
  collectiblesListLoading: boolean;
  endReached?: () => void;
  limit?: number;
  salesContractAddress?: Address;
};

export type GridContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  as?: string;
  asChild?: boolean;
  templateRows?: string;
  templateColumns?: string;
  templateAreas?: string;
  template?: string;
};

export type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export type ViewMoreButtonProps = {
  onClick: () => void;
  remainingItems: number;
};
