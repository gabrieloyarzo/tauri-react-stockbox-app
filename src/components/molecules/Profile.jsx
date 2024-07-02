import React from "react";
import { useUser } from "../../context/UserContext";
import { Typography, Stack } from "@mui/material";

const Profile = () => {
  const { user } = useUser();

  return (
    <Stack 
      position="relative"
      direction="column"
      spacing="-.25em"
    >   
      <Typography variant="body1" fontWeight="bold">
        {user?.nombre}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {user?.rol}
      </Typography>
    </Stack>
  );
};

export default Profile;


