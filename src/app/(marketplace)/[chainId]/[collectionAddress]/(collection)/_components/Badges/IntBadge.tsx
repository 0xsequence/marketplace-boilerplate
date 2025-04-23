'use client';

import { useFilters } from '../FilterProvider';
import { CloseIcon } from '@0xsequence/design-system';
import { Text } from '@0xsequence/design-system';

type IntBadgeProps = {
  name: string;
  min?: number | undefined;
  max?: number | undefined;
};

export const IntBadge = ({ name, min, max }: IntBadgeProps) => {
  const { deleteFilter } = useFilters();

  const formatValue = (value: number | undefined) => {
    if (value === undefined) return '-';
    return value.toLocaleString();
  };

  const displayValue = `${formatValue(min)} to ${formatValue(max)}`;

  return (
    <div className="flex items-center h-7 capitalize rounded-[8px] px-2 py-1 text-primary border border-background-secondary">
      <Text className="text-xs mr-1" color="text50" fontWeight="bold">
        {name}:
      </Text>

      <Text className="text-xs" color="text100" fontWeight="bold">
        {displayValue}
      </Text>
      <CloseIcon
        className="w-4 h-4 ml-2 cursor-pointer"
        onClick={() => deleteFilter(name)}
      />
    </div>
  );
};
