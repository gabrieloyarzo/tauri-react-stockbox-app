import { useTheme } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatNumber } from "../../../functions/helpers";

const RefundsDetails = ({ data, closeModal }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          bgcolor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          zIndex: 1,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
            <Typography sx={{ mb: 0, pl: 3, pt: 2 }}>
            Código de devolución: {data.fecha}
            </Typography>
            <Typography sx={{ mb: 0, pl: 3, pt: 2, pb: 2 }}>
            Código de venta: {data.cod}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ textAlign: "right", pr: 3 }}>
              Nota de crédito: {data.fecha}
            </Typography>
            <Typography sx={{ textAlign: "right", pr: 3 }}>
              Fecha: {data.fecha}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ p: 5 }}>
          <hr
            style={{
              borderTop: "1px solid grey",
              marginBottom: "10px",
              marginTop: "15px",
            }}
          />{" "}
          {/* LINEA */}
          <Box sx={{ py: 1, fontWeight: "bold", textAlign: "center", marginRight: "100px" }}>
            <Typography component="div">
              <Box>
                <span
                  style={{
                    width: "20%",
                    display: "inline-block",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Código del producto: {}
                </span>
                <span
                  style={{
                    width: "25%",
                    display: "inline-block",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Cantidad total: {}
                </span>
                <span
                  style={{
                    width: "25%",
                    display: "inline-block",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Cantidad a reembolsar: {}
                </span>
              </Box>
            </Typography>
          </Box>
          <hr
            style={{
              borderTop: "1px solid grey",
              marginBottom: "15px",
              marginTop: "20px",
            }}
          />{" "}
          {/* LINEA */}
        </Box>
        <Box >
          <Typography sx={{ textAlign: "left", marginLeft: 5 }}>
            Descripción: {data.cod}
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
    </>
  );
};

export default RefundsDetails;
