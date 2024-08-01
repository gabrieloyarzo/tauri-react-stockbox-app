import React, { forwardRef, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Snackbar, Alert, Box } from "@mui/material";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return (
    <Alert
      {...props}
      elevation={6}
      ref={ref}
      sx={{ ".MuiAlert-action": { display: "none" } }}
    />
  );
});

const ProgressBar = ({ duration }) => {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(oldProgress + 100 / (duration / 100), 100);
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [duration]);

  return (
    <Box
      sx={{
        height: "5%",
        width: "100%",
        backgroundColor: theme.palette.grey[200],
        position: "absolute",
        left: 0,
        bottom: 0,
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: theme.palette.grey[400],
          transition: "width 0.1s linear",
        }}
      />
    </Box>
  );
};

const CustomSnackbar = ({
  open,
  closeSnack,
  message,
  severity,
  duration = 3000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={closeSnack}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <SnackbarAlert onClose={closeSnack} severity={severity}>
        {message}
        {/* <ProgressBar duration={duration} /> */}
      </SnackbarAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
