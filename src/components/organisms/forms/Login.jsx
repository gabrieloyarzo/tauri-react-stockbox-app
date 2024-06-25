import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import LoginApi from "../../../services/api/login.service";
import Sidebar from "../Sidebar";
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "2vh",
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: theme.palette.primary.main,
  },
}));

const T2 = ({ handleChange, handleSubmit }) => {
  const theme = useTheme();

  return (
    <>
      <Grid item xs={6} md={6}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: "#266763",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.6)",
            borderRadius: "1em",
          }}
        >
          <CardMedia
            component="img"
            alt="StockBox"
            image="/src/images/logo_2.png"
            sx={{
              width: "45%",
              height: "auto",
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={6} md={6}>
        <Box
          sx={{
            backgroundColor: theme.palette.background.default,
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
              borderRadius: "1em",
              bgcolor: theme.palette.background.default,
              boxShadow: theme.shadows[2],
            }}
          >
            <Box sx={{ padding: "2rem", margin: 2 }}>
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
                    name="rutu"
                    fullWidth
                    onChange={handleChange}
                  />
                  <StyledTextField
                    label="Contraseña"
                    type="password"
                    name="pwd"
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
                <Box width="100%" display="flex" justifyContent="center" padding="2em">
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ width: "50%" }}
                  >
                    INGRESAR
                  </Button>
                </Box>
              </Box>
            </form>
          </Card>
        </Box>
      </Grid>
    </>
  );
};

const Login = () => {
  const [logged, setLogged] = useState("Login");

  const [credentials, setCredentials] = useState({
    rutu: "",
    pwd: "",
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

     const token = await LoginApi.logUsers(credentials);
	if(token){
	          setLogged("Dashboard");
	}
	
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
