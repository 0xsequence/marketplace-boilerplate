import type { ErrorFallbackProps } from '../types';
import { Button, Text } from '@0xsequence/design-system';

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-end justify-center p-4 rounded-md border border-error bg-error-light h-full w-full">
      <Text className="text-negative text-sm font-medium mb-2">
        Failed to load collectible
      </Text>
      <Text className="text-xs text-muted mb-4 max-w-xs text-left">
        {error instanceof Error
          ? error.message
          : 'An unexpected error occurred'}
      </Text>
      <Button
        size="xs"
        onClick={resetErrorBoundary}
        className="rounded-full text-primary px-3"
      >
        Try again
      </Button>
    </div>
  );
}
