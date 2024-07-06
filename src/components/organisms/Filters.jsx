import React, { useState, useEffect } from "react";
import { useTable } from "../../context/TableContext";
import { useTheme } from "@mui/material/styles";
import { usePropsChanged } from "../../hooks/usePropsChanged";
import {
  Stack,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Search } from "@mui/icons-material";
import { adapter } from "../../core/adapter";
import { invAdapterType } from "../../core/invAdapterType";
import { isRutField } from "../../core/typeFields";
import { formatRut } from "../../core/format";

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
  defaultFilterProps,
}) => {
  const theme = useTheme();
  const { currentTable, isLoading } = useTable();

  const { isChanged } = usePropsChanged({
    currentProps: filterProps,
    initialProps: defaultFilterProps,
  });

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

  const handleChangeCategory = (e) => {
    const category = e.target.value;
    setCategory(category);
    setFilterProps((prevProps) => ({
      ...prevProps,
      dato: category,
    }));
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
    const search = isRutField(category)
      ? formatRut(e.target.value)
      : e.target.value;
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
        texto,
        number,
      }));
    }, 500);

    setTimeoutId(newTimeoutId);
  };

  const handleClearFilters = () => {
    setFilterProps({});
    setBusqueda("");
  };

  return (
    <Stack spacing="calc(.5vw + .5vh)">
      <Stack
        direction="row"
      >
        {isChanged && (
          <Button
            variant="contained"
            startIcon={<CloseIcon />}
            sx={{
              borderRadius: ".25rem",
              fontSize: "calc(.5vw + .5vh)",
              bgcolor: theme.palette.grey[200],
              color: theme.palette.grey[700],
              boxShadow: theme.shadows[3],
              textTransform: "none",
              ".MuiButton-icon": {
                width: "calc(1vw + 1vh)",
                height: "auto",
                margin: 0,
              },
              ".MuiButton-startIcon": {
                ".MuiSvgIcon-root": {
                  width: "calc(.75vw + .75vh)",
                  height: "auto",
                },
              },
              "&:hover": {
                bgcolor: theme.palette.grey[300],
                color: theme.palette.grey[900],
              },
            }}
            onClick={handleClearFilters}
          >
            VACIAR FILTROS
          </Button>
        )}
      </Stack>

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
              value={category}
              label="Categoría"
              onChange={handleChangeCategory}
              disabled={isLoading}
              sx={{
                boxShadow: theme.shadows[3],
                // height: "5vh",
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
            inputProps={{
              maxLength: isRutField(category) && 12,
            }}
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
    </Stack>
  );
};

export default Filters;
