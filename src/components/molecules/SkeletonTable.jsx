import React from "react";
import { LinearProgress, Skeleton, Stack } from "@mui/material";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../../styles/StylesTable";

const SkeletonTable = () => {
  const columns = Array.from({ length: 4 }, (_, index) => index + 1);

  return (
    <Stack sx={{ marginTop: "2%" }}>
      <LinearProgress color="primary" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell colSpan={columns.length}>
                <Skeleton variant="rectangular" />
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell key={column}>
                  <Skeleton variant="rectangular" />
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default SkeletonTable;
