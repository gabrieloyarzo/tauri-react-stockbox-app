import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import ProviderApi from "../../../services/api/provider.service";
import { Button, TextField, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import { validateProvider } from "../../../services/validation/providerValidation";
import { isEmptyObject } from "../../../functions/isEmptyObject";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "2vh",
  width: "75%",
  "& .MuiInputBase-input": {
    fontSize: "16px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: theme.palette.primary.main,
  },
}));

const ProviderForm = ({
  mode,
  initialData,
  closeForm,
  fetchData,
  setDiscardDialogProps,
  setModifyDialogProps,
  setSnackProps,
}) => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    rutp: initialData?.rutp || "",
    nombre: initialData?.nombre || "",
    lugar: initialData?.lugar || "",
    numero: initialData?.numero || "",
    tipo: initialData?.tipo || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (JSON.stringify(formData) === JSON.stringify(initialData)) {
      return;
    }

    const newErrors = validateProvider(formData);

    // Verificar si hay errores
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    Object.keys(formData).forEach((key) => {
      formData[key] = formData[key].trim();
    });

    if (mode === "modify") {
      setModifyDialogProps({
        open: true,
        confirmAction: () => confirmModify(),
        title: "Modificar proveedor",
        text: `¿Está seguro que desea modificar el proveedor con RUT: ${initialData.rutp}?`,
        closeDialog: () =>
          setModifyDialogProps((prevProps) => ({
            ...prevProps,
            open: false,
          })),
      });
    } else {
      try {
        setLoading(true);

        await ProviderApi.createProvider(formData);
        await fetchData();

        setSnackProps({
          open: true,
          closeSnack: (event, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setSnackProps((prevProps) => ({
              ...prevProps,
              open: false,
            }));
          },
          text: `Proveedor con RUT: ${formData.rutp} creado exitosamente`,
          severity: "success",
        });

        setLoading(false);

        closeForm();
      } catch (error) {
        setSnackProps({
          open: true,
          closeSnack: (event, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setSnackProps((prevProps) => ({
              ...prevProps,
              open: false,
            }));
          },
          text: `Error al crear proveedor: ${error.response.data.message}`,
          severity: "error",
        });

        setLoading(false);
      }
    }
  };

  const confirmModify = async () => {
    try {
      setModifyDialogProps((prevProps) => ({
        ...prevProps,
        loading: true,
      }));

      await ProviderApi.updateProvider(initialData.rutp, formData);
      await fetchData();

      setSnackProps({
        open: true,
        closeSnack: (event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setSnackProps((prevProps) => ({
            ...prevProps,
            open: false,
          }));
        },
        text: `Proveedor con RUT: ${formData.rutp} modificado exitosamente`,
        severity: "success",
      });

      closeForm();
    } catch (error) {
      setSnackProps({
        open: true,
        closeSnack: (event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setSnackProps((prevProps) => ({
            ...prevProps,
            open: false,
          }));
        },
        text: `Error al modificar proveedor: ${error.response.data.message}`,
        severity: "error",
      });
    }

    setModifyDialogProps((prevProps) => ({
      ...prevProps,
      open: false,
      loading: false,
    }));
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: "80vw",
          maxWidth: "600px",
          maxHeight: "90vh",
          top: "50%",
          left: "50%",
          transform: "translate(-25%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          bgcolor: "#ffffff",
          border: "1.5px solid #266763",
          borderRadius: "15px",
          p: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: "#266763",
            borderRadius: "10px",
            width: "100vw",
            position: "fixed",
            top: 0,
            p: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#ffffff", textAlign: "center", fontWeight: "bold" }}
          >
            {mode === "modify" ? "Modificar proveedor" : "Registrar proveedor"}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              marginTop: 4,
              minWidth: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 5,
            }}
          >
            <StyledTextField
              label="RUT del proveedor"
              name="rutp"
              value={formData.rutp}
              onChange={handleChange}
              error={!!errors.rutp}
              helperText={errors.rutp}
              inputProps={{
                maxLength: 20,
              }}
            />
            <StyledTextField
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              error={!!errors.nombre}
              helperText={errors.nombre}
              inputProps={{
                maxLength: 20,
              }}
            />
            <StyledTextField
              label="Dirección"
              name="lugar"
              value={formData.lugar}
              onChange={handleChange}
              error={!!errors.lugar}
              helperText={errors.lugar}
              inputProps={{
                maxLength: 20,
              }}
            />
            <StyledTextField
              label="Teléfono"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              error={!!errors.numero}
              helperText={errors.numero}
              inputProps={{
                maxLength: 20,
              }}
            />
            <StyledTextField
              label="Tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              error={!!errors.tipo}
              helperText={errors.tipo}
              inputProps={{
                maxLength: 20,
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                p: 2,
                gap: 2,
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                endIcon={<CloseIcon />}
                sx={{
                  backgroundColor: "#266763",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                  width: "150px",
                  "&:hover": {
                    backgroundColor: "#c3fa7b",
                    color: "#7e7e7e",
                  },
                }}
                onClick={
                  mode === "modify" || isEmptyObject(formData)
                    ? closeForm
                    : () =>
                        setDiscardDialogProps({
                          open: true,
                          confirmAction: () => {
                            closeForm();
                            setDiscardDialogProps((prevProps) => ({
                              ...prevProps,
                              open: false,
                            }));
                          },
                          closeDialog: () =>
                            setDiscardDialogProps((prevProps) => ({
                              ...prevProps,
                              open: false,
                            })),
                        })
                }
              >
                Cerrar
              </Button>
              <LoadingButton
                variant="contained"
                loading={loading}
                loadingPosition="end"
                endIcon={<SaveIcon />}
                sx={{
                  backgroundColor: "#266763",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                  width: "150px",
                  "&:hover": {
                    backgroundColor: "#c3fa7b",
                    color: "#7e7e7e",
                  },
                }}
                type="submit"
              >
                {mode === "modify" ? "Modificar" : "Guardar"}
              </LoadingButton>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default ProviderForm;
