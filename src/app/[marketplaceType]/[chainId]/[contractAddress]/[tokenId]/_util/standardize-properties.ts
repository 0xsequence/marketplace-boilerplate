import type { TokenMetadata } from '@0xsequence/marketplace-sdk';

export type StandardizedProperty = {
  name: string;
  value: string;
  display_type?: string | null | undefined;
};

type StandardizedProperties = Record<string, StandardizedProperty>;
type AttributeCandidate = {
  name?: unknown;
  value?: unknown;
  trait_type?: unknown;
  display_type?: unknown;
};

function isValidAttributePair(candidate: AttributeCandidate): candidate is
  | { name: string; value: string | number; display_type?: string | null }
  | {
      trait_type: string;
      value: string | number;
      display_type?: string | null;
    } {
  return (
    (typeof candidate.name === 'string' ||
      typeof candidate.trait_type === 'string') &&
    (typeof candidate.value === 'string' ||
      typeof candidate.value === 'number') &&
    (candidate.display_type === undefined ||
      candidate.display_type === null ||
      typeof candidate.display_type === 'string')
  );
}

function processAttributesArray(attributes: unknown[]): StandardizedProperties {
  return Object.fromEntries(
    attributes
      // Filter out non-object attributes
      .filter(
        (attr): attr is AttributeCandidate =>
          attr !== null && typeof attr === 'object',
      )
      // Ensure attributes have valid name/value pairs
      .filter(isValidAttributePair)
      // Convert to [name, StandardizedProperty] pairs
      .map((attr) => {
        const name = 'name' in attr ? attr.name : attr.trait_type;
        return [
          name,
          {
            name,
            value: String(attr.value),
            display_type: attr.display_type,
          },
        ];
      }),
  );
}

/**
 * Standardizes token metadata properties into a consistent format
 * @param token - Token metadata object containing attributes and/or properties
 * @returns Object with standardized properties containing name, value, and optional display_type
 */
export function standardizeProperties(
  token: TokenMetadata,
): StandardizedProperties {
  const { attributes, properties } = token;

  // Process base properties from attributes
  const baseProperties = Array.isArray(attributes)
    ? processAttributesArray(attributes)
    : attributes && typeof attributes === 'object'
      ? Object.fromEntries(
          Object.entries(attributes).map(([key, value]) => [
            key,
            {
              name: key,
              value:
                typeof value === 'object' && value !== null
                  ? JSON.stringify(value)
                  : String(value),
              display_type: undefined,
            },
          ]),
        )
      : {};

  // If properties is invalid or missing, return just the base properties
  if (
    !properties ||
    typeof properties !== 'object' ||
    Array.isArray(properties) ||
    Object.keys(properties).length === 0
  ) {
    return baseProperties;
  }

  // Process properties into standardized format
  const processedProperties = Object.fromEntries(
    Object.entries(properties).map(([key, value]) => [
      key,
      {
        name: key,
        value:
          typeof value === 'object' && value !== null
            ? // Handle nested objects with .value property or convert to JSON
              (() => {
                const nestedValue = (value as { value?: unknown }).value;
                if (nestedValue !== undefined) {
                  // Only stringify if it's a primitive, otherwise use JSON.stringify
                  if (typeof nestedValue === 'object' && nestedValue !== null) {
                    return JSON.stringify(nestedValue);
                  }
                  // eslint-disable-next-line @typescript-eslint/no-base-to-string
                  return String(nestedValue);
                }
                return JSON.stringify(value);
              })()
            : (() => {
                const fallbackValue = baseProperties[key]?.value;
                if (value !== null && value !== undefined) {
                  // Only stringify if it's a primitive
                  if (typeof value === 'object' && value !== null) {
                    return JSON.stringify(value);
                  }
                  // eslint-disable-next-line @typescript-eslint/no-base-to-string
                  return String(value);
                }
                if (fallbackValue !== null && fallbackValue !== undefined) {
                  // fallbackValue is already a string from baseProperties
                  return fallbackValue;
                }
                return '';
              })(),
        display_type: baseProperties[key]?.display_type,
      },
    ]),
  );

  // Merge base properties with processed properties (properties take precedence)
  return { ...baseProperties, ...processedProperties };
}
