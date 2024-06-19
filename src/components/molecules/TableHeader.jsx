import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";

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
      return ["RUT del usuario", "Correo", "Nombre", "Apellido", "Rol"];
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
          <TableCell key={column} sx={{ textAlign: "center" }}>{column}</TableCell>
        ))}
        <TableCell key="actions" sx={{ textAlign: "center" }}>Acciones</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
