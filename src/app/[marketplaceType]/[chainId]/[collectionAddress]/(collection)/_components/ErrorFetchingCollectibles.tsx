import { Text, WarningIcon } from '@0xsequence/design-system';

function ErrorFetchingCollectibles() {
  return (
    <div className="flex mt-10 py-10 w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <WarningIcon className="w-6 h-6 text-primary/50" />

        <Text className="text-primary/50 font-bold">
          An error occurred while fetching collectibles
        </Text>
      </div>
    </div>
  );
}

export default ErrorFetchingCollectibles;
