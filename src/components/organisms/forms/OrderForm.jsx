import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Stack,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "2vh",
  width: "100%",
  "& .MuiInputBase-input": {
    fontSize: "16px",
    height: "15px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: theme.palette.primary.main,
  },
  "& .MuiInputLabel-root": {
    fontSize: "16px",
  },
}));

const OrderTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    fontSize: "14px",
    height: "4px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: theme.palette.primary.main,
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
}));

const OrderForm = ({ mode, fetchData, closeForm, initialData, products }) => {
  const theme = useTheme();

  const initialRow = {
    id_pedido: "",
    id_producto: "",
    cantidad: "",
    precio_unidad: "",
    precio_total: "0",
  };

  const [formData, setFormData] = useState(
    initialData
      ? {
          ...initialData,
          fecha: new Date().toISOString(),
          detalle_pedido: initialData.detalle_pedido.length
            ? initialData.detalle_pedido
            : [initialRow],
        }
      : {
          id_pedido: "",
          rut_proveedor: "",
          rut_usuario: "123456789",
          fecha: new Date().toISOString(),
          compra_total: "",
          detalle_pedido: [initialRow],
        }
  );

  const [orderItems, setOrderItems] = useState(formData.detalle_pedido);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeItem = (index, e) => {
    const { name, value } = e.target;

    setOrderItems(
      orderItems.map((row, i) =>
        i === index
          ? {
              ...row,
              [name]: value,
              precio_total:
                name === "cantidad" || name === "precio_unidad"
                  ? name === "cantidad"
                    ? !isNaN(value) && value.trim() !== ""
                      ? parseInt(value) * row.precio_unidad
                      : 0
                    : name === "precio_unidad"
                    ? !isNaN(value) && value.trim() !== ""
                      ? parseInt(value) * row.cantidad
                      : 0
                    : 0
                  : row.precio_total,
            }
          : row
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setOrderItems(
      orderItems.map((row) => ({
        ...row,
        id_pedido: formData.id_pedido,
      }))
    );

    setFormData({
      ...formData,
      detalle_pedido: orderItems,
    });

    console.log("Form Data:", formData);
  };

  const addOrderItem = () => {
    setOrderItems([...orderItems, { ...initialRow }]);
  };

  const removeOrderItem = (index) => {
    if (orderItems.length > 1) {
      const newItems = [...orderItems];
      newItems.splice(index, 1);
      setOrderItems(newItems);
    }
  };

  const total = orderItems.reduce(
    (acc, item) => acc + item.cantidad * item.precio_unidad,
    0
  );

  return (
    <Box
      sx={{
        position: "absolute",
        width: "50vw",
        minWidth: "440px",
        maxHeight: "90vh",
        top: "50%",
        left: "50%",
        display: "flex",
        transform: "translate(-27.5%, -50%)",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        bgcolor: "#ffffff",
        border: "1.5px solid #266763",
        borderRadius: "15px",
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          width: "100%",
          p: 1,
          mb: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "#ffffff", fontWeight: "bold" }}>
          {mode === "modify" ? "Modificar pedido" : "Registrar pedido"}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack alignItems="center" width="30%" p={1}>
            <StyledTextField
              label="ID del pedido"
              name="id_pedido"
              value={formData.id_pedido}
              onChange={handleChange}
            />
            <StyledTextField
              label="RUT de empresa"
              name="rut_empresa"
              value={formData.rut_proveedor}
              onChange={handleChange}
            />
          </Stack>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: theme.palette.background.paper,
              width: "100%",
              padding: "10px 0 10px 0",
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              marginBottom: "15px",
            }}
          >
            <Box sx={{ display: "flex", width: "90%" }}>
              <StyledStack>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ textAlign: "center", flex: 1 }}
                >
                  ID del producto
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ textAlign: "center", flex: 1 }}
                >
                  Cantidad
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ textAlign: "center", flex: 1 }}
                >
                  Precio c/u
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ textAlign: "right", flex: 1 }}
                >
                  Total
                </Typography>
                <Box sx={{ flex: 0.3 }}></Box>
              </StyledStack>
            </Box>
          </Box>

          <Box
            sx={{
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              width: "90%",
              minHeight: "220px",
              maxHeight: "220px",
            }}
          >
            {orderItems.map((row, index) => (
              <StyledStack paddingBottom=".5%">
                <Autocomplete
                  sx={{
                    display: "flex",
                    flex: 1,
                    "& .MuiSvgIcon-root": {
                      color: theme.palette.secondary.contrastText,
                    },
                  }}
                  options={products}
                  name="id_producto"
                  value={
                    products.find(
                      (product) => product.idp === row.id_producto
                    ) || null
                  }
                  getOptionLabel={(option) => option.idp}
                  noOptionsText="Sin opciones"
                  onChange={(event, newValue) =>
                    handleChangeItem(index, {
                      target: {
                        name: "id_producto",
                        value: newValue ? newValue.idp : "",
                      },
                    })
                  }
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <div>
                        <Typography fontSize="14px">{option.idp}</Typography>
                        <Typography fontSize="12px" color="textSecondary">
                          {option.nombre}
                        </Typography>
                      </div>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <OrderTextField
                      {...params}
                      error={!!errors.id_producto}
                      helperText={errors.id_producto}
                      InputProps={{
                        ...params.InputProps,
                        sx: { width: "100%" },
                      }}
                    />
                  )}
                />

                <OrderTextField
                  name="cantidad"
                  value={row.cantidad}
                  onChange={(e) => handleChangeItem(index, e)}
                  type="number"
                  error={!!errors.cantidad}
                  helperText={errors.cantidad}
                  sx={{ alignItems: "center", flex: 1 }}
                  InputProps={{
                    sx: {
                      width: "60%",
                    },
                  }}
                />

                <StyledStack sx={{ textAlign: "center", flex: 1 }}>
                  <Typography variant="body1" margin="5%">
                    x
                  </Typography>
                  <OrderTextField
                    name="precio_unidad"
                    value={row.precio_unidad}
                    onChange={(e) => handleChangeItem(index, e)}
                    type="number"
                    error={!!errors.precio}
                    helperText={errors.precio}
                    sx={{ alignItems: "left" }}
                    InputProps={{
                      sx: {
                        width: "80%",
                      },
                    }}
                  />
                </StyledStack>

                <Typography
                  variant="body2"
                  sx={{ textAlign: "right", flex: 1 }}
                >
                  {`$ ${row.precio_total}`}
                </Typography>

                <Box sx={{ flex: 0.3, marginLeft: 1 }}>
                  <IconButton
                    onClick={() => removeOrderItem(index)}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      color: "secondary.contrastText",
                      "&:hover": {
                        backgroundColor: theme.palette.secondary.main,
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </StyledStack>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "90%",
              borderTop: "2px solid lightgrey",
            }}
          >
            <Box
              display="flex"
              width="100%"
              flexDirection="row"
              paddingTop="2%"
            >
              <Button
                variant="contained"
                onClick={addOrderItem}
                sx={{
                  backgroundColor: "#266763",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#c3fa7b",
                    color: "#7e7e7e",
                  },
                  alignSelf: "flex-start",
                }}
                disableElevation
              >
                Añadir
              </Button>
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "flex-end",
                  width: "20%",
                }}
              >
                <Typography variant="body1">{`$ ${total}`}</Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              gap: 2,
              padding: "3%",
              justifyContent: "center",
              width: "100%",
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

export default OrderForm;
