import React, { useState } from "react";
import { useSnackbar } from "../../../context/SnackbarContext";
import { useDialog } from "../../../context/DialogContext";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  TextField,
  Box,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import RefundApi from "../../../services/api/refund.service";

const mockData = {
  idpu: 14, // No se usa
  cod: "P012",
  rutp: "20.939.766-8", // No se usa
  rutu: "21.578.935-7", // No se usa
  fecha: "2023-05-08", // No se usa
  total: 1200,
  detalles: [
    {
      idp: 7, // No se usa
      nombre: "Producto 1",
      cit: 12,
      precio: 100, // No se usa
      suma: 1200, // No se usa
      cod: "002",
    },
    {
      idp: 8, // No se usa
      nombre: "Producto 2",
      cit: 50,
      precio: 100, // No se usa
      suma: 1200, // No se usa
      cod: "005",
    },
  ],
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "2vh",
  width: "100%",
  "& .MuiInputBase-input": {
    height: ".75vw",
  },
  "& .MuiInputLabel-root": {
    fontSize: ".85vw",
  },
  "& .MuiInputBase-root": {
    fontSize: ".85vw",
  },
}));

const ItemTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    height: ".25em",
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
}));

const RefundForm = ({ mode = "create", data = mockData }) => {
  const theme = useTheme();
  const { showSnackbar } = useSnackbar();
  const { showDialog } = useDialog();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

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
          zIndex: 0, 
        }}
      />
      
      <Box
        sx={{
          zIndex: 1,
          position: "absolute",
          width: "40vw",
          minWidth: "440px",
          maxHeight: "90vh",
          top: "50%",
          left: "50%",
          display: "flex",
          transform: "translate(-29.5%, -50%)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          overflow: "hidden",
          bgcolor: "#ffffff",
          border: "1.5px solid #266763",
          borderRadius: "1rem",
          overflowX: "hidden",
          overflowY: "auto",
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
          <Typography
            variant="h5"
            sx={{ color: "#ffffff", fontWeight: "bold" }}
          >
            {mode === "modify"
              ? "Modificar devolución"
              : "Registrar devolución"}
          </Typography>
        </Box>

        <form onSubmit={() => {}} style={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Stack alignItems="center" width="65%" p={1}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <StyledTextField
                    label="Código de devolución"
                    name="cod"
                    // value={formData.cod}
                    // error={!!errors.cod}
                    // onChange={(e) => {
                    //   handleChange(e);
                    //   handleValidateCode(e);
                    // }}
                  />
                  <StyledTextField label="Nota de crédito" name="nota" />
                </Grid>
                <Grid item xs={6}>
                  <StyledTextField
                    label="Código de venta"
                    value={data.cod}
                    disabled
                  />
                  <StyledTextField
                    label="Fecha"
                    name="fecha"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // value={formData.fecha}
                    // error={!!errors.fecha}
                    // onChange={() => {}}
                  />
                </Grid>
              </Grid>
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
                    variant="body2"
                    fontWeight="bold"
                    sx={{ textAlign: "center", flex: 1 }}
                  >
                    Código del producto
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ textAlign: "center", flex: 1 }}
                  >
                    Producto
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ textAlign: "center", flex: 1 }}
                  >
                    Cantidad total
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{ textAlign: "center", flex: 1 }}
                  >
                    Cantidad a reembolsar
                  </Typography>
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
              {data.detalles.map((detalle, index) => (
                <StyledStack paddingBottom=".5%" alignItems="center" justifyContent="center">
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", flex: 1 }}
                  >
                    {detalle.cod}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", flex: 1 }}
                  >
                    {detalle.nombre}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: "center", flex: 1 }}
                  >
                    {detalle.cit}
                  </Typography>
                  <TextField
                    sx={{ display: "flex", flex: 1, alignItems: "center" }}
                    InputProps={{
                      sx: {
                        width: "60%",
                        height: "2.5vw",
                        fontSize: theme.typography.body2.fontSize,
                      },
                    }}
                  />
                </StyledStack>
              ))}
            </Box>

            <TextField
              label="Descripción"
              multiline
              rows={3}
              variant="outlined"
              sx={{ width: "90%" }}
              InputProps={{
                sx: {
                  fontSize: theme.typography.body2.fontSize,
                }
              }}
              InputLabelProps={{
                sx: {
                  fontSize: theme.typography.body2.fontSize,
                }
              }}
            />

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
                onClick={() => {}}
              >
                Cerrar
              </Button>
              <LoadingButton
                variant="contained"
                loading={false}
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

export default RefundForm;
