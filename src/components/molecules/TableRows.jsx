import React, { useState } from "react";
import { useTheme } from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { StyledTableCell, StyledTableRow } from "../../styles/StylesTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { auxDelete } from "../../functions/auxDelete";
import RenderModal from "../../functions/renderModal";
import DeleteDialog from "../atoms/custom-ui/dialogs/DeleteDialog";
import DeleteSnackbar from "../atoms/custom-ui/snackbars/DeleteSnackbar";

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
  const dIndexKey = isDetailTable(currentTable)
    ? Object.keys(data[0]).length - 1
    : null;

  // Delete Dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  // Delete Snackbar
  const [deleteSnackProps, setDeleteSnackProps] = useState({});

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

  const confirmDelete = async (id) => {
    setLoading(true);

    try {
      await auxDelete({ currentTable, id });
      await fetchData();

      setDeleteSnackProps({
        open: true,
        currentTable,
        id: idToDelete,
        closeSnack: (event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setDeleteSnackProps((prevProps) => ({
            ...prevProps,
            open: false,
          }));
        },
        severity: "success",
      });
    } catch (error) {
      setDeleteSnackProps({
        open: true,
        currentTable,
        error,
        closeSnack: (event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setDeleteSnackProps((prevProps) => ({
            ...prevProps,
            open: false,
          }));
        },
        severity: "error",
      });
    }

    setOpenDeleteDialog(false);

    setLoading(false);
  };

  return (
    <>
      <TableBody>
        {data.map((obj, index) => (
          <StyledTableRow key={index}>
            {columns.map(
              (column, index) =>
                !Array.isArray(obj[column]) && (
                  <StyledTableCell key={index}>{obj[column]}</StyledTableCell>
                )
            )}
            <StyledTableCell key="actions">
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
            </StyledTableCell>
          </StyledTableRow>
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
      <DeleteSnackbar {...deleteSnackProps} />
    </>
  );
};

export default TableRows;
