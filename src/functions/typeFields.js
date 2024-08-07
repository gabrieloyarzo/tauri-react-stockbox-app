export const isRutField = (field) => {
  return field === "rutp" || field === "rutu" || field === "rutc";
};

export const isMoneyField = (field) => {
  return field === "total" || field === "precio";
};

export const isNumberField = (field) => {
  return (
    field === "precio" ||
    field === "total" ||
    field === "cit" ||
    field === "mCit" ||
    field === "suma"
  );
};

export const isDateField = (field) => {
  return field === "fecha";
};
