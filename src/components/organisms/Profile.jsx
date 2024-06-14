import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const Profile = () => {
  return (
    <Box 
      position="relative"
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      top="2px"
      right="2px"
    // height="25vh" // Ocupa toda la altura de la ventana
    //   width="75vw"
      // textAlign="center"
    >
      <AccountCircle sx={{ fontSize: 50 }} />
      <Typography variant="h4" component="h2" gutterBottom>
        Gabriel Oyarzo
      </Typography>
      <Typography variant="h6" color="textSecondary">
        Administrador
      </Typography>
    </Box>
  );
};

export default Profile;


