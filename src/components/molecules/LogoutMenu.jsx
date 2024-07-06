import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../context/SnackbarContext";
import { useTheme, styled } from "@mui/material/styles";
import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Logout, CheckCircle, Cancel } from "@mui/icons-material";

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

  // Calculate relative offset
  const relativeOffset = anchorRef.current
    ? anchorRef.current.getBoundingClientRect().width * 0.1 // 10% of the anchor width
    : 0;

  return (
    <>
      <StyledButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{ justifyContent: isSmallScreen ? "center" : "left", width: "85%" }}
      >
        <Box display="flex" alignItems="center">
          <Logout />
          {!isSmallScreen && <Box ml={".25em"}>Cerrar sesión</Box>}
        </Box>
      </StyledButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement={isSmallScreen ? "right-start" : "bottom-start"}
        transition
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: !isSmallScreen && [relativeOffset, 0],
            },
          },
        ]}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start"
                  ? "left top"
                  : placement === "right-start"
                  ? "left top"
                  : "left bottom",
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
                      color: theme.palette.common.white,
                      bgcolor: theme.palette.primary.dark,
                      "&:hover": {
                        color: theme.palette.common.white,
                        bgcolor: theme.palette.primary.light,
                      },
                    }}
                    onClick={handleLogout}
                  >
                    <ListItemIcon>
                      <CheckCircle sx={{ color: theme.palette.success.main }} />
                    </ListItemIcon>
                    <ListItemText>Confirmar</ListItemText>
                  </MenuItem>
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
                    <ListItemIcon>
                      <Cancel sx={{ color: theme.palette.error.main }} />
                    </ListItemIcon>
                    <ListItemText>Cancelar</ListItemText>
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
