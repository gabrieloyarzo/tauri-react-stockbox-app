import React from "react";
import { useUser } from "../../context/UserContext";
import { Typography, Stack } from "@mui/material";
import { capitalizeFirstLetter } from "../../functions/helpers";

const Profile = () => {
  const { user } = useUser();

  return (
    <Stack position="relative" direction="column" spacing="-.25em">
      <Typography variant="body1" fontWeight="bold">
        {`${user?.nombre} ${user?.apellido}`}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {capitalizeFirstLetter(user?.rol)}
      </Typography>
    </Stack>
  );
};

export default Profile;
