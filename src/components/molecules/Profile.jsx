import React from "react";
import { Typography, Stack } from "@mui/material";

const Profile = () => {
  return (
    <Stack 
      position="relative"
      direction="column"
      spacing="-.25em"
    >   
      <Typography variant="body1" fontWeight="bold">
        DABOR MARTINEZ
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Administrador
      </Typography>
    </Stack>
  );
};

export default Profile;

