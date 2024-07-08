import React, { useState, useEffect } from "react";
import { useTable } from "../../context/TableContext";
import { useTheme, styled } from "@mui/material/styles";
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
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Search } from "@mui/icons-material";
import { adapter } from "../../functions/adapter";
import { invAdapterType } from "../../functions/invAdapterType";
import { isNumberField, isRutField } from "../../functions/typeFields";
import { formatRut } from "../../functions/format";
import { formatNumber } from "../../functions/format";

const StyledSelect = styled(Select)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  height: "2.5rem",
  fontSize: "calc(.6vw + .6vh)",
  borderRadius: ".5rem",
  "& .MuiSvgIcon-root": {
    color: theme.palette.secondary.contrastText,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    boxShadow: theme.shadows[3],
    height: "2.5rem",
    borderRadius: ".5rem",
    fontSize: "calc(.6vw + .6vh)",
    bgcolor: theme.palette.grey[200],
    "& .MuiSvgIcon-root": {
      color: theme.palette.secondary.contrastText,
    },
  },
}));

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
  const [timeoutId, setTimeoutId] = useState(null);

  // Filters
  const [valor, setValor] = useState(filterProps?.valor ?? "");
  const [desde, setDesde] = useState(
    filterProps?.desde ?? null
  );
  const [hasta, setHasta] = useState(
    filterProps?.hasta ?? null
  );
  const [category, setCategory] = useState(filterProps?.dato ?? "");
  const [orden, setOrden] = useState(filterProps?.orden ?? "desc");
  const [intervalo, setIntervalo] = useState(filterProps?.intervalo ?? "igual");

  const { isChanged } = usePropsChanged({ obj: filterProps }); 

  const handleChangeCategory = (e) => {
    const dato = e.target.value;
    setCategory(dato);
    setFilterProps((prevProps) => ({
      ...prevProps,
      offset: 0,
      dato,
    }));
  };

  const handleChangeOrden = (e) => {
    const orden = e.target.value;
    setOrden(orden);
    setFilterProps((prevProps) => ({
      ...prevProps,
      offset: 0,
      orden,
    }));
  };

  const handleChangeDesde = (e) => {
    const desde = e.target.value;
    setDesde(desde);
    setFilterProps((prevProps) => ({
      ...prevProps,
      offset: 0,
      desde,
    }));
  };

  const handleChangeHasta = (e) => {
    const hasta = e.target.value;
    setHasta(hasta);
    setFilterProps((prevProps) => ({
      ...prevProps,
      offset: 0,
      hasta,
    }));
  };

  const handleChangeIntervalo = (e) => {
    const intervalo = e.target.value;
    setIntervalo(intervalo);
    setFilterProps((prevProps) => ({
      ...prevProps,
      offset: 0,
      intervalo,
    }));
  };

  const handleSearchChange = (e) => {
    const valor = isRutField(category)
      ? formatRut(e.target.value)
      : isNumberField(category)
      ? formatNumber(e.target.value)
      : e.target.value;

    setValor(valor);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setFilterProps((prevProps) => ({
        ...prevProps,
        offset: 0,
        dato: category,
        valor,
      }));
    }, 500);

    setTimeoutId(newTimeoutId);
  };

  const handleClearFilters = () => {
    const valor = "", desde = "", hasta = "";
    setValor(valor);
    setDesde(desde);
    setHasta(hasta);
    setFilterProps((prevProps) => ({
      ...prevProps,
      offset: 0,
      valor,
      desde,
      hasta,
    }));
  };

  return (
    // VACIAR FILTROS
    <Stack spacing="calc(.5vw + .5vh)">
      <Stack height="3vh" direction="row">
        {isChanged && (
          <Button
            variant="contained"
            startIcon={<CloseIcon />}
            sx={{
              borderRadius: ".25rem",
              fontSize: "calc(.5vw + .5vh)",
              bgcolor: theme.palette.grey[200],
              color: theme.palette.grey[700],
              boxShadow: theme.shadows[1],
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
                boxShadow: theme.shadows[1],
              },
            }}
            onClick={handleClearFilters}
            disabled={isLoading}
          >
            VACIAR FILTROS
          </Button>
        )}
      </Stack>

      {/* Filtros */}
      <Grid container direction="row" width="100%" alignItems="center">
        {/* Categoría */}
        <Grid item xs={2}>
          <Stack direction="column" width="90%">
            <FormControl>
              <InputLabel id="categoria">Categoría</InputLabel>
              <StyledSelect
                labelId="categoria"
                value={category}
                label="Categoría"
                onChange={(e) => setCategory(e.target.value)}
                disabled={isLoading}
              >
                {filterStrings.map((item) => (
                  <MenuItem key={item} value={adapter(item, currentTable)}>
                    {item}
                  </MenuItem>
                ))}
                {filterNumbers.map((item) => (
                  <MenuItem key={item} value={adapter(item, currentTable)}>
                    {item}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Stack>
        </Grid>

        {/* Ordenar por */}
        <Grid item xs={1.75}>
          <Stack direction="column" width="90%">
            <FormControl>
              <InputLabel id="ordenar">Ordenar por</InputLabel>
              <StyledSelect
                labelId="ordenar"
                value={orden}
                label="Ordenar por"
                disabled={isLoading}
                onChange={handleChangeOrden}
              >
                <MenuItem value="desc">Más recientes</MenuItem>
                <MenuItem value="asc">Más antiguos</MenuItem>
              </StyledSelect>
            </FormControl>
          </Stack>
        </Grid>

        {/* Desde, hasta */}
        <Grid item xs={3.5}>
          <Stack direction="row" width="90%">
            {isDateTable(currentTable) && (
              <Stack direction="row" width="100%" alignItems={"center"}>
                <StyledTextField
                  label="Desde"
                  type="date"
                  value={desde}
                  onChange={handleChangeDesde}
                  disabled={isLoading}
                  InputLabelProps={{
                    shrink: true,
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
                <StyledTextField
                  label="Hasta"
                  type="date"
                  value={hasta}
                  onChange={handleChangeHasta}
                  disabled={isLoading}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
            )}
          </Stack>
        </Grid>

        <Grid item xs={4.75}>
          <Stack direction="row" width="100%" spacing={1}>
            {/* Mayor a, menor a */}
            <Stack direction="column" width="25%">
              {invAdapterType(category, currentTable) === "number" && (
                <StyledSelect value={intervalo} disabled={isLoading} onChange={handleChangeIntervalo}>
                  <MenuItem value="mayor">Mayor a</MenuItem>
                  <MenuItem value="igual">Igual a</MenuItem>
                  <MenuItem value="menor">Menor a</MenuItem>
                </StyledSelect>
              )}
            </Stack>

            {/* Búsqueda */}
            <Stack direction="column" width="100%">
              <TextField
                label="Búsqueda"
                placeholder="Buscar..."
                value={valor}
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
                    fontSize: "calc(.6vw + .6vh)",
                    boxShadow: theme.shadows[3],
                    height: "2.5rem",
                    bgcolor: theme.palette.grey[200],
                    borderRadius: ".5rem",
                  },
                }}
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Filters;
