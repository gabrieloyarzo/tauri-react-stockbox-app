import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import UserApi from "../../../services/api/user.service";
import Sidebar from '../Sidebar';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
  marginBottom: "2vh",
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#9bc661",
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: "#9bc661",
  },
});

const T2 = ({ handleChange, handleSubmit }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={2} sx={{ height: "100vh" }}>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            "@media (max-width: 899.99px)": {
              height: "300px",
            },
            "@media (min-width: 900px)": {
              height: "100%",
            },
            width: "100%",
            backgroundColor: "#266763",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.6)",
          }}
        >
          <CardMedia
            component="img"
            alt="StockBox"
            image="/src/images/logo_2.png"
            sx={{
              height: "55%",
              width: "auto",
              minHeight: "250px",
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Card
            sx={{
              width: "65%",
              borderRadius: "16px",
              bgcolor: theme.palette.background.default,
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box sx={{ padding: "50px", margin: 2 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                ¡BIENVENIDO A STOCKBOX!
              </Typography>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Accede a tu cuenta
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  width: "65%",
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box>
                  <StyledTextField
                    label="RUT"
                    name="rut"
                    fullWidth
                    onChange={handleChange}
                  />
                  <StyledTextField
                    label="Contraseña"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    fullWidth
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: "#348d87",
                          "&.Mui-checked": {
                            color: "#348d87",
                          },
                        }}
                      />
                    }
                    label="Recordar usuario"
                  />
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#266763",
                    color: "#ffffff",
                    fontSize: "1rem",
                    width: "200px",
                    borderRadius: "12px",
                    "&:hover": {
                      backgroundColor: "#c3fa7b",
                      color: "#7e7e7e",
                    },
                    margin: 5,
                  }}
                  type="submit"
                >
                  INGRESAR
                </Button>
              </Box>
            </form>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

const Login = () => {
  const [logged, setLogged] = useState("Login");

  const [credentials, setCredentials] = useState({
    rut: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLogged("Dashboard");
      const token = await UserApi.logUsers(credentials);
      console.log(token);
      //credentials -> {rut, password}

    } catch (error) {
      console.error("Error al setear datos");
    }
  };

  return (
    <>
      {logged === "Login" && (
        <T2 handleChange={handleChange} handleSubmit={handleSubmit} />
      )}
      {logged === "Dashboard" && <Sidebar />}
    </>
  );
};

export default Login;
