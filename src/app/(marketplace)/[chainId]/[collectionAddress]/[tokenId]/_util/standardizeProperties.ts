import type { TokenMetadata } from '@0xsequence/metadata';

type StandardizedProperties = Record<string, string>;
type AttributeCandidate = {
  name?: unknown;
  value?: unknown;
  trait_type?: unknown;
};

function isValidAttributePair(
  candidate: AttributeCandidate,
): candidate is
  | { name: string; value: string | number }
  | { trait_type: string; value: string | number } {
  return (
    (typeof candidate.name === 'string' ||
      typeof candidate.trait_type === 'string') &&
    (typeof candidate.value === 'string' || typeof candidate.value === 'number')
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
      // Convert to [name, value] pairs with string values
      .map((attr) => {
        if ('name' in attr) {
          return [attr.name, String(attr.value)];
        }
        return [attr.trait_type, String(attr.value)];
      }),
  );
}

/**
 * Standardizes token metadata properties into a consistent format
 * @param token - Token metadata object containing attributes and/or properties
 * @returns Standardized object with string values for all properties
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
            // Convert objects to JSON strings, other values to strings
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            typeof value === 'object' ? JSON.stringify(value) : String(value),
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

  // Merge and standardize properties with base properties as fallback
  return Object.fromEntries(
    Object.entries(properties).map(([key, value]) => [
      key,
      typeof value === 'object' && value !== null
        ? // Handle nested objects with .value property or convert to JSON
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          String(value.value ?? JSON.stringify(value))
        : String(value ?? baseProperties[key] ?? ''),
    ]),
  );
}
