import React, { useState } from "react";
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

const CustomDialog = ({
  open,
  closeDialog,
  action,
  confirmAction,
  title,
  text,
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const handleConfirmAction = async () => {
    setLoading(true);
    await confirmAction();
    setLoading(false);
    closeDialog();
  };

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      PaperProps={{
        sx: {
          transform: "translateX(27.5%)",
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
          fontSize: theme.typography.subtitle1.fontSize,
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
          onClick={() => {
            setLoading(false);
            closeDialog();
          }}
          variant="contained"
          size="small"
          sx={{
            fontSize: theme.typography.body2.fontSize,
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
          onClick={handleConfirmAction}
          variant="contained"
          size="small"
          loading={loading}
          sx={{
            fontSize: theme.typography.body2.fontSize,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              bgcolor: theme.palette.action.hover,
              color: theme.palette.secondary.contrastText,
            },
          }}
          autoFocus
        >
          <span>{action}</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
