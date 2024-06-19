import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Stack,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const Filters = () => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      width="100%"
      spacing={3}
      alignItems="center"
      sx={{
        bgcolor: theme.palette.background.default,
      }}
    >
      <Stack direction="column" flex={0.3}>
        <FormControl>
          <InputLabel id="categoria">Categoría</InputLabel>
          <Select
            labelId="categoria"
            defaultValue="all"
            label="Categoría"
            sx={{
              boxShadow: theme.shadows[3],
              height: "2.5rem",
              borderRadius: ".5rem",
              "& .MuiSvgIcon-root": {
                color: theme.palette.secondary.contrastText,
              },
            }}
          >
            <MenuItem value="all">Todas</MenuItem>
            <MenuItem value={10}>Mueble</MenuItem>
            <MenuItem value={20}>Eléctrico</MenuItem>
            <MenuItem value={30}>Electrónico</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack direction="column" flex={0.3}>
        <FormControl>
          <InputLabel id="ordenar">Ordenar por</InputLabel>
          <Select
            labelId="ordenar"
            defaultValue="recent"
            label="Ordenar por"
            sx={{
              boxShadow: theme.shadows[3],
              height: "2.5rem",
              borderRadius: ".5rem",
              "& .MuiSvgIcon-root": {
                color: theme.palette.secondary.contrastText,
              },
            }}
          >
            <MenuItem value="recent">Más recientes</MenuItem>
            <MenuItem value="oldest">Más antiguos</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack direction="column" flex={0.3}>
        <TextField
          label="Seleccionar fecha"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            sx: {
              boxShadow: theme.shadows[3],
              height: "2.5rem",
              borderRadius: ".5rem",
              "& .MuiSvgIcon-root": {
                color: theme.palette.secondary.contrastText,
              },
            },
          }}
        />
      </Stack>
      <Stack direction="column" flex={0.4}>
        <TextField
          label="Búsqueda"
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ color: theme.palette.secondary.contrastText }}
              >
                <Search />
              </InputAdornment>
            ),
            sx: {
              boxShadow: theme.shadows[3],
              height: "2.5rem",
              borderRadius: "1rem",
              bgcolor: theme.palette.grey[200],
              "& .MuiSvgIcon-root": {
                color: theme.palette.secondary.contrastText,
              },
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Filters;
