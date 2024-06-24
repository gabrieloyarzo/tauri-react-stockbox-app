import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import ProductApi from "../../../services/api/product.service";
import {
  Button,
  TextField,
  Box,
  Typography,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import { validateProduct } from "../../../services/validation/productValidation";
import { isEmptyObject } from "../../../functions/helpers";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "2vh",
  width: "75%",
}));

const ProductForm = ({
  mode,
  initialData,
  closeForm,
  fetchData,
  categories,
  codes,
  filterProps,
  setDiscardDialogProps,
  setModifyDialogProps,
  setSnackProps,
}) => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    cod: initialData?.cod || "",
    nombre: initialData?.nombre || "",
    cat: initialData?.cat || "",
    cit: initialData?.cit || "",
    mCit: initialData?.mCit || "",
    precio: initialData?.precio || "",
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

  const handleValidateCode = (e) => {
    const { value } = e.target;

    if (codes.includes(value) && value !== initialData?.cod) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cod: "El código ya existe",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, cod: false }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      JSON.stringify({ idp: initialData?.idp, ...formData }) ===
      JSON.stringify(initialData)
    ) {
      return;
    }

    const newErrors = validateProduct(formData);

    // Verificar si hay errores
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    Object.keys(formData).forEach((key) => {
      key === "cit" || key === "mCit" || key === "precio"
        ? (formData[key] = parseInt(formData[key]))
        : (formData[key] = formData[key].trim());
    });

    if (mode === "modify") {
      setModifyDialogProps({
        open: true,
        confirmAction: () => confirmModify(),
        title: "Modificar producto",
        text: `¿Está seguro que desea modificar el producto con código: ${initialData.cod}?`,
        closeDialog: () =>
          setModifyDialogProps((prevProps) => ({
            ...prevProps,
            open: false,
          })),
      });
    } else {
      setLoading(true);
      try {
        const response = await ProductApi.createProduct(formData);
        await fetchData(filterProps);

        setSnackProps({
          open: true,
          closeSnack: handleCloseSnack,
          message: response.message,
          severity: "success",
        });

        closeForm();
      } catch (error) {
        console.log(error);
        setSnackProps({
          open: true,
          closeSnack: handleCloseSnack,
          message: error.response.data.message,
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const confirmModify = async () => {
    setModifyDialogProps((prevProps) => ({
      ...prevProps,
      loading: true,
    }));
    try {
      const response = await ProductApi.updateProduct(
        initialData.idp,
        formData
      );
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
    } finally {
      setModifyDialogProps((prevProps) => ({
        ...prevProps,
        open: false,
        loading: false,
      }));
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
            {mode === "modify" ? "Modificar producto" : "Registrar producto"}
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
              label="Código"
              name="cod"
              value={formData.cod}
              onChange={(e) => {
                handleChange(e);
                handleValidateCode(e);
              }}
              error={!!errors.cod}
              helperText={errors.cod}
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
            <Autocomplete
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& .MuiSvgIcon-root": {
                  color: theme.palette.secondary.contrastText,
                },
              }}
              options={categories}
              value={formData.cat}
              freeSolo
              onChange={(event, newValue) => {
                handleChange({
                  target: { name: "cat", value: newValue },
                });
              }}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  label="Categoría"
                  name="cat"
                  value={formData.cat}
                  onChange={handleChange}
                  error={!!errors.cat}
                  helperText={errors.cat}
                  inputProps={{
                    ...params.inputProps,
                    maxLength: 20,
                  }}
                />
              )}
            />

            <StyledTextField
              label="Cantidad"
              name="cit"
              value={formData.cit}
              onChange={handleChange}
              error={!!errors.cit}
              helperText={errors.cit}
              inputProps={{
                maxLength: 20,
              }}
            />
            <StyledTextField
              label="Cantidad mínima"
              name="mCit"
              value={formData.mCit}
              onChange={handleChange}
              error={!!errors.mCit}
              helperText={errors.mCit}
              inputProps={{
                maxLength: 20,
              }}
            />
            <StyledTextField
              label="Precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              error={!!errors.precio}
              helperText={errors.precio}
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

export default ProductForm;
