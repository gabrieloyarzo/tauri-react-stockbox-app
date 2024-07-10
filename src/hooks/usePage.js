import { useState, useEffect } from "react";

export const usePage = ({ filterProps }) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const pagina = ((filterProps?.offset + 10) / 10)
    setPage(pagina ?? 1);
  }, [filterProps]);

  return { page };
}