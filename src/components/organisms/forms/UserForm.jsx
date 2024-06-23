import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import UserApi from "../../../services/api/user.service";
import { Button, TextField, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import { validateUser } from "../../../services/validation/userValidation";
import { isEmptyObject } from "../../../functions/helpers";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "2vh",
  width: "75%",
}));

const UserForm = ({
  mode,
  initialData,
  closeForm,
  filterProps,
  fetchData,
  setDiscardDialogProps,
  setModifyDialogProps,
  setSnackProps,
}) => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    rutu: initialData?.rutu || "",
    email: initialData?.email || "",
    pwd: initialData?.pwd || "",
    nombre: initialData?.nombre || "",
    apellido: initialData?.apellido || "",
    rol: initialData?.rol || "",
  });

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackProps((prevProps) => ({
      ...prevProps,
      open: false,
    }));
  };

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

    const newErrors = validateUser(formData);

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
        title: "Modificar usuario",
        text: `¿Está seguro que desea modificar el usuario con RUT: ${initialData.rutu}?`,
        closeDialog: () =>
          setModifyDialogProps((prevProps) => ({
            ...prevProps,
            open: false,
          })),
      });
    } else {
      try {
        setLoading(true);

        const response = await UserApi.createUser(formData);
        await fetchData(filterProps);

        setSnackProps({
          open: true,
          closeSnack: handleCloseSnack,
          message: response.message,
          severity: "success",
        });

        setLoading(false);

        closeForm();
      } catch (error) {
        setSnackProps({
          open: true,
          closeSnack: handleCloseSnack,
          message: error.response.data.message,
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

      const response = await UserApi.updateUser(initialData.rutu, formData);
      await fetchData(filterProps);

      setSnackProps({
        open: true,
        closeSnack: handleCloseSnack,
        message: response.message,
        severity: "success",
      });

      closeForm();
    } catch (error) {
      setSnackProps({
        open: true,
        closeSnack: handleCloseSnack,
        message: error.response.data.message,
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
            {mode === "modify" ? "Modificar usuario" : "Registrar usuario"}
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
              label="RUT del usuario"
              name="rutu"
              value={formData.rutu}
              onChange={handleChange}
              error={!!errors.rutu}
              helperText={errors.rutu}
              inputProps={{
                maxLength: 20,
              }}
            />
            <StyledTextField
              label="Correo"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              inputProps={{
                maxLength: 20,
              }}
            />
            <StyledTextField
              label="Contraseña"
              name="pwd"
              type="password"
              value={formData.pwd}
              onChange={handleChange}
              error={!!errors.pwd}
              helperText={errors.pwd}
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
              label="Apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              error={!!errors.apellido}
              helperText={errors.apellido}
              inputProps={{
                maxLength: 20,
              }}
            />
            <StyledTextField
              label="Rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              error={!!errors.rol}
              helperText={errors.rol}
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

export default UserForm;
