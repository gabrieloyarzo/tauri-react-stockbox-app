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
          props: { variant: 'contained' },
          style: {
            color: "#ffffff",
            backgroundColor: "#4A9E9A",
            '&:hover': {
              backgroundColor: "#b2e076",
              color: "#4A9E9A",
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: "#4A9E9A",
            borderColor: "#4A9E9A",
            '&:hover': {
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
