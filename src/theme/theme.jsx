import { backdropClasses } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const baseLightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#266763", // Verde
      light: "#348d87", // Verde claro
      dark: "#1A4845", // Verde oscuro
      contrastText: "#ffffff", // Blanco
    },
    secondary: {
      main: "#c3fa7b", // Verde chillón
      light: "#CFFB95", // Verde chillón claro
      dark: "#88AF56", // Verde chillón oscuro
      contrastText: "#8c8c8c", // Gris
    },
    error: {
      main: "#f44336", // Rojo
      light: "#e57373", // Rojo claro
      dark: "#d32f2f", // Rojo oscuro
      contrastText: "#ffffff", // Blanco
    },
    warning: {
      main: "#ffc107", // Amarillo
      light: "#ffecb3", // Amarillo claro
      dark: "#ff8f00", // Naranja
      contrastText: "#000000", // Negro
    },
    info: {
      main: "#2196f3", // Azul
      light: "#64b5f6", // Azul claro
      dark: "#1976d2", // Azul oscuro
      contrastText: "#ffffff",
    },
    success: {
      main: "#4caf50", // Verde
      light: "#81c784", // Verde claro
      dark: "#388e3c", // Verde oscuro
      contrastText: "#000000", // Negro
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
  components: {
    MuiTextField: {
      styleOverrides: {
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "#266763",
          },
        "& .MuiInputLabel-outlined.Mui-focused": {
          color: "#266763",
        },
        "& .MuiInputBase-input": {
          // add something just in case
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          border: "1px solid #d3d3d3",
        },
        head: {
          boxShadow: baseLightTheme.shadows[5],
          position: "relative",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          // just in case
        },
        head: {
          backgroundColor: "#d9d9d9",
          fontWeight: "bold",
        },
        body: {
          backgroundColor: "#ffffff",
          border: "1px solid #ebebeb",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // fontSize: "1em", // Tamaño de letra relativo en rem o em
          padding: "0.5em 1em", // Padding relativo en em
          "&:hover": {
            backgroundColor: "#c3fa7b",
            color: "#8c8c8c",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "Nunito, sans-serif",
    h1: {
      fontSize: "clamp(1.5rem, 4vw, 3.5rem)", // 1.5rem mínimo, 4vw preferido, 3.5rem máximo
    },
    h2: {
      fontSize: "clamp(1.25rem, 3vw, 3rem)", // 1.25rem mínimo, 3vw preferido, 3rem máximo
    },
    h3: {
      fontSize: "clamp(1rem, 2.5vw, 2.5rem)", // 1rem mínimo, 2.5vw preferido, 2.5rem máximo
    },
    h4: {
      fontSize: "clamp(0.875rem, 2vw, 2rem)", // 0.875rem mínimo, 2vw preferido, 2rem máximo
    },
    h5: {
      fontSize: "clamp(0.75rem, 1.75vw, 1.75rem)", // 0.75rem mínimo, 1.75vw preferido, 1.75rem máximo
    },
    h6: {
      fontSize: "clamp(0.625rem, 1.5vw, 1.5rem)", // 0.625rem mínimo, 1.5vw preferido, 1.5rem máximo
    },
    subtitle1: {
      fontSize: "clamp(0.5rem, 1.25vw, 1.25rem)", // 0.5rem mínimo, 1.25vw preferido, 1.25rem máximo
    },
    subtitle2: {
      fontSize: "clamp(0.5rem, 1vw, 1rem)", // 0.5rem mínimo, 1vw preferido, 1rem máximo
    },
    body1: {
      fontSize: "clamp(0.5rem, 1vw, 1rem)", // 0.5rem mínimo, 1vw preferido, 1rem máximo
    },
    body2: {
      fontSize: "clamp(0.5rem, 0.875vw, 0.875rem)", // 0.5rem mínimo, 0.875vw preferido, 0.875rem máximo
    },
    caption: {
      fontSize: "clamp(0.375rem, 0.75vw, 0.75rem)", // 0.375rem mínimo, 0.75vw preferido, 0.75rem máximo
    },
    overline: {
      fontSize: "clamp(0.375rem, 0.75vw, 0.75rem)", // 0.375rem mínimo, 0.75vw preferido, 0.75rem máximo
    },
    button: {
      fontSize: "clamp(0.5rem, 0.875vw, 0.875rem)", // 0.5rem mínimo, 0.875vw preferido, 0.875rem máximo
    },
  },
});
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

// Dark theme
const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#4A9E9A",
      light: "#66BEB8",
      dark: "#3B7A77",
      contrastText: "#ffffff",
    },
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    secondary: {
      main: "#b2e076",
      light: "#D7FAB0",
      dark: "#8CAC5C",
      contrastText: "#2e2e2e",
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
      icon: "#ffffff",
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    action: {
      active: "#4A9E9A",
      hover: "#b2e076",
      selected: "#333333",
      disabled: "#555555",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            color: "#ffffff",
            backgroundColor: "#4A9E9A",
            "&:hover": {
              backgroundColor: "#b2e076",
              color: "#4A9E9A",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            color: "#4A9E9A",
            borderColor: "#4A9E9A",
            "&:hover": {
              backgroundColor: "#1e1e1e",
            },
          },
        },
      ],
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
});

export { lightTheme, darkTheme };
