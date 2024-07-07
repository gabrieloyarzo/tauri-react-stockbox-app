import { useState, useEffect } from "react";
import {
  iProduct,
  iPurchase,
  iSales,
  iRefund,
  iUser,
  iProvider,
} from "../functions/dataStructure";
import { useTable } from "../context/TableContext";

export const useColumns = () => {
  const { currentTable, tableColumns } = useTable();
  const [columns, setColumns] = useState([]);

  const getColumns = (currentTable) => {
    switch (currentTable) {
      case "products":
        return Object.keys(iProduct);
      case "purchases":
        return Object.keys(iPurchase);
      case "sales":
        return Object.keys(iSales);
      case "refunds":
        return Object.keys(iRefund);
      case "users":
        return Object.keys(iUser);
      case "providers":
        return Object.keys(iProvider);
      default:
        return tableColumns;
    }
  };

  useEffect(() => {
    setColumns(getColumns(currentTable));
  }, [currentTable]);

  return { columns };
};
