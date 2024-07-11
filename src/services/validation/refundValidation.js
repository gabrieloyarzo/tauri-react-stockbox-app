export function validateRefund(formData) {
  const newErrors = {};

  if (formData.codr.trim() === "") {
    newErrors.codr = "Código de devolución es requerido";
  }

  if (formData.desc.trim() === "") {
    newErrors.desc = "Descripción es requerida";
  }

  if (formData.nota.trim() === "") {
    newErrors.nota = "Nota de crédito es requerida";
  }

  if (formData.fecha.trim() === "") {
    newErrors.fecha = "Fecha es requerida";
  } else if (formData.fecha.length !== 10) {
    newErrors.fecha = "Fecha debe ser válida";
  }

  return newErrors;
}

export function validateRefundItems(refundItems) {
  const newErrors = [];

  refundItems.forEach((item, index) => {
    const itemErrors = {};

    if (typeof item.citr === "string") {
      if (item.citr.trim() !== "") {
        if (
          !Number.isInteger(parseFloat(item.citr.trim())) ||
          !Number.isInteger(Number(item.citr.trim())) ||
          Number(item.citr < 1)
        ) {
          itemErrors.citr =
            "Cantidad de devolución debe ser un número entero positivo";
        }
      }
    } else {
      if (item.citr !== 0) {
        if (item.citr < 1 || typeof item.citr === "float") {
          itemErrors.citr =
            "Cantidad de devolución debe ser un número entero positivo";
        }
      }
    }

    if (Object.keys(itemErrors).length > 0) {
      newErrors[index] = itemErrors;
    }
  });

  return newErrors;
}
