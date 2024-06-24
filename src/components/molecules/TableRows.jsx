import React, { useState } from "react";
import { useTheme } from "@mui/material";
import {
  IconButton,
  Tooltip,
  CircularProgress,
  Box,
  TableBody,
  TableCell,
  TableRow,
  Switch,
} from "@mui/material";
import CustomSwitch from "../atoms/custom-ui/Android12Switch";
import { auxDelete } from "../../functions/auxDelete";
import { auxUpdate } from "../../functions/auxUpdate";
import { formatNumber } from "../../functions/helpers";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RenderModal from "../../functions/renderModal";
import DeleteDialog from "../atoms/custom-ui/dialogs/DeleteDialog";
import CustomSnackbar from "../atoms/custom-ui/snackbars/CustomSnackbar";

const isDetailTable = (currentTable) => {
  return (
    currentTable === "sales" ||
    currentTable === "refunds" ||
    currentTable === "purchases"
  );
};

const isIdTable = (currentTable) => {
  return (
    currentTable === "sales" ||
    currentTable === "refunds" ||
    currentTable === "purchases" ||
    currentTable === "products"
  );
};

const TableRows = ({
  currentTable,
  data,
  columns,
  filterProps,
  fetchData,
  toggleForm,
  setFormProps,
  loadingState,
  setLoadingState,
}) => {
  const theme = useTheme();

  // index key which would contain the array of details if it exists
  const dIndexKey =
    isDetailTable(currentTable) && data.length > 0
      ? Object.keys(data[0]).length - 1
      : null;

  // Delete Dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  // Delete Snackbar
  const [snackProps, setSnackProps] = useState({});

  // Detail Modal
  const [activeModal, setActiveModal] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const handleDetails = (details) => {
    setModalProps({
      data: details,
      closeModal: () => setActiveModal(false),
    });
    setActiveModal(true);
  };

  const handleEdit = (obj) => {
    setFormProps({
      mode: "modify",
      fetchData: fetchData,
      initialData: obj,
    });
    toggleForm();
  };

  const handleDelete = (id) => {
    setIdToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleSwitchChange = async (event, id) => {
    setLoadingState(true);
    try {
      const response = await auxUpdate(currentTable, id, {
        [event.target.name]: event.target.value,
      });
      await fetchData(filterProps);
      setSnackProps({
        open: true,
        closeSnack: handleCloseSnack,
        message: response.message,
        severity: "success",
      });
    } catch (error) {
      setSnackProps({
        open: true,
        message: error.response.data.message,
        closeSnack: handleCloseSnack,
        severity: "error",
      });
    }
    finally {
      setLoadingState(false);
    }
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackProps((prevProps) => ({
      ...prevProps,
      open: false,
    }));
  };

  const confirmDelete = async (id) => {
    setLoading(true);

    try {
      const response = await auxDelete({ currentTable, id });
      await fetchData(filterProps);

      setSnackProps({
        open: true,
        closeSnack: handleCloseSnack,
        message: response.message,
        severity: "success",
      });
    } catch (error) {
      setSnackProps({
        open: true,
        message: error.response.data.message,
        closeSnack: handleCloseSnack,
        severity: "error",
      });
    }
    setLoading(false);

    setOpenDeleteDialog(false);
  };

  return (
    <>
      <TableBody
        sx={{
          position: "relative",
          backgroundColor: loadingState
            ? theme.palette.background.paper
            : theme.palette.background.default,
          opacity: loadingState ? 0.5 : 1,
        }}
      >
        {loadingState && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "95%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {data.map((obj, index) => (
          <TableRow key={index}>
            {isIdTable(currentTable)
              ? columns.map(
                  (column, index) =>
                    index !== 0 &&
                    !Array.isArray(obj[column]) &&
                    (typeof obj[column] === "number" ? (
                      <TableCell key={index} sx={{ textAlign: "right" }}>
                        {formatNumber(obj[column])}
                      </TableCell>
                    ) : (
                      <TableCell key={index}>{obj[column]}</TableCell>
                    ))
                )
              : columns.map(
                  (column, index) =>
                    !Array.isArray(obj[column]) &&
                    (typeof obj[column] === "boolean" ? (
                      <TableCell key={index} sx={{ textAlign: "center" }}>
                        <CustomSwitch
                          checked={obj[column]}
                          onChange={(event, newValue) =>
                            handleSwitchChange(
                              {
                                target: {
                                  name: column,
                                  value: newValue,
                                },
                              },
                              obj[columns[0]]
                            )
                          }
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </TableCell>
                    ) : typeof obj[column] === "number" ? (
                      <TableCell key={index} sx={{ textAlign: "right" }}>
                        {formatNumber(obj[column])}
                      </TableCell>
                    ) : (
                      <TableCell key={index}>{obj[column]}</TableCell>
                    ))
                )}
            <TableCell key="options" sx={{ textAlign: "center" }}>
              <div>
                {dIndexKey && (
                  <IconButton
                    onClick={() => handleDetails(obj)}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      color: "secondary.contrastText",
                      "&:hover": {
                        backgroundColor: "#C3FA7B",
                      },
                    }}
                  >
                    <Tooltip
                      title="Ver detalles"
                      placement="bottom"
                      arrow
                      enterDelay={500}
                    >
                      <VisibilityIcon />
                    </Tooltip>
                  </IconButton>
                )}
                <IconButton
                  onClick={() => handleEdit(obj)}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    color: "secondary.contrastText",
                    "&:hover": {
                      backgroundColor: "#C3FA7B",
                    },
                  }}
                >
                  <Tooltip
                    title="Editar"
                    placement="bottom"
                    arrow
                    enterDelay={500}
                  >
                    <EditIcon />
                  </Tooltip>
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(obj[columns[0]])}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    color: "secondary.contrastText",
                    "&:hover": {
                      backgroundColor: "#C3FA7B",
                    },
                  }}
                >
                  <Tooltip
                    title="Borrar"
                    placement="bottom"
                    arrow
                    enterDelay={500}
                  >
                    <DeleteIcon />
                  </Tooltip>
                </IconButton>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {activeModal && (
        <RenderModal currentTable={currentTable} modalProps={modalProps} />
      )}
      <DeleteDialog
        currentTable={currentTable}
        loading={loading}
        open={openDeleteDialog}
        closeDialog={() => setOpenDeleteDialog(false)}
        id={idToDelete}
        confirmAction={() => confirmDelete(idToDelete)}
      />
      <CustomSnackbar {...snackProps} />
    </>
  );
};

export default TableRows;
