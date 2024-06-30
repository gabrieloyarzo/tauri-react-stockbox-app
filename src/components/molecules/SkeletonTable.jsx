import React from "react";
import { LinearProgress, Skeleton, Stack } from "@mui/material";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";

const SkeletonTable = () => {
  const columns = Array.from({ length: 4 }, (_, index) => index + 1);

  return (
    <Stack>
      <TableContainer component={Paper}>
      <LinearProgress
        color="primary"
        sx={{
          width: "100%",
          zIndex: 1,
        }}
      />
        <Table>
          <TableHead sx={{ borderRadius: "0px" }}>
            <TableRow>
              <TableCell
                sx={{ paddingRight: "1.25em", paddingLeft: "1.25em" }}
                colSpan={columns.length}
              >
                <Skeleton variant="rectangular" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>
                  <Skeleton variant="rectangular" />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default SkeletonTable;
