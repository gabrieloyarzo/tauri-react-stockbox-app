import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#266763",
      light: "#348d87",
      dark: "#1A4845",
      contrastText: "#ffffff",
    },
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    secondary: {
      main: "#c3fa7b",
      light: "#CFFB95",
      dark: "#88AF56",
      contrastText: "#8c8c8c",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ffc107",
      light: "#ffecb3",
      dark: "#ff8f00",
      contrastText: "#000000",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#ffffff",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "#000000",
    },
    text: {
      icon: "#000000",
      primary: "#000000",
      secondary: "#757575",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    action: {
      active: "#3f51b5",
      hover: "#c3fa7b",
      selected: "#eeeeee", // Selected action color
      disabled: "#bdbdbd", // Disabled action color
    },
  },
  variants: {
    button: {
      contained: {
        color: "#ffffff",
        backgroundColor: "#266763", // Green
        "&:hover": {
          backgroundColor: "#c3fa7b", // Lighter shade of primary color
          color: "#266763",
        },
      },
      outlined: {
        color: "#266763", // Green
        borderColor: "#266763", // Green
        "&:hover": {
          backgroundColor: "#f5f5f5", // Light background on hover
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  // components: {
  //   MuiSvgIcon: {
  //     styleOverrides: {
  //       root: {
  //         color: "#000000", // Color predeterminado para todos los íconos
  //         '&.MuiSvgIcon-colorPrimary': {
  //           color: "#000000", // Color para íconos con colorPrimary
  //         },
  //         '&.MuiSvgIcon-colorSecondary': {
  //           color: "#000000", // Color para íconos con colorSecondary
  //         },
  //       },
  //     },
  //   },
  // },
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#3f51b5", // Azul
    },
    secondary: {
      main: "#f50057", // Rosa
    },
    error: {
      main: "#f44336", // Rojo
    },
    warning: {
      main: "#ffc107", // Amarillo
    },
    info: {
      main: "#2196f3", // Azul claro
    },
    success: {
      main: "#4caf50", // Verde
    },
    text: {
      primary: "#ffffff", // Texto principal
      secondary: "##c7c5c5", // Texto secundario
    },
    background: {
      default: "#000000", // Fondo predeterminado
      paper: "#1a1a1a", // Fondo del papel (por ejemplo, para contenedores)
    },
    action: {
      active: "#3f51b5", // Color de acción activa (como hover, selección, etc.)
      hover: "#eeeeee", // Color de acción al pasar el mouse
      selected: "#eeeeee", // Color de acción seleccionada
      disabled: "#bdbdbd", // Color de acción deshabilitada
    },
  },
});

export { lightTheme, darkTheme };
