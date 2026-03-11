export function formatUnixTimestamp(value: string): string {
  try {
    const timestamp = parseInt(value, 10);
    const timestampInMs = value.length === 13 ? timestamp : timestamp * 1000;

    const date = new Date(timestampInMs);

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  } catch {
    return value;
  }
}
