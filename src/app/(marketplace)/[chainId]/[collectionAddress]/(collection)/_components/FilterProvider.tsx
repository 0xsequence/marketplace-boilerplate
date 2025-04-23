'use client';

import { createContext, useContext, type ReactNode } from 'react';

import { useFilterState } from './Controls/Sidebar/UseFilterStore';

const FilterContext = createContext<ReturnType<typeof useFilterState> | null>(
  null,
);

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}

interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const filterState = useFilterState();
  return (
    <FilterContext.Provider value={filterState}>
      {children}
    </FilterContext.Provider>
  );
}
