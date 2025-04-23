'use client';

import { CloseIcon, Text } from '@0xsequence/design-system';
import { useFilterState } from '@0xsequence/marketplace-sdk/react';
import type { PropertyFilter } from '@0xsequence/metadata';

type StringAndArrayBadgeProps = {
  filter: PropertyFilter;
};

export const StringAndArrayBadge = ({ filter }: StringAndArrayBadgeProps) => {
  const { name, values = [] } = filter;
  const { deleteFilter } = useFilterState();

  return (
    <div className="flex items-center h-7 capitalize rounded-[8px] px-2 py-1 text-primary border border-background-secondary">
      <Text className="text-xs mr-1" color="text50" fontWeight="bold">
        {name}:
      </Text>

      <Text className="text-xs" color="text100" fontWeight="bold">
        {(values as string[]).join(', ')}
      </Text>

      <CloseIcon
        className="w-4 h-4 ml-2 cursor-pointer"
        onClick={() => deleteFilter(name)}
      />
    </div>
  );
};
