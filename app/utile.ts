export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;

export const getYYMMDD = () => {
  const today = new Date();
  const year = today.getFullYear(); // 년도
  const month = today.getMonth() + 1; // 월
  const date = today.getDate();
  return `${year % 100}${month}${date}`;
};
