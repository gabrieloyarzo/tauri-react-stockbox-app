import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import MuiPagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";

const Pagination = ({ setFilterProps, count }) => {
  const theme = useTheme;
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setFilterProps((prevProps) => ({
      ...prevProps,
      offset: (value - 1) * 10,
    }));
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <MuiPagination
        count={Math.ceil(count / 10)}
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
