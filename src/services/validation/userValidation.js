import { validateEmail } from "../../functions/validateEmail";

export function validateUser(formData) {
  const newErrors = {};

  if (formData.rutu.trim() === "") {
    newErrors.rutu = "RUT del usuario es requerido";
  }

  if (formData.email.trim() === "") {
    newErrors.email = "Correo es requerido";
  }
  if (!validateEmail(formData.email)) {
    newErrors.email = "Formato de correo no válido";
  }

  if (formData.pwd.trim() === "") {
    newErrors.pwd = "Contraseña es requerida";
  }

  if (formData.nombre.trim() === "") {
    newErrors.nombre = "Nombre es requerido";
  }

  if (formData.apellido.trim() === "") {
    newErrors.apellido = "Apellido es requerido";
  }

  if (formData.rol.trim() === "") {
    newErrors.rol = "Rol es requerido";
  }

  return newErrors;
}
