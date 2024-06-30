import React, { useState, useEffect } from "react";
import TableMUI from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHeader from "../molecules/TableHeader";
import TableRows from "../molecules/TableRows";

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
  loading,
  setLoading,
}) => {
  const columns = useTableColumns({ data });

  return (
    <TableContainer component={Paper}>
      <TableMUI
        className="tabla-datos"
        aria-label="content table"
      >
        <TableHeader />
        <TableRows
          data={data}
          columns={columns}
          fetchData={fetchData}
          toggleForm={toggleForm}
          setFormProps={setFormProps}
          loadingState={loading}
          setLoadingState={setLoading}
        />
      </TableMUI>
    </TableContainer>
  );
};

export default Table;
