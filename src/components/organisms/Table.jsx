import React, { useState, useEffect } from "react";
import TableMUI from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHeader from "../molecules/TableHeader";
import TableRows from "../molecules/TableRows";
import { Grid } from "@mui/material";

const useTableColumns = ({ data }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setColumns(Object.keys(data[0]));
    }
  }, [data]);

  return columns;
};

const Table = ({
  data,
  fetchData,
  currentTable,
  toggleForm,
  setFormProps,
  filterProps,
  loading,
}) => {
  const columns = useTableColumns({ data });

  return (
    <TableContainer component={Paper}>
      <TableMUI
        className="tabla-datos"
        aria-label="content table"
      >
        <TableHeader currentTable={currentTable} />
        <TableRows
          currentTable={currentTable}
          data={data}
          columns={columns}
          filterProps={filterProps}
          fetchData={fetchData}
          toggleForm={toggleForm}
          setFormProps={setFormProps}
          loadingState={loading}
        />
      </TableMUI>
    </TableContainer>
  );
};

export default Table;
