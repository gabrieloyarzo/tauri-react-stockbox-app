import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Container, Typography } from "@mui/material";

const ErrorScreen = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
        gap="1rem"
      >
        <Typography variant="subtitle1" sx={{ textAlign: "center", color: theme.palette.grey[600] }}>
          Hmm... esta página no existe. Intente buscar algo más.
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", color: theme.palette.grey[600] }}>
          Navegue por los enlaces de la barra lateral para ingresar a otras
          páginas.
        </Typography>
      </Box>
    </Container>
  );
};

export default ErrorScreen;
