import { useTheme } from "@mui/material/styles";
import { Stack } from "@mui/material"
import { Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const or_data = {
    id_pedido: "1",
    rut_proveedor: "12345678-9",
    rut_usuario: "98765432-1",
    fecha: "2023-06-01",
    compra_total: "150,000",
    detalle_pedido: [
      {
        id_pedido: "1",
        id_producto: "P101",
        cantidad: 2,
        precio_unidad: 5000,
        precio_total: 4000000,
      },
      {
        id_pedido: "1",
        id_producto: "P102",
        cantidad: 10,
        precio_unidad: 50,
        precio_total: 50,
      },
      {
        id_pedido: "1",
        id_producto: "P103",
        cantidad: 100,
        precio_unidad: 500,
        precio_total: 500,
      },
      {
        id_pedido: "1",
        id_producto: "P104",
        cantidad: 1000,
        precio_unidad: 5000,
        precio_total: 5000,
      },
      {
        id_pedido: "1",
        id_producto: "P105",
        cantidad: 10,
        precio_unidad: 5,
        precio_total: 5,
      },
      {
        id_pedido: "1",
        id_producto: "P106",
        cantidad: 19,
        precio_unidad: 500000,
        precio_total: 500000,
      },
      {
        id_pedido: "1",
        id_producto: "P107",
        cantidad: 199,
        precio_unidad: 500,
        precio_total: 500,
      },
      {
        id_pedido: "1",
        id_producto: "P108",
        cantidad: 19,
        precio_unidad: 5000,
        precio_total: 5000,
      },
    ],
  }

const OrderDetails = ({ data, closeModal }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-25%)",
        top: "10%",
        width: "80vw",
        maxWidth: "600px",
        maxHeight: "90vh",
        bgcolor: theme.palette.background.default,
        boxShadow: 15,
        borderRadius: "15px",
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          width: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "15px",
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ mb: 0, pl: 3, pt: 4, pb: 1.5 }}>
            Total Venta:
          </Typography>
          <Typography variant="h4" sx={{ mb: 0, pl: 3, pb: 3 }}>
            ${or_data.compra_total}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ textAlign: "right", pr: 3}}>
            Nº Pedido: {or_data.id_pedido}
          </Typography>
          <Typography sx={{ textAlign: "right", pr: 3 }}>
            Fecha: {or_data.fecha}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 5 }}>
        <Typography>
          <strong>RUT Proveedor:</strong> {or_data.rut_proveedor}
        </Typography>
        <Typography>
          <strong>RUT Usuario:</strong> {or_data.rut_usuario}
        </Typography>

        <hr style={{ borderTop: "1px solid black", marginBottom: "10px", marginTop: "15px" }} /> {/* LINEA */}

        <Box sx={{ py: 1, fontWeight: "bold", textAlign: "center"}}>
        <Typography component="div">
          <Box>
            <span style={{ width: "25%", display: "inline-block", fontWeight: "bold", textAlign: "center" }}>ID</span>
            <span style={{ width: "25%", display: "inline-block", fontWeight: "bold", textAlign: "center" }}>Precio Unitario</span>
            <span style={{ width: "25%", display: "inline-block", fontWeight: "bold", textAlign: "center" }}>Cantidad</span>
            <span style={{ width: "25%", display: "inline-block", fontWeight: "bold", textAlign: "center" }}>Subtotal</span>
          </Box>
        </Typography>
      </Box>
      
      <Box sx={{ maxHeight: "150px", overflowY: "auto" }}>
        <table style={{ width: "100%" }}>
          <tbody>
            {or_data.detalle_pedido.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center", width: "25%" }}>{item.id_producto}</td>
                <td style={{ textAlign: "center", width: "25%" }}>${item.precio_unidad}</td>
                <td style={{ textAlign: "center", width: "25%" }}>{item.cantidad}</td>
                <td style={{ textAlign: "center", width: "20%" }}>${item.precio_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

        <hr style={{ borderTop: "1px solid black", marginBottom: "15px",  marginTop: "20px" }} /> {/* LINEA */}

        <Typography variant="h6" sx={{ mt: 1, textAlign: "Right", marginRight: "25px", fontSize: "17px" }}>
          Monto Total: ${or_data.compra_total}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Button
          variant="contained"
          endIcon={<CloseIcon />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontSize: "0.8rem",
            width: "150px",
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
            },
            margin: "0 auto",
          }}
          onClick={closeModal}
        >
          Cerrar
        </Button>
      </Box>
    </Box>
  );
};

export default OrderDetails;