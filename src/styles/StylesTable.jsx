import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d9d9d9",
    color: theme.palette.text.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  border: 1,
  backgroundColor: theme.palette.background.default,
  height: "64px",
  // hide last border
  // "&:last-child td, &:last-child th": {
  //   border: 0,
  // },
}));

export const StyledTableIcon = styled(IconButton)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: 1,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
