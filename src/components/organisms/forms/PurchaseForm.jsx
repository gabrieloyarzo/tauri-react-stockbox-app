import React, { useState, useContext } from "react";
import { useVariables } from "../../../context/VariablesContext";
import { FilterContext } from "../../../context/FilterContext";
import { useSnackbar } from "../../../context/SnackbarContext";
import { useDialog } from "../../../context/DialogContext";
import { useUser } from "../../../context/UserContext";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Stack,
  Autocomplete,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import {
  validatePurchase,
  validatePurchaseItems,
} from "../../../services/validation/purchaseValidation";
import {
  isEmptyObject,
  isEmptyArrayWithObjects,
} from "../../../functions/helpers";
import PurchaseApi from "../../../services/api/purchase.service";
import ProviderForm from "./ProviderForm";
import { formatRut } from "../../../functions/formatRut";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "2vh",
  width: "100%",
  "& .MuiInputBase-input": {
    height: "1rem",
  },
}));

const ItemTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    height: ".25em",
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
}));

const PurchaseForm = ({
  mode,
  fetchData,
  closeForm,
  initialData,
  products,
  codes,
}) => {
  const theme = useTheme();
  const { providers } = useVariables();
  const { showSnackbar } = useSnackbar();
  const { showDialog } = useDialog();
  const { filterProps } = useContext(FilterContext);
  const { user } = useUser();

  const [openProvider, setOpenProvider] = useState(false);

  const initialRow = {
    idp: "",
    cit: "",
    precio: "",
    suma: "0",
    cod: "",
  };

  const [formData, setFormData] = useState(
    initialData
      ? {
          ...initialData,
          detalles: initialData.detalles.length
            ? initialData.detalles
            : [initialRow],
        }
      : {
          cod: "",
          rutp: "",
          rutu: user?.rut,
          fecha: new Date().toISOString().split("T")[0],
          total: "",
          detalles: [initialRow],
        }
  );

  const [loading, setLoading] = useState(false);
  const [purchaseItems, setPurchaseItems] = useState(formData.detalles);
  const [errors, setErrors] = useState({});
  const [itemErrors, setItemErrors] = useState([{}]);

  const handleChange = (e) => {
    if (e.target.name === "rutp") {
      setFormData({
        ...formData,
        [e.target.name]: formatRut(e.target.value),
      });
      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidateCode = (e) => {
    const { value } = e.target;
    if (codes.includes(value) && value !== initialData?.cod) {
      setErrors((prevErrors) => ({ ...prevErrors, cod: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, cod: false }));
    }
  };

  const handleChangeItem = (index, e) => {
    const { name, value } = e.target;

    setPurchaseItems((prevItems) =>
      prevItems.map((row, i) =>
        i === index
          ? {
              ...row,
              [name]: value,
              suma:
                name === "cit" || name === "precio"
                  ? name === "cit"
                    ? !isNaN(value) && value.trim() !== ""
                      ? parseInt(value) * row.precio
                      : 0
                    : name === "precio"
                    ? !isNaN(value) && value.trim() !== ""
                      ? parseInt(value) * row.cit
                      : 0
                    : 0
                  : row.suma,
            }
          : row
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      JSON.stringify({ ...formData, detalles: purchaseItems }) ===
      JSON.stringify(initialData)
    ) {
      return;
    }

    const newErrors = validatePurchase(formData);
    const newItemErrors = validatePurchaseItems(purchaseItems);

    if (Object.keys(newErrors).length > 0 || newItemErrors.length > 0) {
      setErrors(newErrors);
      setItemErrors(newItemErrors);
      return;
    }

    const submitData = {
      ...formData,
      total: total,
      detalles: purchaseItems.map(({ cod, ...item }) => {
        const newItem = {};

        Object.keys(item).forEach((key) => {
          if (key === "cit" || key === "precio" || key === "total") {
            newItem[key] = parseInt(item[key]);
          } else {
            newItem[key] =
              typeof item[key] === "string" ? item[key].trim() : item[key];
          }
        });

        return newItem;
      }),
    };

    if (mode === "modify") {
      showDialog(
        "Modificar compra",
        "¿Está seguro que desea modificar la compra?",
        "Modificar",
        () => confirmModify(submitData)
      );
    } else {
      setLoading(true);
      try {
        const response = await PurchaseApi.createPurchase(submitData);
        await fetchData(filterProps);
        showSnackbar(response.message, "success");
        closeForm();
      } catch (error) {
        showSnackbar(error.response.data.message, "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    mode === "modify" ||
    (isEmptyObject(
      Object.keys(formData)
        .filter((key) => {
          if (
            key.includes("fecha") &&
            formData[key] === new Date().toISOString().split("T")[0]
          ) {
            return false;
          }
          return (
            key.includes("cod") || key.includes("rutp") || key.includes("fecha")
          );
        })
        .reduce((obj, key) => {
          obj[key] = formData[key];
          return obj;
        }, {})
    ) &&
      isEmptyArrayWithObjects(purchaseItems.map(({ suma, ...rest }) => rest)))
      ? closeForm()
      : showDialog(
          "Descartar registro",
          "¿Está seguro que desea descartar el registro?",
          "Descartar",
          () => closeForm()
        );
  };

  const confirmModify = async (submitData) => {
    try {
      const response = await PurchaseApi.updatePurchase(
        initialData.idpu,
        submitData
      );
      await fetchData(filterProps);
      showSnackbar(response.message, "success");
      closeForm();
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    }
  };

  const addPurchaseItem = () => {
    setPurchaseItems([...purchaseItems, { ...initialRow }]);
  };

  const removePurchaseItem = (index) => {
    if (purchaseItems.length > 1) {
      setPurchaseItems((prevItems) => prevItems.filter((_, i) => i !== index));
    }
  };

  const total = purchaseItems.reduce(
    (acc, item) => acc + item.cit * item.precio,
    0
  );

  const filterOptions = (options, state) => {
    const existingCodes = purchaseItems.map((item) => item.cod.toLowerCase());
    const filteredOptions = options.filter(
      (option) =>
        option.cod.toLowerCase().includes(state.inputValue.toLowerCase()) &&
        !existingCodes.includes(option.cod.toLowerCase())
    );
    return filteredOptions.slice(0, 10);
  };

  if (user?.rut === "") {
    console.log("no rut:", user);
    return null;
  }

  return (
    <>
      <Box
        sx={{
          zIndex: 1,
          position: "absolute",
          width: "50vw",
          minWidth: "440px",
          maxHeight: "90vh",
          top: "50%",
          left: "50%",
          display: "flex",
          transform: "translate(-29.5%, -50%)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          bgcolor: "#ffffff",
          border: "1.5px solid #266763",
          borderRadius: "1rem",
        }}
      >
        <Box
          sx={{
            bgcolor: theme.palette.primary.main,
            width: "100%",
            p: 1,
            mb: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#ffffff", fontWeight: "bold" }}
          >
            {mode === "modify" ? "Modificar compra" : "Registrar compra"}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Stack alignItems="center" width="30%" p={1}>
              <StyledTextField
                label="Código"
                name="cod"
                value={formData.cod}
                error={!!errors.cod}
                onChange={(e) => {
                  handleChange(e);
                  handleValidateCode(e);
                }}
              />

              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Autocomplete
                  sx={{
                    display: "flex",
                    flex: 1,
                    width: "100%",
                    "& .MuiSvgIcon-root": {
                      color: theme.palette.secondary.contrastText,
                    },
                  }}
                  options={providers}
                  name="rutp"
                  value={
                    providers.find(
                      (provider) => provider.rutp === formData.rutp
                    ) || null
                  }
                  getOptionLabel={(option) => option.rutp}
                  noOptionsText="Sin opciones"
                  onChange={(event, newValue) =>
                    handleChange({
                      target: {
                        name: "rutp",
                        value: newValue ? newValue.rutp : "",
                      },
                    })
                  }
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <div>
                        <Typography fontSize="14px">{option.rutp}</Typography>
                        <Typography fontSize="12px" color="textSecondary">
                          {option.nombre}
                        </Typography>
                      </div>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      label="RUT de proveedor"
                      error={!!errors.rutp}
                      InputProps={{
                        ...params.InputProps,
                        sx: { width: "100%" },
                      }}
                    />
                  )}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    display: "flex",
                    top: "1.5vw",
                    right: "-2.25vw",
                    transform: "translateY(-50%)",
                    borderRadius: ".25em",
                    bgcolor: theme.palette.grey[200],
                    color: theme.palette.grey[500],
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.contrastText,
                    },
                  }}
                  onClick={() => setOpenProvider(true)}
                >
                  <Tooltip
                    title="Agregar proveedor"
                    placement="bottom"
                    arrow
                    enterDelay={500}
                  >
                    <AddIcon />
                  </Tooltip>
                </IconButton>
              </Box>

              <StyledTextField
                label="Fecha"
                name="fecha"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.fecha}
                error={!!errors.fecha}
                onChange={handleChange}
              />
            </Stack>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: theme.palette.background.paper,
                width: "100%",
                padding: "10px 0 10px 0",
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
                marginBottom: "15px",
              }}
            >
              <Box sx={{ display: "flex", width: "90%" }}>
                <StyledStack>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ textAlign: "center", flex: 1 }}
                  >
                    Código del producto
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ textAlign: "center", flex: 1 }}
                  >
                    Cantidad
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ textAlign: "center", flex: 1 }}
                  >
                    Precio c/u
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{ textAlign: "right", flex: 1 }}
                  >
                    Total
                  </Typography>
                  <Box sx={{ flex: 0.3 }}></Box>
                </StyledStack>
              </Box>
            </Box>

            <Box
              sx={{
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                width: "90%",
                minHeight: "220px",
                maxHeight: "220px",
              }}
            >
              {purchaseItems.map((row, index) => (
                <StyledStack paddingBottom=".5%">
                  <Autocomplete
                    sx={{
                      display: "flex",
                      flex: 1,
                      "& .MuiSvgIcon-root": {
                        color: theme.palette.secondary.contrastText,
                      },
                    }}
                    options={products}
                    filterOptions={filterOptions}
                    name="cod"
                    value={
                      products.find((product) => product.cod === row.cod) ||
                      null
                    }
                    getOptionLabel={(option) => option.cod}
                    noOptionsText="Sin opciones"
                    onChange={(event, newValue) => {
                      handleChangeItem(index, {
                        target: {
                          name: "cod",
                          value: newValue ? newValue.cod : "",
                        },
                      });
                      handleChangeItem(index, {
                        target: {
                          name: "idp",
                          value: newValue ? newValue.idp : "",
                        },
                      });
                    }}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <div key={option.idp}>
                          <Typography fontSize="14px">{option.cod}</Typography>
                          <Typography fontSize="12px" color="textSecondary">
                            {option.nombre}
                          </Typography>
                        </div>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <ItemTextField
                        {...params}
                        error={!!itemErrors[index]?.cod}
                        InputProps={{
                          ...params.InputProps,
                          sx: { width: "100%" },
                        }}
                      />
                    )}
                  />

                  <ItemTextField
                    name="cit"
                    value={row.cit}
                    onChange={(e) => handleChangeItem(index, e)}
                    type="number"
                    error={!!itemErrors[index]?.cit}
                    sx={{ alignItems: "center", flex: 1 }}
                    InputProps={{
                      sx: {
                        width: "60%",
                      },
                    }}
                  />

                  <StyledStack sx={{ textAlign: "center", flex: 1 }}>
                    <Typography variant="body1" margin="5%">
                      x
                    </Typography>
                    <ItemTextField
                      name="precio"
                      value={row.precio}
                      onChange={(e) => handleChangeItem(index, e)}
                      type="number"
                      error={!!itemErrors[index]?.precio}
                      sx={{ alignItems: "left" }}
                      InputProps={{
                        sx: {
                          width: "80%",
                        },
                      }}
                    />
                  </StyledStack>

                  <Typography
                    variant="body2"
                    sx={{ textAlign: "right", flex: 1 }}
                  >
                    {`$ ${row.suma}`}
                  </Typography>

                  <Box sx={{ flex: 0.3, marginLeft: 1 }}>
                    <IconButton
                      onClick={() => removePurchaseItem(index)}
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1,
                        color: "secondary.contrastText",
                        "&:hover": {
                          backgroundColor: theme.palette.secondary.main,
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </StyledStack>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "90%",
                borderTop: "2px solid lightgrey",
              }}
            >
              <Box
                display="flex"
                width="100%"
                flexDirection="row"
                paddingTop="2%"
              >
                <Button
                  variant="contained"
                  onClick={addPurchaseItem}
                  sx={{
                    backgroundColor: "#266763",
                    color: "#ffffff",
                    fontSize: "0.8rem",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#c3fa7b",
                      color: "#7e7e7e",
                    },
                    alignSelf: "flex-start",
                  }}
                  disableElevation
                >
                  Añadir
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "flex-end",
                    width: "20%",
                  }}
                >
                  <Typography variant="body1">{`$ ${total}`}</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 2,
                padding: "3%",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                endIcon={<CloseIcon />}
                sx={{
                  backgroundColor: "#266763",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                  width: "150px",
                  "&:hover": {
                    backgroundColor: "#c3fa7b",
                    color: "#7e7e7e",
                  },
                }}
                onClick={handleClose}
              >
                Cerrar
              </Button>
              <LoadingButton
                variant="contained"
                loading={loading}
                loadingPosition="end"
                endIcon={<SaveIcon />}
                sx={{
                  backgroundColor: "#266763",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                  width: "150px",
                  "&:hover": {
                    backgroundColor: "#c3fa7b",
                    color: "#7e7e7e",
                  },
                }}
                type="submit"
              >
                {mode === "modify" ? "Modificar" : "Guardar"}
              </LoadingButton>
            </Box>
          </Box>
        </form>
      </Box>
      {openProvider && (
        <ProviderForm
          mode={"create"}
          fetchData={(arg) => {}}
          closeForm={() => setOpenProvider(false)}
          initialData={formData.rutp}
        />
      )}
    </>
  );
};

export default PurchaseForm;
