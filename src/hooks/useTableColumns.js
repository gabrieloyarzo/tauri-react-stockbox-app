import { useState, useEffect } from "react";

export const useTableColumns = ({ data }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setColumns(Object.keys(data[0]));
    }
  }, [data]);

  return { columns };
};
