import React from 'react';

import CustomSkeleton from '~/components/custom-skeleton/CustomSkeleton';

import { Text } from '@0xsequence/design-system';

type DescriptionProps = {
  description?: string;
  isLoading: boolean;
};

export default function Description({
  description,
  isLoading,
}: DescriptionProps) {
  const descriptionNotSet = !description && !isLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 mb-3">
        <CustomSkeleton className="h-4 w-full" />
        <CustomSkeleton className="h-4 w-2/3" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 mb-3">
      <Text className="text-xs text-muted font-medium">Description</Text>
      {!descriptionNotSet && (
        <Text className="text-sm text-secondary font-medium">
          {description}
        </Text>
      )}
      {descriptionNotSet && (
        <Text className="text-sm text-secondary font-medium">
          No description for this collectible
        </Text>
      )}
    </div>
  );
}
