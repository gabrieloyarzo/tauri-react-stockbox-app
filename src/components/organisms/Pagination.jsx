import React, { useState, useContext } from "react";
import { FilterContext } from "../../context/FilterContext";
import { useTheme } from "@mui/material/styles";
import MuiPagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";

const Pagination = ({ count }) => {
  const theme = useTheme;
  const { setFilterProps } = useContext(FilterContext);

  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    if (value === page) {
      return;
    }
    setFilterProps((prevProps) => ({
      ...prevProps,
      offset: (value - 1) * 10,
    }));
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
