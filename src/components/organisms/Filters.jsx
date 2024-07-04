import React, { useState } from "react";
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
import { adapter } from "../../functions/adapter";
import { invAdapterType } from "../../functions/invAdapterType";

const isDateTable = (currentTable) => {
  return (
    currentTable === "purchases" ||
    currentTable === "sales" ||
    currentTable === "refunds"
  );
};

const Filters = ({
  filterProps,
  setFilterProps,
  filterStrings,
  filterNumbers,
}) => {
  const theme = useTheme();
  const { currentTable, isLoading } = useTable();

  const search =
    filterProps?.texto !== "" ||
    filterProps?.texto !== null ||
    filterProps?.texto !== undefined
      ? filterProps?.texto
      : filterProps?.number !== "" ||
        filterProps?.number !== null ||
        filterProps?.number !== undefined
      ? filterProps?.number
      : "";

  const [desde, setDesde] = useState(filterProps?.desde ?? new Date());
  const [hasta, setHasta] = useState(filterProps?.hasta ?? new Date());
  const [busqueda, setBusqueda] = useState(search);
  const [timeoutId, setTimeoutId] = useState(null);
  const [category, setCategory] = useState(filterProps?.dato);

  console.log(filterProps?.dato);

  const handleChangeCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
  };

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

    let number = "";
    let texto = "";

    if (invAdapterType(category, currentTable) === "number") {
      number = search;
    } else {
      texto = search;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setFilterProps((prevProps) => ({
        ...prevProps,
        dato: category,
        texto,
        number,
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
            defaultValue={category}
            label="Categoría"
            onChange={handleChangeCategory}
            disabled={isLoading}
            sx={{
              boxShadow: theme.shadows[3],
              height: "2.5rem",
              borderRadius: ".5rem",
              "& .MuiSvgIcon-root": {
                color: theme.palette.secondary.contrastText,
              },
            }}
          >
            {filterStrings.map((item) => (
              <MenuItem value={adapter(item, currentTable)}>{item}</MenuItem>
            ))}
            {filterNumbers.map((item) => (
              <MenuItem value={adapter(item, currentTable)}>{item}</MenuItem>
            ))}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
