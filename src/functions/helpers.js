export const capitalizeFirstLetter = (str) => {
  if (typeof str === "string" && str.length > 0) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};

export const isEmptyObject = (obj) => {
  return Object.values(obj).every(
    (value) =>
      String(value).trim() === "" || value === null || value === undefined
  );
};

export const isEmptyArrayWithObjects = (array) => {
  return array.every((obj) => {
    return Object.values(obj).every(
      (value) =>
        String(value).trim() === "" || value === null || value === undefined
    );
  });
};
