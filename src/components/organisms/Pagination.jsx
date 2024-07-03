import React from "react";
import { useTable } from "../../context/TableContext";
import MuiPagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";

const Pagination = ({ page, setPage, count }) => {
  const { isLoading } = useTable();

  const handleChange = (event, value) => {
    if (value === page) {
      return;
    }
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <MuiPagination
        size="large"
        count={Math.ceil(count / 10)}
        variant="outlined"
        color="primary"
        shape="rounded"
        page={page}
        onChange={handleChange}
        disabled={isLoading}
      />
    </Stack>
  );
};

export default Pagination;
