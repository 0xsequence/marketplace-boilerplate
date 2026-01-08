import { useMemo } from 'react';

import CustomSkeleton from '~/components/skeleton';

import { Text } from '@0xsequence/design-system';
import quikdown from 'quikdown';

type DescriptionProps = {
  description?: string;
  isLoading: boolean;
};

export default function Description({
  description,
  isLoading,
}: DescriptionProps) {
  const descriptionHtml = useMemo(() => {
    if (!description) return '';
    return quikdown(description, { inline_styles: true });
  }, [description]);

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
      {descriptionHtml ? (
        <div
          className="text-sm text-secondary font-medium [&_a]:text-primary [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      ) : (
        <Text className="text-sm text-secondary font-medium">
          No description for this collectible
        </Text>
      )}
    </div>
  );
}
