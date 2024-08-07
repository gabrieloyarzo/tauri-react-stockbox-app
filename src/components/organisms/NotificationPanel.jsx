import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Badge,
  Menu,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationApi from "../../services/api/notification.service.js";
import { formatTimestamp, formatDate } from "../../functions/format.js";
import { useSnackbar } from "../../context/SnackbarContext";

const NotificationPanel = ({ data }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    id: null,
    open: false,
  });
  const { showSnackbar } = useSnackbar();
  let idGlobal = null;

  useEffect(() => {
    const fetchData = async () => {
      const notifications = await NotificationApi.getAllNotifications();
      setNotifications(notifications);
    };
    fetchData();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenConfirmation = (id) => {
    setDeleteConfirmation({ id, open: true });
  };

  const handleCloseConfirmation = () => {
    setDeleteConfirmation({ id: null, open: false });
  };

  const handleConfirmDelete = async () => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== deleteConfirmation.id
    );

    try {
      const response = await NotificationApi.deleteNotification(
        deleteConfirmation.id
      );
      showSnackbar(response.data.message, "success");
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    }

    setNotifications(updatedNotifications);
    handleCloseConfirmation();
    handleClose(); // Cerrar el menú después de eliminar
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
          {notifications.length > 0 ? (
            () => {
              notifications.map((notification, index) => {
                const { fecha, hora } = formatTimestamp(notification.creado);

                return (
                  <ListItem
                    key={index}
                    sx={{
                      width: "95%",
                      marginBottom: ".5em",
                      borderRadius: ".5em",
                      bgcolor: theme.palette.common.white,
                      borderLeft: `5px solid ${theme.palette.primary.main}`,
                      position: "relative",
                    }}
                  >
                    <ListItemText
                      primary={notification.titulo}
                      primaryTypographyProps={{
                        variant: "body1",
                        sx: {
                          fontWeight: "bold",
                          color: theme.palette.primary.main,
                        },
                      }}
                      secondary={notification.desc}
                      sx={{
                        position: "relative",
                        left: "1em",
                        maxWidth: "calc(100% - 4em)",
                        overflowWrap: "break-word",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: "0.5em",
                        right: "0.5em",
                        color: theme.palette.text.secondary,
                        fontSize: "0.8rem",
                        textAlign: "right",
                      }}
                    >
                      {formatDate(fecha)}
                      <br />
                      {hora}
                    </Box>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleOpenConfirmation(notification.idn)}
                      sx={{
                        position: "absolute",
                        bottom: "-0.01em",
                        right: "0.5em",
                        color: theme.palette.primary.main,
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                );
              });
            }
          ) : (
            <ListItem
              sx={{
                width: "95%",
                marginBottom: ".5em",
                borderRadius: ".5em",
                bgcolor: theme.palette.common.white,
                borderLeft: `5px solid ${theme.palette.primary.main}`,
                position: "relative",
              }}
            >
              <ListItemText
                primary="No hay notificaciones"
                primaryTypographyProps={{
                  variant: "body1",
                  sx: {
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                  },
                }}
                sx={{
                  position: "relative",
                  left: "1em",
                  maxWidth: "calc(100% - 4em)",
                  overflowWrap: "break-word",
                }}
              />
            </ListItem>
          )}
        </List>
      </Menu>

      <Dialog
        open={deleteConfirmation.open}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que quieres eliminar esta notificación?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NotificationPanel;
