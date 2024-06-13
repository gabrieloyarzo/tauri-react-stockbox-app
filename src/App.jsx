import React from "react";
import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme/theme";
import Login from "./components/Organisms/forms/Login";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Grid container sx={{ minHeight: "100vh", minWidth: "720px" }}>
        <Login/>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
