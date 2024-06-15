import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const texts = ({ currentTable, id }) => {
  switch (currentTable) {
    case "products":
      return {
        title: "Eliminar producto",
        text: `¿Está seguro que desea eliminar el producto con ID: ${id}?`,
      };
    case "purchases":
      return {
        title: "Eliminar compra",
        text: `¿Está seguro que desea eliminar la compra con ID: ${id}?`,
      };
    case "sales":
      return {
        title: "Eliminar venta",
        text: `¿Está seguro que desea eliminar la venta con ID: ${id}?`,
      };
    case "providers":
      return {
        title: "Eliminar proveedor",
        text: `¿Está seguro que desea eliminar el proveedor con RUT: ${id}?`,
      };
    case "users":
      return {
        title: "Eliminar usuario",
        text: `¿Está seguro que desea eliminar el usuario con RUT: ${id}?`,
      };
    case "refunds":
      return {
        title: "Eliminar devolución",
        text: `¿Está seguro que desea eliminar la devolución con ID: ${id}?`,
      };
    default:
      return {
        title: "Acción no reconocida",
        text: "El tipo de tabla o acción no coincide con ninguno especificado.",
      };
  }
};

const DeleteDialog = ({
  currentTable,
  open,
  closeDialog,
  id,
  confirmAction,
  loading,
}) => {
  const theme = useTheme();

  const { title, text } = texts({ currentTable, id });

  return (
    <Dialog
      open={open ?? false}
      onClose={closeDialog ?? false}
      maxWidth="sm"
      PaperProps={{
        sx: {
          transform: "translate(35%, -10%)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "5px",
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <DialogContentText
          padding={1}
          sx={{ color: theme.palette.common.black }}
        >
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={closeDialog}
          variant="contained"
          size="small"
          sx={{
            bgcolor: theme.palette.grey[400],
            color: theme.palette.common.black,
            "&:hover": {
              bgcolor: theme.palette.grey[500],
              color: theme.palette.common.black,
            },
          }}
        >
          Cancelar
        </Button>
        <LoadingButton
          onClick={confirmAction}
          variant="contained"
          size="small"
          loading={loading}
          sx={{
            bgcolor: theme.palette.error.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              bgcolor: theme.palette.error.dark,
              color: theme.palette.primary.contrastText,
            },
          }}
          autoFocus
        >
          <span>Eliminar</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
