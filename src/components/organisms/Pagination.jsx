import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import MuiPagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";

const Pagination = ({ fetchData, setFilterProps }) => {
  const theme = useTheme;
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setFilterProps({ offset: (value - 1) * 10, limit: 10 });
    setPage(value);
    fetchData(value);
  };

  return (
    <Stack spacing={2}>
      <MuiPagination
        count={10}
        variant="outlined"
        color="primary"
        shape="rounded"
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default Pagination;
