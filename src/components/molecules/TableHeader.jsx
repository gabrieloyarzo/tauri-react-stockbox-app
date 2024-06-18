import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell } from "../../styles/StylesTable";

const tableColumns = ({ currentTable }) => {
  switch (currentTable) {
    case "products":
      return ["ID", "Código", "Nombre", "Categoría", "Cantidad", "Cantidad mínima", "Precio"];
    case "purchases":
      return ["ID", "Código", "RUT del proveedor", "RUT del usuario", "Fecha", "Compra total"];
    case "sales":
      return ["ID", "Código", "RUT del cliente", "RUT del usuario", "Fecha", "Venta total"];
    case "providers":
      return ["RUT del proveedor", "Nombre", "Dirección", "Teléfono", "Tipo"];
    case "users":
      return ["RUT del usuario", "Correo", "Contraseña", "Nombre", "Apellido", "Rol"];
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
