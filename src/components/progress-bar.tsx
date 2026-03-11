import React from 'react';

import { cn } from '~/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export const ProgressBar = ({
  current,
  total,
  className,
}: ProgressBarProps) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      <div className="flex w-full justify-between text-sm">
        <span>
          {current} out of {total} left
        </span>
        {<span>{percentage}%</span>}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
        <div
          className="h-full rounded-full bg-purple-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
