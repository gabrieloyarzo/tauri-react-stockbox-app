import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

const NotificacionesPop = ({ notificaciones, onClose }) => {
  const theme = useTheme();

  const mockupNotificaciones = [
    {
      id: 1,
      producto: "Soporte",
      cantidad: 3,
      fecha: "2024-07-08",
    },
    {
      id: 2,
      producto: "Cable tipo-c",
      cantidad: 1,
      fecha: "2024-07-07",
    },
    {
      id: 3,
      producto: "Monitor",
      cantidad: 2,
      fecha: "2024-07-06",
    },
    {
      id: 4,
      producto: "Teclado",
      cantidad: 5,
      fecha: "2024-07-05",
    },
    {
      id: 5,
      producto: "Escritorio",
      cantidad: 2,
      fecha: "2024-07-07",
    },
  ];

  return (
    <Box
      sx={{
        zIndex: 1,
        position: "absolute",
        top: "50%", // Centra verticalmente
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
          position: "sticky", // Para que el encabezado se mantenga fijo
          top: 0, // Se fija en la parte superior
          zIndex: 1, // Asegura que esté por encima del contenido con scroll
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
      >
        <Typography variant="h5">
          Notificaciones
        </Typography>
        <Button onClick={onClose} sx={{ color: theme.palette.primary.contrastText }}>
          <CloseIcon />
        </Button>
      </Box>

      <Box
        sx={{
          maxHeight: "70vh", // Altura máxima para el área de notificaciones
          overflowY: "auto", // Permite scroll vertical si hay muchas notificaciones
          padding: "10px 20px",
        }}
      >
        {mockupNotificaciones.map((notificacion, index) => (
          <Box
            key={index}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              {notificacion.producto}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              El producto {notificacion.producto} de ID {notificacion.id} tiene{" "}
              {notificacion.cantidad} unidades en stock. Se recomienda
              regularizar a la brevedad.
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Fecha: {notificacion.fecha}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 2,
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
        }}
      >
      </Box>
    </Box>
  );
};

export default NotificacionesPop;
