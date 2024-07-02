import React from "react";
import { Chip } from "@mui/material";

const getChipColor = (role) => {
  switch (role) {
    case "ADMIN":
      return "primary";
    case "USER":
      return "default";
    default:
      return "default";
  }
};

const CustomTableChip = ({ role }) => {
  return <Chip label={role} color={getChipColor(role)} size="small" />;
};

export default CustomTableChip;