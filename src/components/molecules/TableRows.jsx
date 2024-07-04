import React, { useState } from "react";
import { useTable } from "../../context/TableContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { useDialog } from "../../context/DialogContext";
import { useTheme } from "@mui/material";
import {
  IconButton,
  Tooltip,
  CircularProgress,
  Box,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { auxDelete } from "../../functions/auxDelete";
import { deleteDialogTitleAndContext } from "../../functions/dialogTitleAndContext";
import { formatNumber } from "../../functions/helpers";
import { formatDateToSpanish } from "../../functions/formatDate";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RenderModal from "../../functions/renderModal";
import CustomTableChip from "../atoms/custom-ui/CustomTableChip";

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
  data,
  columns,
  fetchData,
  toggleForm,
  setFormProps,
  filterProps,
}) => {
  const theme = useTheme();
  const { currentTable, isLoading, tableColumns } = useTable();
  const { showSnackbar } = useSnackbar();
  const { showDialog } = useDialog();

  // index key which would contain the array of details if it exists
  const dIndexKey =
    isDetailTable(currentTable) && data.length > 0
      ? Object.keys(data[0]).length - 1
      : null;

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
    showDialog(
      deleteDialogTitleAndContext(currentTable).title,
      deleteDialogTitleAndContext(currentTable).content,
      "Eliminar",
      () => confirmDelete(id)
    );
  };

  const confirmDelete = async (id) => {
    try {
      const response = await auxDelete({ currentTable, id });
      await fetchData(filterProps);
      showSnackbar(response.message, "success");
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    }
  };

  return (
    <>
      <TableBody
        sx={{
          position: "relative",
          backgroundColor: isLoading
            ? theme.palette.background.paper
            : theme.palette.background.default,
          opacity: isLoading ? 0.5 : 1,
        }}
      >
        {isLoading && (
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
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={tableColumns.length + 1} sx={{ textAlign: "center", fontStyle: "italic" }}>
              Sin resultados
            </TableCell>
          </TableRow>
        ) : (
          data.map((obj, index) => (
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
                : columns.map((column, index) => {
                    if (column === "rol") {
                      return (
                        <TableCell key={index} sx={{ textAlign: "center" }}>
                          <CustomTableChip role={obj[column]} />
                        </TableCell>
                      );
                    }
                    if (!Array.isArray(obj[column])) {
                      return typeof obj[column] === "number" ? (
                        <TableCell key={index} sx={{ textAlign: "right" }}>
                          {formatNumber(obj[column])}
                        </TableCell>
                      ) : (
                        <TableCell key={index}>{obj[column]}</TableCell>
                      );
                    } else {
                      return null;
                    }
                  })}
              <TableCell key="options" sx={{ textAlign: "center" }}>
                <div>
                  {dIndexKey && (
                    <IconButton
                      onClick={() => handleDetails(obj)}
                      sx={{
                        borderRadius: ".25em",
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
                      borderRadius: ".25em",
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
                      borderRadius: ".25em",
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
          ))
        )}
      </TableBody>
      {activeModal && (
        <RenderModal currentTable={currentTable} modalProps={modalProps} />
      )}
    </>
  );
};

export default TableRows;
