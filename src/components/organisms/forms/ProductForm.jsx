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
import { sendNotification } from "@tauri-apps/api/notification";
import { validateProduct } from "../../../services/validation/productValidation";
import ModifyDialog from "../../atoms/custom-ui/dialogs/ModifyDialog";
import DiscardDialog from "../../atoms/custom-ui/dialogs/DiscardDialog";
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

const ProductForm = ({
  currentTable,
  mode,
  initialData,
  closeForm,
  fetchData,
  categories,
}) => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [openModifyDialog, setOpenModifyDialog] = useState(false);
  const [openDiscardDialog, setOpenDiscardDialog] = useState(false);

  const idToModify = initialData?.idp ?? false;

  const [formData, setFormData] = useState({
    idp: initialData?.idp || "",
    nombre: initialData?.nombre || "",
    cat: initialData?.cat || "",
    cit: initialData?.cit || "",
    mCit: initialData?.mCit || "",
    precio: initialData?.precio || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "cat") {
      console.log("Categoría: ", e.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (JSON.stringify(formData) === JSON.stringify(initialData)) {
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
      setOpenModifyDialog(true);
    } else {
      try {
        setLoading(true);

        await ProductApi.createProduct(formData);
        await fetchData();

        console.log("Data enviada:", formData);

        sendNotification(`Creado producto con ID: ${formData.idp}`);

        setLoading(false);

        closeForm();
      } catch (error) {
        // alert(`Error al crear producto: ${error}`);
        sendNotification(`Se produjo un error: ${error.message}`);

        setLoading(false);
      }
    }
  };

  const confirmModify = async (id) => {
    try {
      setLoading(true);

      await ProductApi.updateProduct(id, formData);
      await fetchData();

      sendNotification(`Modificado producto con ID: ${id}`);

      setLoading(false);

      closeForm();
    } catch (error) {
      setLoading(false);
      // alert(`Error al modificar producto: ${error}`);
      sendNotification(
        `Hubo un error, asegúrate de no ingresar caracteres especiales y no repetir ID`
      );
    }
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
          left: "60%",
          transform: "translate(-50%, -50%)",
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
              label="ID del producto"
              name="idp"
              value={formData.idp}
              onChange={handleChange}
              error={!!errors.idp}
              helperText={errors.idp}
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
                    : () => setOpenDiscardDialog(true)
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
      <ModifyDialog
        currentTable={currentTable}
        loading={loading}
        open={openModifyDialog}
        closeDialog={() => setOpenModifyDialog(false)}
        id={idToModify}
        confirmAction={() => confirmModify(idToModify)}
      />
      <DiscardDialog
        open={openDiscardDialog}
        closeDialog={() => setOpenDiscardDialog(false)}
        confirmAction={closeForm}
      />
    </>
  );
};

export default ProductForm;
