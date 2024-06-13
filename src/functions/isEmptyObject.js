export const isEmptyObject = (obj) => {
  return Object.values(obj).every(value => String(value).trim() === '' || value === null || value === undefined);
};