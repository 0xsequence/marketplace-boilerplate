import { Progress, Skeleton, Text } from '@0xsequence/design-system';
import { cn } from '@0xsequence/marketplace-sdk';

interface MintedProgressSectionProps {
  quantityTotal: bigint;
  quantityRemaining: bigint;
  quantityMinted: bigint;
  isLoading: boolean;
}

function MintedProgressSection({
  quantityTotal,
  quantityRemaining,
  quantityMinted,
  isLoading,
}: MintedProgressSectionProps) {
  const soldFraction = Math.min(
    1,
    Number(quantityMinted) / Number(quantityTotal),
  );
  const soldPercentage = (soldFraction * 100).toFixed(0);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        {isLoading ? (
          <>
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-10 h-4" />
          </>
        ) : (
          <>
            <Text className={'text-xs font-medium text-secondary'}>
              {quantityRemaining} out of {quantityTotal} left
            </Text>
            <Text className="text-xs font-medium text-secondary">
              {soldPercentage}%
            </Text>
          </>
        )}
      </div>

      <Progress
        value={isLoading ? 0 : soldFraction}
        className={cn(
          'h-3 bg-background-secondary! [&>div]:bg-selected-highlight',
          isLoading && 'loading',
        )}
      />
    </div>
  );
}

export default MintedProgressSection;
