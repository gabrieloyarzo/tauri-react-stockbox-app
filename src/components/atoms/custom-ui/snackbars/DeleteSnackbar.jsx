import React, { forwardRef } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert elevation={6} ref={ref} {...props} />;
});

const defineText = ({ currentTable, id, error, severity }) => {
  switch (currentTable) {
    case "products":
      if (severity === "error") {
        return `Error al eliminar producto: ${error.message}`;
      } else {
        return `Producto con ID: ${id} eliminado exitosamente`;
      }
    case "orders":
      if (severity === "error") {
        return `Error al eliminar pedido: ${error.message}`;
      } else {
        return `Pedido con ID: ${id} eliminado exitosamente`;
      }
    case "sales":
      if (severity === "error") {
        return `Error al eliminar venta: ${error.message}`;
      } else {
        return `Venta con ID: ${id} eliminada exitosamente`;
      }
    case "refunds":
      if (severity === "error") {
        return `Error al eliminar devolución: ${error.message}`;
      } else {
        return `Devolución con ID: ${id} eliminada exitosamente`;
      }

    default:
      return "El tipo de tabla o acción no coincide con ninguno especificado.";
  }
};

const DeleteSnackbar = ({
  currentTable,
  id,
  error,
  open,
  closeSnack,
  severity,
}) => {
  const text = defineText({ currentTable, id, error, severity });

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={closeSnack}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <SnackbarAlert onClose={closeSnack} severity={severity}>
        {text}
      </SnackbarAlert>
    </Snackbar>
  );
};

export default DeleteSnackbar;
