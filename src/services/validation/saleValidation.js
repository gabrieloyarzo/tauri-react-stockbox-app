export function validateSale(formData) {
  const newErrors = {};

  if (formData.cod.trim() === "") {
    newErrors.cod = "Código es requerido";
  }

  if (formData.rutc.trim() === "") {
    newErrors.rutc = "RUT del cliente es requerido";
  }

  if (formData.fecha.trim() === "") {
    newErrors.fecha = "Fecha es requerida";
  }
  else if (formData.fecha.length !== 10) {
    newErrors.fecha = "Fecha debe ser válida";
  }

  return newErrors;
}

export function validateSaleItems(saleItems) {
  const newErrors = [];

  saleItems.forEach((item, index) => {
    const itemErrors = {};

    if (item.cod.trim() === "" || item.cod === null || item.cod === undefined) {
      itemErrors.cod = "Código del producto es requerido";
    }

    if (typeof item.cit === "string") {
      if (item.cit.trim() === "") {
        itemErrors.cit = "Cantidad es requerida";
      } else {
        if (
          !Number.isInteger(parseFloat(item.cit.trim())) ||
          !Number.isInteger(Number(item.cit.trim())) ||
          Number(item.cit < 1)
        ) {
          itemErrors.cit = "Cantidad debe ser un número entero positivo";
        }
      }
    } else {
      if (item.cit < 1 || typeof item.cit === "float") {
        itemErrors.cit = "Cantidad debe ser un número entero positivo";
      }
    }

    if (typeof item.precio === "string") {
      if (item.precio.trim() === "") {
        itemErrors.precio = "Precio es requerido";
      } else {
        if (
          !Number.isInteger(parseFloat(item.precio.trim())) ||
          !Number.isInteger(Number(item.precio.trim())) ||
          Number(item.precio < 1)
        ) {
          itemErrors.precio = "Precio debe ser un número entero positivo";
        }
      }
    } else {
      if (item.precio < 1 || typeof item.precio === "float") {
        itemErrors.precio = "Precio debe ser un número entero positivo";
      }
    }

    if (Object.keys(itemErrors).length > 0) {
      newErrors[index] = itemErrors;
    }
  });

  return newErrors;
}
