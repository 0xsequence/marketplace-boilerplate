import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import type { Page } from '@0xsequence/marketplace-sdk';

export interface PageState extends Page {
  set: <K extends keyof Page>(key: K, value: Page[K]) => void;
}

export const DEFAULT_PAGE_SIZE = 5;

const PaginationContext = createContext<PageState | null>(null);

export const usePagination = (): PageState => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }
  return context;
};

export const PaginationProvider: React.FC<{
  children: ReactNode;
  initialPage?: number;
  initialPageSize?: number;
}> = ({ children, initialPage = 1, initialPageSize = DEFAULT_PAGE_SIZE }) => {
  const [pageState, setPageState] = useState<Page>({
    page: initialPage,
    pageSize: initialPageSize,
    more: false,
  });

  const page: PageState = {
    ...pageState,
    set: function <K extends keyof Page>(key: K, value: Page[K]) {
      setPageState((prev) => ({ ...prev, [key]: value }));
    },
  };

  return (
    <PaginationContext.Provider value={page}>
      {children}
    </PaginationContext.Provider>
  );
};
