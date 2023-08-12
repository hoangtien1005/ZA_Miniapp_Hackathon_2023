import dayjs from 'dayjs';

export function currentDateTime(): string {
  return new Date().toISOString();
}
export function addMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

export function renderDateTime(startTime, endTime) {
  if (!startTime || !endTime) return '';

  const currentTime = Date.now();
  if (currentTime > startTime && currentTime < endTime) {
    return 'Đang diễn ra';
  }
  if (currentTime < startTime) {
    // return minutes left
    const minutesLeft = Math.floor((startTime - currentTime) / 60000);
    return `${minutesLeft} phút nữa`;
  }

  const Difference_In_Time = currentTime - endTime;

  // To calculate the no. of days between two dates
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  if (Difference_In_Days < 1) {
    return 'Kết thúc';
  }
  return `${Math.floor(Difference_In_Days)} ngày trước`;
}
