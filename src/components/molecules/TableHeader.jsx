import React from "react";
import { useFilter } from "../../context/FilterContext";
import { TableHead, TableRow, TableCell } from "@mui/material";

const TableHeader = () => {
  const { filterCategories } = useFilter();

  const columns = filterCategories;

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
