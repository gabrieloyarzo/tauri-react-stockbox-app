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
        width: "3vw",
        height: "3vw",
        backgroundColor: "#000",
        color: "#fff",
        '&:hover': {
          backgroundColor: '#c3fa7b',
          color: "#7e7e7e",
          width: "3.25vw",
          height: "3.25vw",
          transition: "width 0.3s, height 0.3s", // Transición suave de tamaño
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
      <AddIcon sx={{ fontSize: "2.5vw" }} />
    </IconButton>
  );
};

export default AddButton;
