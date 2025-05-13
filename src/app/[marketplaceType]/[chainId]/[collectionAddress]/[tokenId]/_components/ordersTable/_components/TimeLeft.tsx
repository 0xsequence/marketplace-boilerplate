'use client';

import { useState, useEffect } from 'react';

import { formatTimeDistance } from '../../../_util/formatTimeDistance';
import { Text } from '@0xsequence/design-system';

const TimeLeft = ({ endDate }: { endDate: string }) => {
  const [formattedTime, setFormattedTime] = useState<string>('');

  useEffect(() => {
    try {
      const date = new Date(endDate);
      if (isNaN(date.getTime())) {
        setFormattedTime('Invalid Date');
        return;
      }

      setFormattedTime(formatTimeDistance(endDate));
    } catch (error) {
      console.error('Error formatting date:', error);
      setFormattedTime('Error formatting date');
    }
  }, [endDate]);

  return (
    <Text className="text-xs text-secondary font-medium">{formattedTime}</Text>
  );
};

export default TimeLeft;
