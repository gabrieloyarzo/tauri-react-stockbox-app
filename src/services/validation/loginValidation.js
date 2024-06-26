export function validateLogin(credentials) {
  const newErrors = {};

  if (
    credentials.rutu.trim() === "" ||
    credentials.rutu === undefined ||
    credentials.rutu === null
  ) {
    newErrors.rutu = "RUT es requerido";
  }

  if (
    credentials.pwd.trim() === "" ||
    credentials.pwd === undefined ||
    credentials.pwd === null
  ) {
    newErrors.pwd = "Contraseña es requerida";
  }

  return newErrors;
}
