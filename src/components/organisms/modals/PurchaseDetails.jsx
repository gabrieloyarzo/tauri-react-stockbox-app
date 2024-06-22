import { useTheme } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatNumber } from "../../../functions/helpers";

const PurchaseDetails = ({ data, closeModal }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        zIndex: 1,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-25%, -50%)",
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
            Total compra:
          </Typography>
          <Typography variant="h4" sx={{ mb: 0, pl: 3, pb: 3 }}>
            {`$ ${formatNumber(data.total)}`}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ textAlign: "right", pr: 3}}>
            Código: {data.cod}
          </Typography>
          <Typography sx={{ textAlign: "right", pr: 3 }}>
            Fecha: {data.fecha}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 5 }}>
        <Typography>
          <strong>RUT del proveedor:</strong> {data.rutp}
        </Typography>
        <Typography>
          <strong>RUT del usuario:</strong> {data.rutu}
        </Typography>

        <hr style={{ borderTop: "1px solid grey", marginBottom: "10px", marginTop: "15px" }} /> {/* LINEA */}

        <Box sx={{ py: 1, fontWeight: "bold", textAlign: "center"}}>
        <Typography component="div">
          <Box>
            <span style={{ width: "20%", display: "inline-block", fontWeight: "bold", textAlign: "center" }}>Código del producto</span>
            <span style={{ width: "27%", display: "inline-block", fontWeight: "bold", textAlign: "center" }}>Cantidad</span>
            <span style={{ width: "25%", display: "inline-block", fontWeight: "bold", textAlign: "center" }}>Precio c/u</span>
            <span style={{ width: "25%", display: "inline-block", fontWeight: "bold", textAlign: "center" }}>Subtotal</span>
          </Box>
        </Typography>
      </Box>
      
      <Box sx={{ maxHeight: "150px", overflowY: "auto" }}>
        <table style={{ width: "100%" }}>
          <tbody>
            {data.detalles.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center", width: "20%" }}>{item.cod}</td>
                <td style={{ textAlign: "center", width: "20%" }}>{formatNumber(item.cit)}</td>
                <td style={{ textAlign: "center", width: "1%"}}>x</td>
                <td style={{ textAlign: "center", width: "25%" }}> {`$ ${formatNumber(item.precio)}`}</td>
                <td style={{ textAlign: "center", width: "20%" }}> {`$ ${formatNumber(item.suma)}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

        <hr style={{ borderTop: "1px solid grey", marginBottom: "15px",  marginTop: "20px" }} /> {/* LINEA */}

        <Typography variant="h6" sx={{ mt: 1, textAlign: "Right", marginRight: "25px", fontSize: "17px" }}>
          {`Total: $ ${formatNumber(data.total)}`}
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

export default PurchaseDetails;