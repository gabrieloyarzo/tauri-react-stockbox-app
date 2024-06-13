import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const MockupOrderV2 = () => {
  const [companyRut, setCompanyRut] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [totalItem, setTotalItem] = useState(0);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    setTotalItem(
      quantity && price ? parseInt(quantity) * parseFloat(price) : 0
    );
  }, [quantity, price]);

  const handleAddItem = () => {
    if (!productId || !quantity || !price) {
      setError("Todos los campos del producto son obligatorios.");
      return;
    }
    if (isNaN(quantity) || isNaN(price)) {
      setError("Cantidad y Precio deben ser números.");
      return;
    }
    setItems([
      ...items,
      { productId, quantity: parseInt(quantity), price: parseFloat(price) },
    ]);
    setProductId("");
    setQuantity("");
    setPrice("");
    setError("");
  };

  const handleRemoveItem = (index) => {
    setItemToDelete(index);
    setOpen(true);
  };

  const confirmRemoveItem = () => {
    const newItems = items.filter((_, i) => i !== itemToDelete);
    setItems(newItems);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!companyRut) {
      setError("El RUT de la empresa es obligatorio.");
      return;
    }
    console.log("Datos del formulario:", { companyRut, items });
  };

  const totalAmount = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <Box sx={{ padding: 2 }}>
      <AppBar position="static" sx={{ backgroundColor: "#00695c" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            REGISTRO DE PEDIDO
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper sx={{ padding: 2, marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Rut de Empresa:</Typography>
            <TextField
              variant="outlined"
              value={companyRut}
              onChange={(e) => setCompanyRut(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
                  <TableRow>
                    <TableCell>ID del Producto</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Precio Unitario</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.productId}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        ${(item.quantity * item.price).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleRemoveItem(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="ID del Producto"
              variant="outlined"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Cantidad"
              variant="outlined"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
              required
              type="number"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Precio Unitario"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              required
              type="number"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Total"
              variant="filled"
              value={totalItem.toFixed(2)}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#00695c", color: "white" }}
              onClick={handleAddItem}
            >
              Añadir
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h6" align="right">
              Total: ${totalAmount.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#757575", color: "white" }}
              fullWidth
            >
              Cerrar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#00695c", color: "white" }}
              fullWidth
              onClick={handleSubmit}
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirmar eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este pedido?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmRemoveItem} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MockupOrderV2;
