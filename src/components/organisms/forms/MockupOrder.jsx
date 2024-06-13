import React, { useState } from "react";
import { Button, TextField, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { sendNotification } from "@tauri-apps/api/notification";

const StyledTextField = styled(TextField)({
  marginBottom: "2vh",
  width: "75%",
  "& .MuiInputBase-input": {
    fontSize: "16px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#9bc661",
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: "#9bc661",
  },
});

const Mockup_OrderForm = ({ closeForm, fetchData }) => {
  const [formData, setFormData] = useState({
    rut_empresa: "",
    id_producto: "",
    cantidad: "",
    precio: "",
  });

  const [orderItems, setOrderItems] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addItem = () => {
    const newErrors = {};

    if (formData.id_producto.trim() === "") {
      newErrors.id_producto = "ID del producto es requerido";
    }

    if (formData.cantidad.trim() === "" || isNaN(parseInt(formData.cantidad)) || parseInt(formData.cantidad) <= 0) {
      newErrors.cantidad = "Cantidad debe ser un número entero válido";
    }

    if (formData.precio.trim() === "" || isNaN(parseFloat(formData.precio)) || parseFloat(formData.precio) <= 0) {
      newErrors.precio = "Precio debe ser un número válido";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setOrderItems([...orderItems, { ...formData }]);
    setFormData({ ...formData, id_producto: "", cantidad: "", precio: "" });
    setErrors({});
  };

  const removeItem = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    if (formData.rut_empresa.trim() === "") {
      newErrors.rut_empresa = "RUT de la empresa es requerido";
    }

    if (orderItems.length === 0) {
      sendNotification("Debe agregar al menos un producto al pedido");
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await fetchData();
      sendNotification(`Pedido registrado correctamente`);
      closeForm();
    } catch (error) {
      sendNotification(`Error al registrar pedido: ${error.message}`);
    }
  };

  const total = orderItems.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80vw",
        maxWidth: "600px",
        maxHeight: "90vh",
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
          width: "100%",
          p: 1,
          mb: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "#ffffff", fontWeight: "bold" }}
        >
          REGISTRO DE PEDIDO
        </Typography>
      </Box>

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start", // Alineación a la izquierda
            p: 2,
          }}
        >
          <StyledTextField
            label="Rut de Empresa"
            name="rut_empresa"
            value={formData.rut_empresa}
            onChange={handleChange}
            error={!!errors.rut_empresa}
            helperText={errors.rut_empresa}
            style={{ width: "50%" }} // Ancho del campo Rut de Empresa
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start", // Alineación a la izquierda
              gap: 2,
              width: "100%",
              marginBottom: "2vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              <StyledTextField
                label="ID del producto"
                name="id_producto"
                value={formData.id_producto}
                onChange={handleChange}
                error={!!errors.id_producto}
                helperText={errors.id_producto}
                style={{ width: "30%" }}
              />
              <StyledTextField
                label="Cantidad"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                error={!!errors.cantidad}
                helperText={errors.cantidad}
                style={{ width: "30%" }}
              />
              <StyledTextField
                label="Precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                error={!!errors.precio}
                helperText={errors.precio}
                style={{ width: "30%" }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={addItem}
              sx={{
                backgroundColor: "#266763",
                color: "#ffffff",
                fontSize: "0.8rem",
                "&:hover": {
                  backgroundColor: "#c3fa7b",
                  color: "#7e7e7e",
                },
                alignSelf: "flex-start", // Alineación del botón a la izquierda
              }}
            >
              Añadir
            </Button>
          </Box>

          <Box sx={{ width: "100%", mb: 2 }}>
            {orderItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography>{item.id_producto}</Typography>
                <Typography>{item.cantidad}</Typography>
                <Typography>{`$${item.precio}`}</Typography>
                <Typography>{`$${item.cantidad * item.precio}`}</Typography>
                <IconButton onClick={() => removeItem(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>

          <Typography
            variant="h6"
            sx={{
              mb: 2,
              textAlign: "center", // Centrar el total
              width: "100%",
            }}
          >
            {`Total: $${total}`}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              justifyContent: "center", // Centrar los botones
              width: "100%",
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
              onClick={closeForm}
            >
              Cerrar
            </Button>
            <Button
              variant="contained"
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
              Guardar
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Mockup_OrderForm;

