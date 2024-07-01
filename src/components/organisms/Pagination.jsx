import React from "react";
import { useFilter } from "../../context/FilterContext";
import { useTheme } from "@mui/material/styles";
import MuiPagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";

const Pagination = () => {
  const theme = useTheme;
  const { page, setPage, count } = useFilter();

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
      />
    </Stack>
  );
};

export default Pagination;
