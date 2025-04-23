export const truncateMiddle = (
  address: string,
  minPrefix = 20,
  minSuffix = 3,
): string => {
  if (minPrefix + minSuffix >= 40) {
    return address;
  }
  return `${address.substring(0, 2 + minPrefix)}…${address.substring(address.length - minSuffix)}`;
};
