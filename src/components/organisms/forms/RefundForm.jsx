import React, { useState } from "react";
import { useSnackbar } from "../../../context/SnackbarContext";
import { useDialog } from "../../../context/DialogContext";
import { useTheme } from "@mui/material/styles";
import { Button, TextField, Box, Typography, Stack, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import RefundApi from "../../../services/api/refund.service";
import {
  formatNumberAddThousandsSeparator as formatNumAddThousands,
  formatNumberDeleteThousandsSeparator as formatNumDeleteThousands,
  formatNumberWithMax as formatNumWithMax,
} from "../../../functions/format";
import {
  validateRefund,
  validateRefundItems,
} from "../../../services/validation/refundValidation";
import {
  isEmptyObject,
  isEmptyArrayWithObjects,
} from "../../../functions/helpers";

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "2vh",
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
}));

const RefundForm = ({
  mode = "create",
  data,
  closeForm,
  filterProps,
  fetchData,
  codes,
}) => {
  const theme = useTheme();

  const { showSnackbar } = useSnackbar();
  const { showDialog } = useDialog();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [itemErrors, setItemErrors] = useState([{}]);
  const [formData, setFormData] = useState({
    ids: data?.ids,
    codr: data?.codr ?? "",
    fecha: data?.fecha ?? new Date().toISOString().split("T")[0],
    desc: data?.desc ?? "",
    nota: data?.nota ?? "",
  });

  const [formDataItems, setFormDataItems] = useState(() => {
    const updatedDetails =
      data?.detalles?.map((detail) => {
        return {
          ...detail,
          citr: detail.citr || "",
        };
      });
    return updatedDetails;
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeItem = (index, e) => {
    setFormDataItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? {
              ...item,
              [e.target.name]: formatNumWithMax(e.target.value, item.cit),
            }
          : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      detalles: formDataItems.map((item) => ({
        idp: item.idp,
        citr: Number(item.citr),
      })),
    };

    const newErrors = validateRefund(submitData);
    const newItemErrors = validateRefundItems(submitData.detalles);

    if (Object.keys(newErrors).length > 0 || newItemErrors.length > 0) {
      setErrors(newErrors);
      setItemErrors(newItemErrors);
      return;
    }

    if (mode === "modify") {
      showDialog(
        "Modificar devolución",
        "¿Está seguro que desea modificar la devolución?",
        "Modificar",
        () => confirmModify(submitData)
      );
    } else {
      setLoading(true);
      try {
        const response = await RefundApi.createRefund(submitData);
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

  const handleValidateCode = (e) => {
    if (!codes) {
      return;
    }
    const { value } = e.target;
    if (codes.includes(value) && value !== data?.codr) {
      setErrors((prevErrors) => ({ ...prevErrors, codr: true }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, codr: false }));
    }
  };

  const handleClose = () => {
    console.log("formData", formData);
    console.log("formDataItems", formDataItems);

    mode === "modify" ||
    (isEmptyObject({
      codr: formData?.codr,
      nota: formData?.nota,
      desc: formData?.desc,
    }) &&
      isEmptyArrayWithObjects(formDataItems?.map((item) => item?.citr)))
      ? closeForm()
      : showDialog(
          "Descartar registro",
          "¿Está seguro que desea descartar el registro?",
          "Descartar",
          () => closeForm()
        );
  };

  const confirmModify = async (submitData) => {
    console.log(submitData);
    setLoading(true);
    try {
      const response = await RefundApi.updateRefund(data?.idr, submitData);
      await fetchData(filterProps);
      showSnackbar(response.message, "success");
      closeForm();
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          bgcolor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          zIndex: 1,
        }}
      />
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
          transform: "translate(-50%, -50%)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          overflow: "hidden",
          bgcolor: "#ffffff",
          border: "1.5px solid #266763",
          borderRadius: "1rem",
          overflowX: "hidden",
          overflowY: "auto",
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
            {mode === "modify"
              ? "Modificar devolución"
              : "Registrar devolución"}
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
            <Stack alignItems="center" width="65%" p={1}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <StyledTextField
                    label="Código de devolución"
                    name="codr"
                    value={formData.codr}
                    error={!!errors.codr}
                    onChange={(e) => {
                      handleChange(e);
                      handleValidateCode(e);
                    }}
                    sx={{ width: "100%" }}
                  />
                  <StyledTextField
                    label="Nota de crédito"
                    name="nota"
                    value={formData.nota}
                    error={!!errors.nota}
                    onChange={handleChange}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <StyledTextField
                    label="Código de venta"
                    value={data?.cod}
                    sx={{ width: "100%" }}
                    disabled
                  />
                  <StyledTextField
                    label="Fecha"
                    name="fecha"
                    type="date"
                    value={formData.fecha}
                    error={!!errors.fecha}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
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
                    fontWeight="bold"
                    sx={{ textAlign: "center", flex: 1 }}
                  >
                    Código del producto
                  </Typography>
                  <Typography
                    fontWeight="bold"
                    sx={{ textAlign: "center", flex: 1 }}
                  >
                    Cantidad total
                  </Typography>
                  <Typography
                    fontWeight="bold"
                    sx={{ textAlign: "center", flex: 1 }}
                  >
                    Cantidad a reembolsar
                  </Typography>
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
              {formDataItems.map((item, index) => (
                <StyledStack
                  paddingBottom=".5%"
                  alignItems="center"
                  justifyContent="center"
                  key={index}
                >
                  <Typography sx={{ textAlign: "center", flex: 1 }}>
                    {item.cod}
                  </Typography>
                  <Typography sx={{ textAlign: "center", flex: 1 }}>
                    {formatNumAddThousands(item.cit)}
                  </Typography>
                  <TextField
                    sx={{ display: "flex", flex: 1, alignItems: "center" }}
                    name="citr"
                    value={item.citr}
                    error={!!itemErrors[index]?.citr}
                    onChange={(e) => handleChangeItem(index, e)}
                    InputProps={{
                      sx: {
                        width: "60%",
                        height: "2.5vw",
                      },
                    }}
                  />
                </StyledStack>
              ))}
            </Box>

            <TextField
              label="Descripción"
              name="desc"
              value={formData.desc}
              multiline
              rows={3}
              variant="outlined"
              onChange={handleChange}
              sx={{ width: "90%" }}
              error={!!errors.desc}
            />

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
    </>
  );
};

export default RefundForm;
