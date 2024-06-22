import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const MyForm = () => {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 2,
        maxWidth: 400,
        margin: 'auto',
        border: '1px solid #ccc',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: 1,
          border: '1px solid #ccc',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" component="h1">
          Título del Formulario
        </Typography>
      </Box>
      <TextField label="Campo 1" variant="outlined" fullWidth />
      <TextField label="Campo 2" variant="outlined" fullWidth />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button variant="contained" color="primary">
          Botón 1
        </Button>
        <Button variant="contained" color="secondary">
          Botón 2
        </Button>
      </Box>
    </Box>
  );
};

export default MyForm;
