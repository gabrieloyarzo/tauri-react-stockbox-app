import React from "react";
import { useTable } from "../../context/TableContext";
import { TableHead, TableRow, TableCell } from "@mui/material";

const TableHeader = () => {
  const { tableColumns } = useTable();

  return (
    <TableHead>
      <TableRow>
        {tableColumns.map((column) => (
          <TableCell key={column} sx={{ textAlign: "center" }}>{column}</TableCell>
        ))}
        <TableCell key="options" sx={{ textAlign: "center" }}>Opciones</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
