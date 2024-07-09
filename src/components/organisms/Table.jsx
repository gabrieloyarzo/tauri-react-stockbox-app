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
  toggleForm,
  setFormProps,
  filterProps,
  setFilterProps,
  count,
}) => {
  const columns = useTableColumns({ data });

  return (
    <TableContainer component={Paper}>
      <TableMUI className="tabla-datos" aria-label="content table">
        <TableHeader defaultColumns={columns} />
        <TableRows
          data={data}
          columns={columns}
          fetchData={fetchData}
          toggleForm={toggleForm}
          setFormProps={setFormProps}
          filterProps={filterProps}
          setFilterProps={setFilterProps}
          count={count}
        />
      </TableMUI>
    </TableContainer>
  );
};

export default Table;
