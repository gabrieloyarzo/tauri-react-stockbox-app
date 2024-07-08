import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import IconButton from "@mui/material/IconButton";

const NotificationPanel = () => {
  const theme = useTheme();

  const [number, setNumber] = useState(0);

  return (
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
    >
      <Badge badgeContent={number} color="primary">
        {number === 0 ? (
          <NotificationsNoneIcon sx={{ width: "2vw", height: "auto" }} />
        ) : (
          <NotificationsIcon sx={{ width: "2vw", height: "auto" }} />
        )}
      </Badge>
    </IconButton>
  );
};

export default NotificationPanel;
