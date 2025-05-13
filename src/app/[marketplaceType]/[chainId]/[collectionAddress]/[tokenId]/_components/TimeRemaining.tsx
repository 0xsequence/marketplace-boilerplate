'use client';

import { useState, useEffect } from 'react';

import { formatDuration } from '../_util/calculateDuration';
import { calculateDuration } from '../_util/calculateDuration';
import { Skeleton, Text } from '@0xsequence/design-system';

type TimeRemainingProps = {
  endDate: string;
};

function TimeRemaining({ endDate }: TimeRemainingProps) {
  const [remainingTime, setRemainingTime] = useState<string | null>(null);
  const [isValidDate, setIsValidDate] = useState(true);

  useEffect(() => {
    const end = new Date(endDate);

    if (isNaN(end.getTime())) {
      console.error('Invalid end date provided:', endDate);
      setIsValidDate(false);
      setRemainingTime('Invalid date');
      return;
    } else {
      setIsValidDate(true);
    }

    const updateRemainingTime = () => {
      const now = new Date();
      const duration = calculateDuration(now, end);
      const formatted = formatDuration(duration);

      if (
        duration.days === 0 &&
        duration.hours === 0 &&
        duration.minutes === 0 &&
        duration.seconds === 0
      ) {
        setRemainingTime('Sale ended');
      } else {
        setRemainingTime(formatted);
      }
    };

    updateRemainingTime();
  }, [endDate]);

  if (remainingTime === null && isValidDate) {
    return (
      <div className="flex justify-center items-center">
        <Skeleton className="w-1/2 h-4 my-2 rounded-md" />
      </div>
    );
  }

  return (
    <Text
      className="text-xs text-center my-2"
      fontWeight="medium"
      color={isValidDate ? 'text50' : 'negative'}
    >
      {isValidDate &&
      remainingTime !== 'Sale ended' &&
      remainingTime !== 'Invalid date'
        ? 'Sale ends: '
        : ''}
      {remainingTime}
    </Text>
  );
}

export default TimeRemaining;
