import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
} from 'react';

import type { Address } from 'viem';

type Balance = {
  balance: {
    collectibleId: string;
    balance: number;
  }[];
  decimals?: number;
  fetched: boolean;
};

export interface InventoryState {
  // balances: <collectionAddress>: <balance>
  balances: Record<Address, Balance>;
  listedOnly: boolean;
  searchText: string;
  totalCollections: number;
}

export interface InventoryContextState extends InventoryState {
  toggleListedOnly: () => void;
  setSearchText: (value: string) => void;
  setBalance: (collectionAddress: Address, balance: Balance) => void;
  setTotalCollections: (total: number) => void;
}

const initialState: InventoryState = {
  balances: {},
  listedOnly: false,
  searchText: '',
  totalCollections: 0,
};

const InventoryContext = createContext<InventoryContextState | null>(null);

export const useInventory = (): InventoryContextState => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export const InventoryProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [inventoryState, setInventoryState] =
    useState<InventoryState>(initialState);

  const toggleListedOnly = useCallback(() => {
    setInventoryState((prev) => ({
      ...prev,
      listedOnly: !prev.listedOnly,
    }));
  }, []);

  const setSearchText = useCallback((value: string) => {
    setInventoryState((prev) => ({
      ...prev,
      searchText: value,
    }));
  }, []);

  const setBalance = useCallback(
    (collectionAddress: Address, balance: Balance) => {
      setInventoryState((prev) => {
        const prevCollection = prev.balances[collectionAddress];

        const mergedBalance = {
          ...balance,
          balance: prevCollection
            ? [
                ...prevCollection.balance.filter(
                  (item) =>
                    !balance.balance.some(
                      (newItem) => newItem.collectibleId === item.collectibleId,
                    ),
                ),
                ...balance.balance,
              ]
            : balance.balance,
        };

        return {
          ...prev,
          balances: {
            ...prev.balances,
            [collectionAddress]: mergedBalance,
          },
        };
      });
    },
    [],
  );

  const setTotalCollections = useCallback((total: number) => {
    setInventoryState((prev) => ({
      ...prev,
      totalCollections: total,
    }));
  }, []);

  const inventory: InventoryContextState = {
    ...inventoryState,
    toggleListedOnly,
    setSearchText,
    setBalance,
    setTotalCollections,
  };

  return (
    <InventoryContext.Provider value={inventory}>
      {children}
    </InventoryContext.Provider>
  );
};
