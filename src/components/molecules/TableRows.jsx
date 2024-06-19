import React, { useState } from "react";
import { useTheme } from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";
import { TableBody, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { auxDelete } from "../../functions/auxDelete";
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

const TableRows = ({
  currentTable,
  data,
  columns,
  fetchData,
  toggleForm,
  setFormProps,
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
      await fetchData();

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
      <TableBody>
        {data.map((obj, index) => (
          <TableRow key={index}>
            {columns.map(
              (column, index) =>
                !Array.isArray(obj[column]) &&
                (isNaN(obj[column]) ? (
                  <TableCell key={index}>{obj[column]}</TableCell>
                ) : (
                  <TableCell key={index} sx={{ textAlign: "right" }}>
                    {obj[column]}
                  </TableCell>
                ))
            )}
            <TableCell key="actions" sx={{ textAlign: "center" }}>
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
