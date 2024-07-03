import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../context/SnackbarContext";
import { useTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Logout } from "@mui/icons-material";

const StyledButton = styled(Button)(({ theme }) => ({
  minHeight: "50px",
  width: "80%",
  minWidth: 0,
  fontSize: theme.typography.subtitle1.fontSize,
  color: theme.palette.primary.contrastText,
  textTransform: "none",
  marginBottom: ".5em",
  justifyContent: "flex-start",
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    borderRadius: "2rem",
  },
  "& .MuiSvgIcon-root": {
    width: "1.5vw",
    height: "auto",
  },
  borderRadius: "2rem",
}));

const LogoutMenu = ({ isSmallScreen }) => {
  const theme = useTheme();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    showSnackbar("Sesión cerrada", "success");
    navigate("/login");
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <StyledButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{ justifyContent: isSmallScreen ? "center" : "left" }}
      >
        <Box display="flex" alignItems="center">
          <Logout />
          {!isSmallScreen && <Box ml={1}>Cerrar sesión</Box>}
        </Box>
      </StyledButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{
                    bgcolor: theme.palette.primary.dark,
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark,
                    },
                  }}
                >
                  <MenuItem
                    sx={{
                      bgcolor: theme.palette.primary.dark,
                      "&:hover": {
                        bgcolor: theme.palette.primary.light,
                        color: theme.palette.grey[300],
                      },
                    }}
                    onClick={handleClose}
                  >
                    Cancelar
                  </MenuItem>
                  <MenuItem
                    sx={{
                      color: theme.palette.secondary.main,
                      bgcolor: theme.palette.primary.dark,
                      "&:hover": {
                        color: theme.palette.secondary.light,
                        bgcolor: theme.palette.primary.light,
                      },
                    }}
                    onClick={handleLogout}
                  >
                    Confirmar
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default LogoutMenu;
