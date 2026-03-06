'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type SidebarState = {
  filtersSidebarOpen: boolean;
  searchBarOpen: boolean;
  setFiltersSidebarOpen: (open: boolean) => void;
  setSearchBarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  toggleSearchBar: () => void;
};

const SidebarContext = createContext<SidebarState | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [filtersSidebarOpen, setFiltersSidebarOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const toggleSidebar = () => setFiltersSidebarOpen((prev) => !prev);
  const toggleSearchBar = () => setSearchBarOpen((prev) => !prev);

  const value = {
    filtersSidebarOpen,
    searchBarOpen,
    setFiltersSidebarOpen,
    setSearchBarOpen,
    toggleSidebar,
    toggleSearchBar,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebarState(): SidebarState {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebarState must be used within a SidebarProvider');
  }
  return context;
}
