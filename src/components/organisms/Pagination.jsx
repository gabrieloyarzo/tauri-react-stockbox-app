import React from "react";
import { useTable } from "../../context/TableContext";
import MuiPagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";

const Pagination = ({ page, setFilterProps, count }) => {
  const { isLoading } = useTable();

  const handleChange = (event, value) => {
    if (value === page) {
      return;
    }
    setFilterProps((prevProps) => ({
      ...prevProps,
      offset: (value - 1) * 10,
    }));
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
        disabled={isLoading}
        sx={{
          ".MuiPaginationItem-root": {
            width: "calc(2vh + 2vw)",
            height: "calc(2vh + 2vw)",
          },
        }}
      />
    </Stack>
  );
};

export default Pagination;
