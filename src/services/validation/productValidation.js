export function validateProduct(formData) {
  const newErrors = {};

  if (formData.idp.trim() === "") {
    newErrors.idp = "ID del producto es requerido";
  }

  if (formData.nombre.trim() === "") {
    newErrors.nombre = "Nombre es requerido";
  }

  if (formData.cat.trim() === "") {
    newErrors.cat = "Categoría es requerida";
  }

  if (typeof formData.cit === "string") {
    if (formData.cit.trim() === "") {
      newErrors.cit = "Cantidad es requerida";
    } else {
      if (
        !Number.isInteger(parseFloat(formData.cit.trim())) ||
        !Number.isInteger(Number(formData.cit.trim())) ||
        Number(formData.cit < 0)
      ) {
        newErrors.cit = "Cantidad debe ser un número entero positivo";
      }
    }
  }

  if (typeof formData.mCit === "string") {
    if (formData.mCit.trim() === "") {
      newErrors.mCit = "Cantidad mínima es requerida";
    } else {
      if (
        !Number.isInteger(parseFloat(formData.mCit.trim())) ||
        Number(formData.mCit < 0) ||
        !Number.isInteger(Number(formData.mCit.trim()))
      ) {
        newErrors.mCit = "Cantidad mínima debe ser un número entero positivo";
      }
    }
  }

  if (typeof formData.precio === "string") {
    if (formData.precio.trim() === "") {
      newErrors.precio = "Precio de venta es requerido";
    } else {
      if (
        !Number.isInteger(parseFloat(formData.precio.trim())) ||
        Number(formData.precio < 0) ||
        !Number.isInteger(Number(formData.precio.trim()))
      ) {
        newErrors.precio = "Precio de venta debe ser un número entero positivo";
      }
    }
  }

  return newErrors;
}
