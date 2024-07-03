import React, { useState } from "react";
import { useFilter } from "../../context/FilterContext";
import { useTable } from "../../context/TableContext";
import { useTheme } from "@mui/material/styles";
import {
  Stack,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const isDateTable = (currentTable) => {
  return (
    currentTable === "purchases" ||
    currentTable === "sales" ||
    currentTable === "refunds"
  );
};

const Filters = () => {
  const theme = useTheme();
  const { setFilterProps } = useFilter();
  const { currentTable } = useTable();

  const [desde, setDesde] = useState(new Date());
  const [hasta, setHasta] = useState(new Date());
  const [busqueda, setBusqueda] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  const handleChangeDesde = (e) => {
    const date = e.target.value;
    setDesde(date);
    setFilterProps((prevProps) => ({
      ...prevProps,
      desde: date,
    }));
  };

  const handleChangeHasta = (e) => {
    const date = e.target.value;
    setHasta(date);
    setFilterProps((prevProps) => ({
      ...prevProps,
      hasta: date,
    }));
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setBusqueda(search);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setFilterProps((prevProps) => ({
        ...prevProps,
        texto: search,
      }));
    }, 500);

    setTimeoutId(newTimeoutId);
  };

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
      <Stack direction="column" flex={1}>
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
      <Stack direction="column" flex={1}>
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

      {isDateTable(currentTable) && (
        <Stack direction="row" flex={1} alignItems={"center"}>
          <TextField
            label="Desde"
            type="date"
            value={desde}
            onChange={handleChangeDesde}
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
          <Typography
            variant="body2"
            paddingLeft=".5em"
            paddingRight=".5em"
            sx={{ color: theme.palette.secondary.contrastText }}
          >
            -
          </Typography>
          <TextField
            label="Hasta"
            type="date"
            value={hasta}
            onChange={handleChangeHasta}
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
      )}
      {/* Búsqueda */}
      <Stack direction="column" flex={1.5}>
        <TextField
          label="Búsqueda"
          placeholder="Buscar..."
          value={busqueda}
          onChange={handleSearchChange}
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
              fontSize: "1vw",
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
