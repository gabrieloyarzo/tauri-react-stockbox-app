import React, { useState } from "react";
import { useVariables } from "../../../context/VariablesContext";
import { useTheme } from "@mui/material/styles";
import { useDialog } from "../../../context/DialogContext";
import { useSnackbar } from "../../../context/SnackbarContext";
import { styled } from "@mui/material/styles";
import { Button, TextField, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { validateProvider } from "../../../services/validation/providerValidation";
import { isEmptyObject } from "../../../functions/helpers";
import { formatRut } from "../../../functions/format";
import ProviderApi from "../../../services/api/provider.service";
import LoadingButton from "@mui/lab/LoadingButton";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "2vh",
  width: "75%",
}));

const ProviderForm = ({
  mode,
  initialData,
  closeForm,
  fetchData,
  filterProps,
}) => {
  const theme = useTheme();
  const { setProviders } = useVariables();
  const { showDialog } = useDialog();
  const { showSnackbar } = useSnackbar();

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
    if (e.target.name === "rutp") {
      setFormData({
        ...formData,
        [e.target.name]: formatRut(e.target.value),
      });
      return;
    }

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
      showDialog(
        "Modificar proveedor",
        `¿Está seguro que desea modificar el proveedor con RUT: ${initialData.rutp}?`,
        "Modificar",
        () => confirmModify()
      );
    } else {
      setLoading(true);
      try {
        const response = await ProviderApi.createProvider(formData);
        setProviders((prevProps) => [
          ...prevProps,
          { rutp: formData.rutp, nombre: formData.nombre },
        ]);
        await fetchData(filterProps);
        showSnackbar(response.message, "success");
        closeForm();
      } catch (error) {
        showSnackbar(error.response.data.message, "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    mode === "modify" || isEmptyObject(formData)
      ? closeForm()
      : showDialog(
          "Descartar registro",
          "¿Está seguro que desea descartar el registro?",
          "Descartar",
          () => closeForm()
        );
  };

  const confirmModify = async () => {
    try {
      const response = await ProviderApi.updateProvider(
        initialData.rutp,
        formData
      );
      await fetchData(filterProps);
      showSnackbar(response.message, "success");
      closeForm();
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    }
  };

  return (
    <>
      <Box
        sx={{
          zIndex: 1,
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
            {mode === "modify" ? (
              <StyledTextField
                label="RUT del proveedor"
                name="rutp"
                value={formData.rutp}
                disabled
              />
            ) : (
              <StyledTextField
                label="RUT del proveedor"
                name="rutp"
                value={formData.rutp}
                onChange={handleChange}
                error={!!errors.rutp}
                helperText={errors.rutp}
                inputProps={{
                  maxLength: 12,
                }}
              />
            )}
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
              inputProps={{ maxLength: 100 }}
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
                onClick={handleClose}
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
