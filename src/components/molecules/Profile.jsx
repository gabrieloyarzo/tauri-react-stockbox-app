import React from "react";
import { Typography, Stack } from "@mui/material";

const Profile = () => {
  return (
    <Stack 
      position="relative"
      direction="column"
      spacing="-.25em"
    >   
      <Typography variant="h6" fontWeight="bold" fontSize="16px">
        DABOR MARTINEZ
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Administrador
      </Typography>
    </Stack>
  );
};

export default Profile;


