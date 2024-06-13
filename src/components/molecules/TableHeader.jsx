import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell } from "../../styles/StylesTable";

const tableColumns = ({ currentTable }) => {
  switch (currentTable) {
    case "products":
      return ["ID", "Nombre", "Categoría", "Cantidad", "Cantidad mínima", "Precio"];
    case "orders":
      return ["ID", "RUT del proveedor", "RUT del usuario", "Fecha", "Compra total"];
    case "sales":
      return ["ID", "RUT del cliente", "RUT del usuario", "Fecha", "Venta total"];
    default:
      return console.error("El tipo de tabla no coincide con ninguno especificado");
  }
}


const TableHeader = ({ currentTable }) => {
  const columns = tableColumns({ currentTable });

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <StyledTableCell key={column}>{column}</StyledTableCell>
        ))}
        <StyledTableCell>Acciones</StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
