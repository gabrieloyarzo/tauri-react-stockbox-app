import React, { useContext } from "react";
import { TableContext } from "../../context/TableContext";
import { TableHead, TableRow, TableCell } from "@mui/material";
import { adapter } from "../../functions/adapter";

const TableHeader = ({ defaultColumns }) => {
  const { currentTable } = useContext(TableContext);

  const columns = adapter(defaultColumns, currentTable);

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column} sx={{ textAlign: "center" }}>{column}</TableCell>
        ))}
        <TableCell key="options" sx={{ textAlign: "center" }}>Opciones</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
