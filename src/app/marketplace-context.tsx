'use client';

import { createContext, useContext } from 'react';

const MarketplaceContext = createContext({ marketplaceEnabled: true });

export function MarketplaceProvider({
  children,
  marketplaceEnabled = true,
}: {
  children: React.ReactNode;
  marketplaceEnabled?: boolean;
}) {
  return (
    <MarketplaceContext.Provider value={{ marketplaceEnabled }}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplaceContext() {
  return useContext(MarketplaceContext);
}
