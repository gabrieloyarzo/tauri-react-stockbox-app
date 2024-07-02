import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import LoginApi from "../../services/api/login.service";
import {
  Box,
  Stack,
  Card,
  CardMedia,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { validateLogin } from "../../services/validation/loginValidation";
import { formatRut } from "../../functions/formatRut";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { setUserData } = useUser();

  const [checked, setChecked] = useState(
    localStorage.getItem("usuario") !== null
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [credentials, setCredentials] = useState({
    rutu: localStorage.getItem("usuario") || "",
    pwd: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "rutu") {
      setCredentials({
        ...credentials,
        [e.target.name]: formatRut(e.target.value),
      });
      return;
    }
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateLogin(credentials);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (checked) {
      localStorage.setItem("usuario", credentials.rutu);
    } else {
      localStorage.removeItem("usuario");
    }

    setLoading(true);
    try {
      const token = await LoginApi.logUsers(credentials);
      if (token) {
        localStorage.setItem("token", token.data.token);
        setUserData();
        showSnackbar(token.data.message, "success");
        navigate("/");
      }
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container spacing={2} sx={{ minHeight: "100vh" }}>
        <Grid item xs={6} md={6}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              backgroundColor: "#266763",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: theme.shadows[10],
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
                  <Stack width="90%" direction="column" spacing={2}>
                    <TextField
                      label="RUT"
                      name="rutu"
                      value={credentials.rutu}
                      fullWidth
                      onChange={handleChange}
                      error={!!errors.rutu}
                      helperText={errors.rutu || ""}
                      inputProps={{
                        maxLength: 12,
                      }}
                      formHelperTextOptions={{
                        sx: {
                          minHeight: "1.5em",
                        },
                      }}
                    />
                    <TextField
                      label="Contraseña"
                      type="password"
                      name="pwd"
                      onChange={handleChange}
                      error={!!errors.pwd}
                      helperText={errors.pwd || ""}
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
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                  </Stack>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    padding="2em"
                  >
                    <LoadingButton
                      variant="contained"
                      loading={loading}
                      loadingPosition="end"
                      type="submit"
                      sx={{ width: "50%" }}
                      autoFocus
                    >
                      INGRESAR
                    </LoadingButton>
                  </Box>
                </Box>
              </form>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
