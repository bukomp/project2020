export function addDaysToDate(days: number, date: Date = new Date()): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addHoursToDate(hours: number, date: Date = new Date()): Date {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}
