import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import IconButton from "@mui/material/IconButton";
import NotificationPop from "./modals/notificationPop";

const NotificationPanel = () => {
  const theme = useTheme();
  const [number, setNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura del modal

  // Función para abrir el modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <IconButton
        sx={{
          position: "relative",
          color: theme.palette.common.black,
          bgcolor: theme.palette.grey[300],
          width: "2.5vw",
          height: "2.5vw",
          borderRadius: ".5rem",
          "&:hover": {
            bgcolor: theme.palette.action.hover,
          },
        }}
        aria-label="notifications-button"
        onClick={handleOpenModal} // Abre el modal al hacer clic
      >
        <Badge badgeContent={number} color="primary">
          {number === 0 ? (
            <NotificationsNoneIcon sx={{ width: "2vw", height: "auto" }} />
          ) : (
            <NotificationsIcon sx={{ width: "2vw", height: "auto" }} />
          )}
        </Badge>
      </IconButton>

      {/* Renderiza el modal de notificaciones si openModal es true */}
      {openModal && (
        <NotificationPop
          notificaciones={[]} // Pasa las notificaciones aquí
          onClose={handleCloseModal} // Pasa la función para cerrar el modal
        />
      )}
    </>
  );
};

export default NotificationPanel;
