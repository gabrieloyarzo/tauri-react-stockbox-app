import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { TabContext, TabList } from "@mui/lab";
import { Box, CardMedia, Typography, Tab, Button, Stack } from "@mui/material";
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
import { useUser } from "../../context/UserContext";
import LogoutMenu from "../molecules/LogoutMenu";

const StyledTab = styled(Tab)(({ theme }) => ({
  height: "2vw",
  maxWidth: "100%",
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
  const { user } = useUser();
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
    <>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          bgcolor: theme.palette.primary.main,
          borderRadius: "2em",
        }}
      >
        <Box width="85%" display="flex" flexDirection="column">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingTop=".75em"
            paddingBottom=".75em"
          >
            <CardMedia
              component="img"
              alt="StockBox"
              image="/src/images/logo_2.png"
              style={{
                display: "flex",
                flex: 0.25,
                width: "4vw",
                height: "4vw",
                borderRadius: "50%",
              }}
            />
            {!isSmallScreen && (
              <Box
                display="flex"
                flex={0.75}
                flexDirection="column"
                paddingLeft=".5em"
              >
                <Typography variant="h5" color="primary.contrastText">
                  StockBox
                </Typography>
                <Typography
                  variant="h6"
                  color="primary.contrastText"
                  sx={{ width: "65%", textAlign: "center" }}
                >
                  Menú
                </Typography>
              </Box>
            )}
          </Box>

          <TabContext value={value}>
            <Box
              display="flex"
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
                  width: "100%",
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
                  "& .MuiTabs-indicator": {
                    display: "none",
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
                {user?.rol === "ADMIN" && (
                  <StyledTab
                    value="users"
                    label={!isSmallScreen && "Usuarios"}
                    icon={<PersonSearch />}
                    iconPosition="start"
                  />
                )}
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
        <Box display="flex" flexGrow={1}></Box>
        <Box
          width="85%"
          display="flex"
          justifyContent={isSmallScreen ? "center" : "center"}
        >
          <LogoutMenu isSmallScreen={isSmallScreen} />
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
