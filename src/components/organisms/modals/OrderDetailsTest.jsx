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
      id_producto: "101",
      cantidad: 2,
      precio_unidad: 50,
      precio_total: 100,
    },
    {
      id_pedido: "1",
      id_producto: "102",
      cantidad: 1,
      precio_unidad: 50,
      precio_total: 50,
    },
    {
      id_pedido: "1",
      id_producto: "103",
      cantidad: 1,
      precio_unidad: 50,
      precio_total: 50,
    },
    {
      id_pedido: "1",
      id_producto: "104",
      cantidad: 1,
      precio_unidad: 50,
      precio_total: 50,
    },
    {
      id_pedido: "1",
      id_producto: "105",
      cantidad: 1,
      precio_unidad: 50,
      precio_total: 50,
    },
    {
      id_pedido: "1",
      id_producto: "107",
      cantidad: 1,
      precio_unidad: 50,
      precio_total: 50,
    },
    {
      id_pedido: "1",
      id_producto: "108",
      cantidad: 1,
      precio_unidad: 50,
      precio_total: 50,
    },
    {
      id_pedido: "1",
      id_producto: "109",
      cantidad: 1,
      precio_unidad: 50,
      precio_total: 50,
    },
  ],
}

const OrderDetailsTest = ({ data, closeModal }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-25%)",
        top: "20%",
        width: "80vw",
        maxWidth: "600px",
        maxHeight: "90vh",
        bgcolor: theme.palette.background.default,
        boxShadow: 15,
        borderRadius: "15px",
        padding: "20px",
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
          <Typography variant="h5" sx={{ mb: 1, pl: 3, pt: 3, pb: 1.5 }}>
            Total venta:
          </Typography>
          <Typography variant="h4" sx={{ mb: 1, pl: 3, pb: 3 }}>
            ${or_data.compra_total}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ textAlign: "right", pr: 3 }}>
            Nº Pedido: {or_data.id_pedido}
          </Typography>
          <Typography sx={{ textAlign: "right", pr: 3 }}>
            Fecha: {or_data.fecha}
          </Typography>
        </Box>
      </Box>
      <hr style={{ borderTop: "1px solid black", marginBottom: "20px" }} /> {/* LINEA */}
      <Box sx={{ p: 1, fontWeight: "bold", textAlign: "center" }}>
        <Typography component="div">
          <Box>
            <span style={{ width: "25%", display: "inline-block", fontWeight: "bold", textAlign: "center" }}>ID</span>
            <span style={{ width: "25%", display: "inline-block", fontWeight: "bold", textAlign: "center" }}>Precio Unitario</span>
            <span style={{ width: "25%", display: "inline-block", fontWeight: "bold", textAlign: "center" }}>Cantidad</span>
            <span style={{ width: "25%", display: "inline-block", fontWeight: "bold", textAlign: "center" }}>Precio Total</span>
          </Box>
        </Typography>
      </Box>
      
      <Box sx={{ maxHeight: "100px", overflowY: "auto" }}>
        <table style={{ width: "100%" }}>
          <tbody>
            {or_data.detalle_pedido.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center", width: "25%" }}>{item.id_producto}</td>
                <td style={{ textAlign: "center", width: "25%" }}>${item.precio_unidad}</td>
                <td style={{ textAlign: "center", width: "25%" }}>{item.cantidad}</td>
                <td style={{ textAlign: "center", width: "25%" }}>${item.precio_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      <hr style={{ borderTop: "1px solid black", marginTop: "20px" }} /> {/* LINEA */}

      <Typography variant="h6" sx={{ mt: 2, textAlign: "Right", marginRight: "20px", fontSize: "17px" }}>
        Total: ${or_data.compra_total}
      </Typography>
    </Box>
  );
};

export default OrderDetailsTest;