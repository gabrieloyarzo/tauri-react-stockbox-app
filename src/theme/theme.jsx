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
          height: "calc(2.25rem + 2.25vh)",
        },
        head: {
          position: "relative",
          height: "calc(1.75rem + 1.75vh)",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          width: "calc(2vw + 2vh)",
          height: "calc(2vw + 2vh)",
          "&:hover": {
            backgroundColor: "#C3FA7B",
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: "1.5vw",
          height: "1.5vw",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 0,
        },
        head: {
          backgroundColor: "#d9d9d9",
          fontWeight: "bold",
        },
        body: {
          border: "1px solid #ebebeb",
          paddingRight: 10,
          paddingLeft: 10,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // fontSize: "1em", // Tamaño de letra relativo en rem o em
          padding: "0.5em 1em",
          "&:hover": {
            backgroundColor: "#c3fa7b",
            color: "#8c8c8c",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: "calc(2.05vw + 2.05vh)",
        },
        h2: {
          fontSize: "calc(1.8vw + 1.8vh)",
        },
        h3: {
          fontSize: "calc(1.55vw + 1.55vh)",
        },
        h4: {
          fontSize: "calc(1.3vw + 1.3vh)",
        },
        h5: {
          fontSize: "calc(1.05vw + 1.05vh)",
        },
        h6: {
          fontSize: "calc(0.925vw + 0.925vh)",
        },
        subtitle1: {
          fontSize: "calc(0.8vw + 0.8vh)",
        },
        subtitle2: {
          fontSize: "calc(0.675vw + 0.675vh)",
        },
        body1: {
          fontSize: "calc(0.675vw + 0.675vh)",
        },
        body2: {
          fontSize: "calc(0.55vw + 0.55vh)",
        },
        caption: {
          fontSize: "calc(0.55vw + 0.55vh)",
        },
        overline: {
          fontSize: "calc(0.55vw + 0.55vh)",
        },
        button: {
          fontSize: "calc(0.675vw + 0.675vh)",
        },
      },
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontSize: "calc(2.05vw + 2.05vh)",
    },
    h2: {
      fontSize: "calc(1.8vw + 1.8vh)",
    },
    h3: {
      fontSize: "calc(1.55vw + 1.55vh)",
    },
    h4: {
      fontSize: "calc(1.3vw + 1.3vh)",
    },
    h5: {
      fontSize: "calc(1.05vw + 1.05vh)",
    },
    h6: {
      fontSize: "calc(0.925vw + 0.925vh)",
    },
    subtitle1: {
      fontSize: "calc(0.8vw + 0.8vh)",
    },
    subtitle2: {
      fontSize: "calc(0.675vw + 0.675vh)",
    },
    body1: {
      fontSize: "calc(0.675vw + 0.675vh)",
    },
    body2: {
      fontSize: "calc(0.55vw + 0.55vh)",
    },
    caption: {
      fontSize: "calc(0.55vw + 0.55vh)",
    },
    overline: {
      fontSize: "calc(0.55vw + 0.55vh)",
    },
    button: {
      fontSize: "calc(0.675vw + 0.675vh)",
    },
  },
});

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
});

export { lightTheme, darkTheme };
