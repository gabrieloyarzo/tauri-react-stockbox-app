import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Badge,
  Menu,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DeleteIcon from "@mui/icons-material/Delete";
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

  /*const handleDelete = (id) => {
  };*/

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
            maxHeight: "60vh", 
            width: "25vw",
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
                marginBottom: ".5em",
                borderRadius: ".5em",
                bgcolor: theme.palette.common.white,
                borderLeft: `5px solid ${theme.palette.primary.main}`, /*Linea verde*/
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <ListItemText
                  primary={notification.titulo}   /*Aqui va el titulo de noti.*/
                  primaryTypographyProps={{
                    variant: "body1",  /*Cambio el tipo de letra del titulo.*/
                    sx: { fontWeight: "bold", color: theme.palette.primary.main },
                  }}
                  secondary={notification.descripcion} /*Aqui descripción de noti.*/
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(notification.id)}
                  sx={{ color: theme.palette.primary.main }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Menu>
    </>
  );
};

export default NotificationPanel;
