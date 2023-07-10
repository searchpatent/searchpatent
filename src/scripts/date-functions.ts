export function convertDotSeparatedDateToISO(date: string) {
  const [day, month, year] = date.split(".");

  try {
    return new Date(`${year}-${month}-${day}`).toISOString();
  } catch (error) {
    return null;
  }
}
