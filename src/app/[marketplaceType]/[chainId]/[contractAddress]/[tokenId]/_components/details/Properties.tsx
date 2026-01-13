import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import CustomSkeleton from '~/components/skeleton';

import { formatUnixTimestamp } from '../../_util/format-unix-timestamp';
import { Text } from '@0xsequence/design-system';
import type { TokenMetadata } from '@0xsequence/marketplace-sdk';
import {
  processProperties,
  processAttributes,
  type StandardizedAttribute,
  type StandardizedProperty,
} from '@0xsequence/marketplace-sdk/react';
import { capitalize } from 'radash';

type PropertiesProps = {
  tokenMetadata?: TokenMetadata;
  isLoading: boolean;
};
export default function Properties(props: PropertiesProps) {
  return (
    <div className="my-4 md:my-10! flex flex-col gap-3">
      <Text className="text-xs text-muted font-medium">Properties</Text>
      <ErrorBoundary
        fallback={
          <Text className="text-xs text-secondary font-medium">
            Error loading properties
          </Text>
        }
      >
        <PropertiesContent {...props} />
      </ErrorBoundary>
    </div>
  );
}

function PropertiesContent({ tokenMetadata, isLoading }: PropertiesProps) {
  const propertiesNotSet =
    tokenMetadata?.attributes.length === 0 &&
    Object.keys(tokenMetadata?.properties || {}).length === 0 &&
    !isLoading;
  // Process attributes and properties separately
  const attributes = tokenMetadata
    ? processAttributes(tokenMetadata.attributes)
    : {};
  const properties = tokenMetadata
    ? processProperties(tokenMetadata.properties)
    : {};

  // Combine both for display (attributes take precedence for display_type)
  const allProperties: Record<
    string,
    StandardizedAttribute | StandardizedProperty
  > = {
    ...properties,
    ...attributes,
  };

  if (propertiesNotSet) {
    return (
      <Text className="text-sm text-secondary font-medium">
        No properties for this collectible
      </Text>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {isLoading && <LoadingProperties count={3} />}
      {Object.entries(allProperties).map(([key, property]) => (
        <Property key={key} name={property.name} value={property.value} />
      ))}
    </div>
  );
}

function LoadingProperties({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonProperty key={`skeleton-${index}`} />
      ))}
    </>
  );
}

function Property({
  name,
  value,
  display_type,
}: {
  name: string;
  value: string;
  display_type?: string | null;
}) {
  let formattedValue = value;

  if (display_type === 'date') formattedValue = formatUnixTimestamp(value);

  return (
    <div className="bg-background-secondary backdrop-blur-xs flex flex-col gap-1 px-3 py-2 rounded-xl">
      <Text className="text-xs text-muted font-medium">{capitalize(name)}</Text>
      <Text className="text-sm text-secondary font-bold wrap-break-word whitespace-pre-wrap">
        {formattedValue}
      </Text>
    </div>
  );
}

function SkeletonProperty() {
  return (
    <div className="bg-background-secondary backdrop-blur-xs flex flex-col gap-1 px-3 py-2 rounded-xl">
      <CustomSkeleton className="h-4 w-full" />
      <CustomSkeleton className="h-4 w-2/3" />
    </div>
  );
}
