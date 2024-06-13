import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

const AddButton = ({ fetchData, toggleForm, setFormProps }) => {
  return (
    <IconButton
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "50px",
        backgroundColor: "#000",
        color: "#fff",
        '&:hover': {
          backgroundColor: '#c3fa7b',
          color: "#7e7e7e",
        },
      }}
      onClick={() => {
        setFormProps({
          mode: "create",
          fetchData: fetchData,
        });
        toggleForm();
      }}
    >
      <AddIcon fontSize="large" />
    </IconButton>
  );
};

export default AddButton;
