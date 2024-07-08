import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Badge, Menu, List, ListItem, ListItemText } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import IconButton from "@mui/material/IconButton";

const NotificationPanel = () => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Notification 1' },
    { id: 2, message: 'Notification 2' },
    { id: 3, message: 'Notification 3' },
    { id: 4, message: 'Notification 4' },
    { id: 5, message: 'Notification 5' },
    { id: 6, message: 'Notification 6' },
    { id: 7, message: 'Notification 7' },
    { id: 8, message: 'Notification 8' },
    { id: 9, message: 'Notification 9' },
    { id: 10, message: 'Notification 10' },
    { id: 11, message: 'Notification 11' },

  ]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Función para obtener el mensaje específico de la notificación
  const getNotificationMessage = (notification) => {
    // Aquí se debería obtener el nombre, ID y cantidad desde la notificación
    const nombre = "Producto X";
    const numeroId = 123;
    const cantidad = 5;

    return `El producto ${nombre} de ID ${numeroId} tiene actualmente ${cantidad} de stock disponible. Se recomienda regularizar a la brevedad.`;
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
        onClick={handleClick}
      >
        <Badge badgeContent={notifications.length} color="primary">
          {notifications.length === 0 ? (
            <NotificationsNoneIcon sx={{ width: "2vw", height: "auto" }} />
          ) : (
            <NotificationsIcon sx={{ width: "2vw", height: "auto" }} />
          )}
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: '60vh', // Ajusta la altura máxima del menú (ejemplo: 60% de la altura de la ventana)
            width: '30ch',
          },
        }}
      >
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id} button>
              <ListItemText
                primary={getNotificationMessage(notification)}
                primaryTypographyProps={{ variant: "body2", sx: { fontSize: "0.8rem" } }} 
              />
            </ListItem>
          ))}
        </List>
      </Menu>
    </>
  );
};

export default NotificationPanel;
