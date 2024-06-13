import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const saleDetails = {
  folio: "N-123",
  productId: "12347321",
  totalSale: "100,000",
  customerName: "Carlos Ramirez",
  productName: "Lápiz",
  quantity: 10,
  unitPrice: 10000,
  sellerName: "Juan Lama",
  date: "10/10/10",
  time: "13:43",
};

const SaleDetails = ({ data, closeModal }) => {
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
            ${saleDetails.totalSale}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ textAlign: "right", pr: 3 }}>
            Nº Folio: {saleDetails.folio}
          </Typography>
          <Typography sx={{ textAlign: "right", pr: 3 }}>
            ID de producto: {saleDetails.productId}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 5 }}>
        <Typography>
          <strong>Nombre cliente:</strong> {saleDetails.customerName}
        </Typography>
        <Typography>
          <strong>Nombre producto:</strong> {saleDetails.productName}
        </Typography>
        <Typography>
          <strong>Cantidad:</strong> {saleDetails.quantity}
        </Typography>
        <Typography>
          <strong>Precio unitario:</strong> ${saleDetails.unitPrice}
        </Typography>
        <Typography>
          <strong>Vendedor:</strong> {saleDetails.sellerName}
        </Typography>
        <Typography>
          <strong>Fecha y hora:</strong> {saleDetails.date} - {saleDetails.time}
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

export default SaleDetails;
