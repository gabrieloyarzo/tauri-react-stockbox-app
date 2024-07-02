import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { TabContext, TabList } from "@mui/lab";
import { Box, CardMedia, Typography, Tab, Button } from "@mui/material";
import {
  AttachMoney,
  PersonSearch,
  Inventory,
  Leaderboard,
  LocalMall,
  Loop,
  Help,
  Groups,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutMenu from "../molecules/LogoutMenu";

const StyledTab = styled(Tab)(({ theme }) => ({
  height: "2vw",
  maxWidth: "80%",
  fontSize: theme.typography.subtitle1.fontSize,
  color: theme.palette.primary.contrastText,
  textTransform: "none",
  marginBottom: ".5em",
  justifyContent: "flex-start",
  "& .MuiSvgIcon-root": {
    width: "1.5vw",
    height: "auto",
  },
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
    return null;
  }

  return (
    <Box
      height="98%"
      sx={{
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
              width: "4vw",
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
                icon={<Groups />}
                iconPosition="start"
              />
              <StyledTab
                value="users"
                label={!isSmallScreen && "Usuarios"}
                icon={<PersonSearch />}
                iconPosition="start"
              />
              <StyledTab
                value="help"
                label={!isSmallScreen && "Ayuda"}
                icon={<Help />}
                iconPosition="start"
              />
            </TabList>
          </Box>
        </TabContext>
      </Box>
      <Box
        display="flex"
        position="relative"
        p="4%"
        bottom={0}
        justifyContent={isSmallScreen ? "center" : "left"}
      >
        <LogoutMenu isSmallScreen={isSmallScreen} />
      </Box>
    </Box>
  );
};

export default Sidebar;
