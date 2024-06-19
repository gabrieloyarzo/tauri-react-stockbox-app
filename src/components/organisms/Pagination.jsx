import React from "react";
import { useTheme } from "@mui/material/styles";
import MuiPagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";

const Pagination = () => {
  const theme = useTheme;

  return (
    <Stack spacing={2}>
      <MuiPagination count={10} variant="outlined" color="primary" shape="rounded" />
    </Stack>
  );
};

export default Pagination;
