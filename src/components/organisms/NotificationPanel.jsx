import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Badge,
  Menu,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
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
          width: "calc(1.65vw + 1.65vh)",
          height: "calc(1.65vw + 1.65vh)",
          borderRadius: ".5rem",
          "&:hover": {
            bgcolor: theme.palette.action.hover,
          },
        }}
        aria-label="notifications-button"
        onClick={handleClick}
      >
        <Badge
          badgeContent={notifications.length}
          color="primary"
          sx={{
            "& .MuiBadge-badge": {},
          }}
        >
          {open ? (
            <NotificationsNoneIcon
              sx={{
                width: "calc(1.4vw + 1.4vh)",
                height: "calc(1.4vw + 1.4vh)",
              }}
            />
          ) : (
            <NotificationsIcon
              sx={{
                width: "calc(1.4vw + 1.4vh)",
                height: "calc(1.4vw + 1.4vh)",
              }}
            />
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
            width: "20vw",
          },
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              sx={{
                width: "95%",
                marginBottom: '.5em',
                borderRadius: ".5em",
                bgcolor: theme.palette.grey[200],
              }}
            >
              <ListItemText
                primary={notification.descripcion}
                primaryTypographyProps={{
                  variant: "body2",
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
