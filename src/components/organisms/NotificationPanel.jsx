import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Badge, Menu, List, ListItem, ListItemText } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import IconButton from "@mui/material/IconButton";
import { mockNotifications } from "../../../mock/notificationsMock.js";

const useNotifications = ({ data }) => {
  const [notifications, setNotifications] = useState(mockNotifications);

  useEffect(() => {
    setNotifications(data);
  }, [data]);

  return { notifications };
};

const NotificationPanel = ({ data = mockNotifications }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const { notifications } = useNotifications({ data });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
          {open ? (
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
            maxHeight: "60vh", // Ajusta la altura máxima del menú (ejemplo: 60% de la altura de la ventana)
            width: "30ch",
          },
        }}
      >
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id} button>
              <ListItemText
                primary={notification.message}
                primaryTypographyProps={{
                  variant: "body2",
                  sx: { fontSize: "0.8rem" },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Menu>
    </>
  );
};

export default NotificationPanel;
