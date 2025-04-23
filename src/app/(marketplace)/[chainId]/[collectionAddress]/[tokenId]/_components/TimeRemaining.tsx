import { Text } from '@0xsequence/design-system';
import { intervalToDuration } from 'date-fns';

type TimeRemainingProps = {
  endDate: string;
};

export default function TimeRemaining({ endDate }: TimeRemainingProps) {
  const calculateTimeRemaining = () => {
    const now = new Date();
    const end = new Date(endDate);

    const duration = intervalToDuration({
      start: now,
      end: end,
    });

    const { days, hours, minutes } = duration;

    let result = '';
    if (days) result += `${days} day${days > 1 ? 's' : ''} `;
    if (hours) result += `${hours} hour${hours > 1 ? 's' : ''} `;
    if (minutes) result += `${minutes} minute${minutes > 1 ? 's' : ''}`;

    return result.trim();
  };

  return (
    <Text
      className="text-xs text-center my-2"
      fontWeight="medium"
      color="text50"
    >
      Sale ends: {calculateTimeRemaining()}
    </Text>
  );
}
