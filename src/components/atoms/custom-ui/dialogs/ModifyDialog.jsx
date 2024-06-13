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

const ModifyDialog = ({
  open,
  closeDialog,
  confirmAction,
  loading,
  title,
  text,
}) => {
  const theme = useTheme();

  return (
    <Dialog open={open ?? false} onClose={closeDialog} maxWidth="sm">
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
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              bgcolor: theme.palette.action.hover,
              color: theme.palette.secondary.contrastText,
            },
          }}
          autoFocus
        >
          <span>Modificar</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ModifyDialog;
