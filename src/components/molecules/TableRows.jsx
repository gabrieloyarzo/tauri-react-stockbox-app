import React, { useState } from "react";
import { useTable } from "../../context/TableContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { useDialog } from "../../context/DialogContext";
import { useColumns } from "../../hooks/useColumns";
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
import { LoadingButton } from "@mui/lab";
import { auxDelete } from "../../functions/auxDelete";
import { deleteDialogTitleAndContext } from "../../functions/dialogTitleAndContext";
import { formatNumber } from "../../functions/helpers";
import { isMoneyField } from "../../functions/typeFields";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LoopIcon from "@mui/icons-material/Loop";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RenderModal from "../../functions/renderModal";
import CustomTableChip from "../atoms/custom-ui/CustomTableChip";
import RefundForm from "../organisms/forms/RefundForm";
import RefundApi from "../../services/api/refund.service";

const isDetailTable = (currentTable) => {
  return (
    currentTable === "sales" ||
    currentTable === "refunds" ||
    currentTable === "purchases"
  );
};

const TableRows = ({
  data,
  fetchData,
  toggleForm,
  setFormProps,
  allColumns,
  setFilterProps,
  count,
}) => {
  const theme = useTheme();
  const { currentTable, isLoading, tableColumns } = useTable();
  const { showSnackbar } = useSnackbar();
  const { showDialog } = useDialog();
  const { columns } = useColumns();

  // index key which would contain the array of details if it exists
  const dIndexKey =
    isDetailTable(currentTable) && data.length > 0
      ? Object.keys(data[0]).length - 1
      : null;

  // Detail Modal
  const [activeModal, setActiveModal] = useState(false);
  const [modalProps, setModalProps] = useState({});

  // Refund form
  const [activeRefund, setActiveRefund] = useState(false);
  const [sale, setSale] = useState({});
  const [loadingRefund, setLoadingRefund] = useState(false);

  const handleDetails = (details) => {
    setModalProps({
      data: details,
      closeModal: () => setActiveModal(false),
    });
    setActiveModal(true);
  };

  const handleRefund = (sale) => {
    setSale(sale);
    setActiveRefund(true);
  };

  const handleModifyRefund = async (idr) => {
    setLoadingRefund(true);
    try {
      const response = await RefundApi.getRefund(idr);
      setSale(response.data);
      setActiveRefund(true);
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    } finally {
      setLoadingRefund(false);
    }
  };

  const handleEdit = (obj) => {
    if (currentTable === "refunds") {
      setFormProps({
        mode: "modify",
        fetchData: fetchData,
        data: obj,
      });
    } else {
      setFormProps({
        mode: "modify",
        fetchData: fetchData,
        initialData: obj,
      });
    }
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
      setFilterProps((prevProps) => ({
        ...prevProps,
        offset:
          (prevProps?.offset + 10) / 10 > Math.ceil((count - 1) / 10) &&
          prevProps?.offset !== 0
            ? prevProps?.offset - 10
            : prevProps?.offset,
      }));
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
            component="tr"
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
            <td colSpan={100}>
              <CircularProgress />
            </td>
          </Box>
        )}
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={tableColumns.length + 1}
              sx={{ textAlign: "center", fontStyle: "italic" }}
            >
              Sin resultados
            </TableCell>
          </TableRow>
        ) : (
          data.map((obj, index) => (
            <TableRow key={index}>
              {columns.map((column, index) => {
                if (column === "rol") {
                  return (
                    <TableCell key={index} sx={{ textAlign: "center" }}>
                      <CustomTableChip role={obj[column]} />
                    </TableCell>
                  );
                }
                if (typeof obj[column] === "number") {
                  return (
                    <TableCell key={index} sx={{ textAlign: "right" }}>
                      {isMoneyField(column)
                        ? `$ ${formatNumber(obj[column])}`
                        : `${formatNumber(obj[column])}`}
                    </TableCell>
                  );
                }
                return <TableCell key={index}>{obj[column]}</TableCell>;
              })}
              <TableCell key="options" sx={{ textAlign: "center" }}>
                  {currentTable === "sales" &&
                    (obj?.idr ? (
                      <LoadingButton
                        onClick={() => handleModifyRefund(obj?.idr)}
                        loading={loadingRefund}
                        sx={{
                          minWidth: 0,
                          minHeight: 0,
                          width: "calc(1.5vh + 1.5vw)",
                          height: "calc(1.5vh + 1.5vw)",
                        }}
                      >
                        <Tooltip
                          title="Modificar devolución"
                          placement="bottom"
                          arrow
                          enterDelay={500}
                        >
                          <LoopIcon />
                        </Tooltip>
                      </LoadingButton>
                    ) : (
                      <IconButton
                        onClick={() => handleRefund(obj)}
                        sx={{
                          borderRadius: ".25em",
                          width: "calc(1.5vh + 1.5vw)",
                          height: "calc(1.5vh + 1.5vw)",
                          color: obj?.idr
                            ? theme.palette.success.light
                            : "secondary.contrastText",
                          "&:hover": {
                            backgroundColor: "#C3FA7B",
                          },
                        }}
                      >
                        <Tooltip
                          title="Crear devolución"
                          placement="bottom"
                          arrow
                          enterDelay={500}
                        >
                          <LoopIcon />
                        </Tooltip>
                      </IconButton>
                    ))}

                  {dIndexKey && (
                    <IconButton
                      onClick={() => handleDetails(obj)}
                      sx={{
                        borderRadius: ".25em",
                        width: "calc(1.5vh + 1.5vw)",
                        height: "calc(1.5vh + 1.5vw)",
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
                      width: "calc(1.5vh + 1.5vw)",
                      height: "calc(1.5vh + 1.5vw)",
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
                    onClick={() => handleDelete(obj[allColumns[0]])}
                    sx={{
                      borderRadius: ".25em",
                      width: "calc(1.5vh + 1.5vw)",
                      height: "calc(1.5vh + 1.5vw)",
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
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      {activeModal && (
        <RenderModal currentTable={currentTable} modalProps={modalProps} />
      )}
      {activeRefund && (
        <RefundForm
          mode="create"
          data={sale}
          closeForm={() => setActiveRefund(false)}
          fetchData={fetchData}
        />
      )}
    </>
  );
};

export default TableRows;
