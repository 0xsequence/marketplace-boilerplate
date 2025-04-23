'use client';

import { createContext, useContext, type ReactNode, useState } from 'react';

interface HeaderDrawerContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const HeaderDrawerContext = createContext<HeaderDrawerContextType | undefined>(
  undefined,
);

export function HeaderDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <HeaderDrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </HeaderDrawerContext.Provider>
  );
}

export function useHeaderDrawer() {
  const context = useContext(HeaderDrawerContext);

  if (context === undefined) {
    throw new Error(
      'useHeaderDrawer must be used within a HeaderDrawerProvider',
    );
  }

  return context;
}
