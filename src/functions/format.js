export function formatDateToSpanish(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateString.match(regex)) {
    return dateString;
  }

  const [year, month, day] = dateString.split("-").map(Number);

  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const formattedDate = `${day.toString().padStart(2, "0")} ${
    months[month - 1]
  } ${year}`;

  return formattedDate;
}

export const formatNumber = (number) => {
  number = number.toString();
  let cleanNumber = number.replace(/[^0-9]/g, "");

  if (cleanNumber.startsWith("0")) {
    cleanNumber = cleanNumber.slice(1);
  }

  return cleanNumber;
};

export function formatRut(rut) {
  const cleanRUT = rut.replace(/[^0-9kK]/g, "").toUpperCase();

  if (cleanRUT.length < 2) {
    return cleanRUT;
  }

  const body = cleanRUT.slice(0, -1);
  const dv = cleanRUT.slice(-1);

  let formattedBody = "";
  for (let i = body.length - 1, j = 0; i >= 0; i--, j++) {
    formattedBody = body.charAt(i) + formattedBody;
    if (j % 3 === 2 && i !== 0) {
      formattedBody = "." + formattedBody;
    }
  }

  return formattedBody + "-" + dv;
}

export const formatNumberWithMax = (number, max) => {
  number = number.toString();
  let cleanNumber = number.replace(/[^0-9]/g, "");

  if (cleanNumber.startsWith("0")) {
    cleanNumber = cleanNumber.slice(1);
  }

  let numericValue = Number(cleanNumber);
  const maxValue = Number(max);

  while (numericValue > maxValue) {
    cleanNumber = cleanNumber.slice(0, -1);
    numericValue = Number(cleanNumber);
  }

  return cleanNumber;
};

export const formatNumberAddThousandsSeparator = (number) => {
  number = number.toString();
  let cleanNumber = number.replace(/[^0-9]/g, "");

  if (cleanNumber.startsWith("0")) {
    cleanNumber = cleanNumber.slice(1);
  }

  return cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatNumberDeleteThousandsSeparator = (number) => {
  let cleanNumber = number.replace(/[^0-9]/g, "");

  return cleanNumber;
};

export const formatNumberAddThousandsSeparatorWithMax = (number, max) => {
  number = formatNumberDeleteThousandsSeparator(number.toString());
  max = formatNumberDeleteThousandsSeparator(max.toString());

  let cleanNumber = number.replace(/[^0-9]/g, "");

  if (cleanNumber.startsWith("0")) {
    cleanNumber = cleanNumber.slice(1);
  }

  let numericValue = Number(cleanNumber);
  const maxValue = Number(max);

  while (numericValue > maxValue) {
    cleanNumber = cleanNumber.slice(0, -1);
    numericValue = Number(cleanNumber);
  }

  return cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatTimestamp = (timestamp) => {
  // Convertir la cadena de timestamp a un objeto Date
  const date = new Date(timestamp);

  // Obtener la fecha en formato yyyy-mm-dd
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const fecha = `${year}-${month}-${day}`;

  // Obtener la hora en formato hh:mm
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const hora = `${hours}:${minutes}`;

  return { fecha, hora };
}

