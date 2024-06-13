import React from "react";
import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme/theme";
import { useTheme } from "@mui/material/styles";
import Login from "./components/organisms/forms/Login";

const App = () => {
  const theme = useTheme();
  const themeMode = localStorage.getItem('theme');

  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <Grid container sx={{ minHeight: "100vh", minWidth: "720px", bgcolor: theme.palette.background.default }}>
        <Login/>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
