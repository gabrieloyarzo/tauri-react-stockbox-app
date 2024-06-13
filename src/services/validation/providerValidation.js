export function validateProvider(formData) {
  const newErrors = {};

  if (formData.rutp.trim() === "") {
    newErrors.rutp = "RUT del proveedor es requerido";
  }

  if (formData.nombre.trim() === "") {
    newErrors.nombre = "Nombre es requerido";
  }

  if (formData.lugar.trim() === "") {
    newErrors.lugar = "Dirección es requerida";
  }

  if (typeof formData.numero === "string") {
    if (formData.numero.trim() === "") {
      newErrors.numero = "Teléfono es requerido";
    } else {
      if (
        !Number.isInteger(parseFloat(formData.numero.trim())) ||
        Number(formData.numero < 0) ||
        !Number.isInteger(Number(formData.numero.trim()))
      ) {
        newErrors.numero = "Teléfono debe ser un número entero positivo";
      }
    }
  }

  if (formData.tipo.trim() === "") {
    newErrors.tipo = "Tipo es requerido";
  }



  return newErrors;
}
