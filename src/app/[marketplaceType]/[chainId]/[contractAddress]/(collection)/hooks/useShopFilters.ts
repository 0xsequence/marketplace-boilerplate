import { useState } from 'react';

import { useFilterState } from '@0xsequence/marketplace-sdk/react';

export function useShopFilters() {
  const { searchText, showListedOnly: showAvailableSales } = useFilterState();
  const [date] = useState(new Date().toISOString());

  const filterOptions = {
    includeEmpty: !showAvailableSales,
    searchText: searchText || undefined,
    startDateBefore: date,
    endDateAfter: date,
  };

  return {
    filterOptions,
    date,
  };
}
