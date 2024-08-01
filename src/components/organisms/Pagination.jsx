import React from "react";
import { useTheme } from "@mui/material/styles";
import { useTable } from "../../context/TableContext";
import MuiPagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";

const Pagination = ({ page, setFilterProps, count }) => {
  const theme = useTheme();
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
            width: "calc(1.75vh + 1.75vw)",
            height: "calc(1.75vh + 1.75vw)",
            fontSize: theme.typography.body1.fontSize,
          },
        }}
      />
    </Stack>
  );
};

export default Pagination;
