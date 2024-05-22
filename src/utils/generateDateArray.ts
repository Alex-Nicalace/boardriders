export function generateDateArray(from: Date | string, to: Date | string) {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  // Проверка валидности дат
  if (
    isNaN(fromDate.getTime()) ||
    isNaN(toDate.getTime()) ||
    fromDate > toDate
  ) {
    throw new Error('Invalid date range');
  }
  const daysCount =
    (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
  return Array.from({ length: daysCount }, (_, index) => {
    const date = new Date(fromDate);
    date.setDate(fromDate.getDate() + index);
    return date;
  });
}
