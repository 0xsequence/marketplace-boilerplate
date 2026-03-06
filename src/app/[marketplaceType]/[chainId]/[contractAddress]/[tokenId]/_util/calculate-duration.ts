type Duration = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateDuration(start: Date, end: Date): Duration {
  const diffMs = end.getTime() - start.getTime();

  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function formatDuration(duration: Duration): string {
  const { days, hours, minutes } = duration;

  if (days === 0 && hours === 0 && minutes === 0) {
    return 'less than a minute';
  }

  let result = '';
  if (days > 0) result += `${days} day${days > 1 ? 's' : ''} `;
  if (hours > 0) result += `${hours} hour${hours > 1 ? 's' : ''} `;
  if (minutes > 0 && (days > 0 || hours > 0 || minutes > 0)) {
    result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  result = result.replace(/ 0 (hours|minutes)/g, '');

  return result.trim();
}

export { calculateDuration, formatDuration };
