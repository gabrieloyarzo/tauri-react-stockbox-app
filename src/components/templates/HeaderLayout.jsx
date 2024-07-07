import React from "react";
import Stack from "@mui/material/Stack";
import Profile from "../molecules/Profile";
import NotificationsPanel from "../organisms/NotificationPanel";

const HeaderLayout = () => {
  return (
      <Stack direction="row" spacing="2vw" justifyContent="right">
        <NotificationsPanel />
        <Profile />
      </Stack>
  );
};

export default HeaderLayout;
