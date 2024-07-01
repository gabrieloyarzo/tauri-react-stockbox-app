import React from "react";
import { Skeleton, Stack, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SkeletonFilters = () => {
  const theme = useTheme();

  return (
    <Stack direction="row" width="100%" spacing={3} alignItems="center">
      <Box
        height="2.5rem"
        borderRadius=".5rem"
        alignContent="center"
        sx={{ flex: 0.3, boxShadow: theme.shadows[3] }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ margin: ".5em", borderRadius: ".25em" }}
        />
      </Box>
      <Box
        height="2.5rem"
        borderRadius=".5rem"
        alignContent="center"
        sx={{ flex: 0.3, boxShadow: theme.shadows[3] }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ margin: ".5em", borderRadius: ".25em" }}
        />
      </Box>
      <Box
        height="2.5rem"
        borderRadius=".5rem"
        alignContent="center"
        sx={{ flex: 0.3, boxShadow: theme.shadows[3] }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ margin: ".5em", borderRadius: ".25em" }}
        />
      </Box>
      <Box
        height="2.5rem"
        borderRadius=".5rem"
        alignContent="center"
        sx={{ flex: 0.4, boxShadow: theme.shadows[3] }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ margin: ".5em", borderRadius: ".25em" }}
        />
      </Box>
    </Stack>
  );
};

export default SkeletonFilters;
