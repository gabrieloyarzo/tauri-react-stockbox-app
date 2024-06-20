import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";

const tableColumns = ({ currentTable }) => {
  switch (currentTable) {
    case "products":
      return ["Código", "Nombre", "Categoría", "Cantidad", "Cantidad mínima", "Precio"];
    case "purchases":
      return ["Código", "RUT de proveedor", "RUT de usuario", "Fecha", "Compra total"];
    case "sales":
      return ["Código", "RUT del cliente", "RUT del usuario", "Fecha", "Venta total"];
    case "providers":
      return ["RUT", "Nombre", "Dirección", "Teléfono", "Tipo"];
    case "users":
      return ["RUT", "Correo", "Nombre", "Apellido", "Estado", "Rol"];
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
        <TableCell key="options" sx={{ textAlign: "center" }}>Opciones</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
