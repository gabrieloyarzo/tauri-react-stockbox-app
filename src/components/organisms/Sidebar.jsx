import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { TabContext, TabList } from "@mui/lab";
import { Box, CardMedia, Typography, Tab } from "@mui/material";
import {
  AttachMoney,
  Contacts,
  Inventory,
  Leaderboard,
  LocalMall,
  Loop,
  Help,
  Settings,
  Groups,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom"; // Importa estos hooks

const StyledTab = styled(Tab)(({ theme }) => ({
  height: "100%",
  maxWidth: "80%",
  fontSize: theme.typography.subtitle1.fontSize,
  color: theme.palette.primary.contrastText,
  textTransform: "none",
  marginBottom: ".5em",
  minHeight: "2.75em",
  justifyContent: "flex-start",
}));

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= theme.breakpoints.values.md);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Llama a la función inmediatamente para establecer el estado inicial
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [theme.breakpoints.values.md]);

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setValue(path || "analytics");
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/${newValue}`);
  };

  if (value === "") {
    return null; // Para que renderice el componente solamente cuando se esté en la ruta /
  }

  return (
    <Box
      sx={{
        minHeight: "98vh",
        bgcolor: theme.palette.primary.main,
        borderRadius: "2em",
      }}
    >
      <Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={isSmallScreen ? "center" : "left"}
        >
          <CardMedia
            component="img"
            alt="StockBox"
            image="/src/images/logo_2.png"
            style={{
              padding: "5%",
              width: "4em",
              height: "auto",
              borderRadius: "50%",
            }}
          />
          {!isSmallScreen && (
            <Box display="flex" alignItems="center" flexDirection="column">
              <Typography variant="h5" color="primary.contrastText">
                StockBox
              </Typography>
              <Typography variant="h6" color="primary.contrastText">
                Menú
              </Typography>
            </Box>
          )}
        </Box>

        <TabContext value={value}>
          <Box
            p="4%"
            sx={{
              width: "auto",
              height: "100%",
              bgcolor: theme.palette.primary.main,
              borderRadius: "2em",
            }}
          >
            <TabList
              orientation="vertical"
              onChange={handleChange}
              sx={{
                "& .MuiTabs-flexContainer": {
                  alignItems: isSmallScreen ? "center" : "left",
                },
                "& .MuiTab-root": {
                  minWidth: 0,
                  "&:not(.Mui-selected)": {
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      borderRadius: "2rem",
                    },
                  },
                },
                "& .Mui-selected": {
                  color: theme.palette.primary.main,
                  boxShadow: "sm",
                  bgcolor: "#c3fa7b",
                  borderRadius: "2rem",
                },
                button: {
                  minHeight: 50,
                  alignItems: isSmallScreen ? "center" : "left",
                  justifyContent: isSmallScreen ? "center" : "left",
                },
              }}
            >
              <StyledTab
                value="analytics"
                label={!isSmallScreen && "Analíticas"}
                icon={<Leaderboard />}
                iconPosition="start"
              />
              <StyledTab
                value="sales"
                label={!isSmallScreen && "Ventas"}
                icon={<AttachMoney />}
                iconPosition="start"
              />
              <StyledTab
                value="refunds"
                label={!isSmallScreen && "Devoluciones"}
                icon={<Loop />}
                iconPosition="start"
              />
              <StyledTab
                value="purchases"
                label={!isSmallScreen && "Compras"}
                icon={<LocalMall />}
                iconPosition="start"
              />
              <StyledTab
                value="products"
                label={!isSmallScreen && "Productos"}
                icon={<Inventory />}
                iconPosition="start"
              />
              <StyledTab
                value="providers"
                label={!isSmallScreen && "Proveedores"}
                icon={<Contacts />}
                iconPosition="start"
              />
              <StyledTab
                value="users"
                label={!isSmallScreen && "Usuarios"}
                icon={<Groups />}
                iconPosition="start"
              />
              <StyledTab
                value="help"
                label={!isSmallScreen && "Ayuda"}
                icon={<Help />}
                iconPosition="start"
              />
              <StyledTab
                value="settings"
                label={!isSmallScreen && "Configuración"}
                icon={<Settings />}
                iconPosition="start"
              />
            </TabList>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Sidebar;
