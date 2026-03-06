export const formatTimeDistance = (endDateString: string): string => {
  const endDate = new Date(endDateString);
  const now = new Date();
  const diffInMilliseconds = endDate.getTime() - now.getTime();
  const diffInSeconds = Math.abs(Math.floor(diffInMilliseconds / 1000));

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30.44;
  const year = day * 365.25;

  if (diffInSeconds < minute) {
    return `${diffInSeconds} second${diffInSeconds === 1 ? '' : 's'}`;
  } else if (diffInSeconds < hour) {
    const minutes = Math.floor(diffInSeconds / minute);
    return `${minutes} minute${minutes === 1 ? '' : 's'}`;
  } else if (diffInSeconds < day) {
    const hours = Math.floor(diffInSeconds / hour);
    return `${hours} hour${hours === 1 ? '' : 's'}`;
  } else if (diffInSeconds < month * 12) {
    const days = Math.floor(diffInSeconds / day);
    return `${days} day${days === 1 ? '' : 's'}`;
  } else if (diffInSeconds < year) {
    const months = Math.floor(diffInSeconds / month);
    return `${months} month${months === 1 ? '' : 's'}`;
  } else {
    const years = Math.floor(diffInSeconds / year);
    return `${years} year${years === 1 ? '' : 's'}`;
  }
};
