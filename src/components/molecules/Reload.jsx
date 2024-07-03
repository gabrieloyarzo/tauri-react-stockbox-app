import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton, Container, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

const Reload = ({ errorMessage = "Recargar" }) => {
  const theme = useTheme();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
        gap="1rem"
      >
        <IconButton
          sx={{
            width: "3.5vw",
            height: "3.5vw",
            bgcolor: theme.palette.grey[200],
            color: theme.palette.grey[500],
            boxShadow: theme.shadows[3],
            "&:hover": {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              width: "3.75vw",
              height: "3.75vw",
              transition: "width 0.3s, height 0.3s",
            },
          }}
          onClick={handleReload}
          autoFocus
        >
          <ReplayIcon sx={{ width: "2.5vw", height: "2.5vw" }} />
        </IconButton>
        <Typography variant="h6" sx={{ color: theme.palette.grey[600] }}>
          {errorMessage}
        </Typography>
      </Box>
    </Container>
  );
};

export default Reload;
