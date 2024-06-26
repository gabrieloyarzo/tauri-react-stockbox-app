export function formatRut(rut) {
  const cleanRUT = rut.replace(/\D/g, "");

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
