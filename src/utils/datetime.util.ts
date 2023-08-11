export function currentDateTime(): string {
  return new Date().toISOString();
}
export function addMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}
