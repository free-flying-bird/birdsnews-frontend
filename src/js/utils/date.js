export function getDate() {
  const todayDate = new Date();
  const dateInMs = 6 * 86400000;
  const lastDate = new Date(todayDate.getTime() - dateInMs);
  const dateFrom = lastDate.toISOString().slice(0, 10);
  const dateTo = todayDate.toISOString().slice(0, 10);

  return { dateFrom, dateTo };
};