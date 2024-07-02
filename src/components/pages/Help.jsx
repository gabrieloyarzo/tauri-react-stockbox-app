import React, { useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EngineeringIcon from '@mui/icons-material/Engineering';

// Styled component for the Card
const StyledCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(1),
  borderRadius: ".2em",
  backgroundColor: "#EFEFEF",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "85%",
  boxShadow: theme.shadows[2],
}));

const Help = () => {
  const theme = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      icon: <Inventory2OutlinedIcon fontSize="large" />,
      title: "¿Cómo ingresar un nuevo producto?",
      shortText:
        "Obtén instrucciones sobre cómo añadir un producto al sistema.",
      longText:
        "Texto más extenso para la pregunta 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum molestie quam, et facilisis eros condimentum tincidunt.",
    },
    {
      id: 2,
      icon: <AttachMoneyOutlinedIcon fontSize="large" />,
      title: "¿Cómo registrar una venta?",
      shortText:
        "Obtén instrucciones sobre cómo registrar una nueva venta.",
      longText:
        "Texto más extenso para la pregunta 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum molestie quam, et facilisis eros condimentum tincidunt.",
    },
    {
      id: 3,
      icon: <SearchIcon fontSize="large" />,
      title: "¿Cómo buscar un producto?",
      shortText:
        "Descubre cómo buscar un producto en el inventario.",
      longText:
        "Texto más extenso para la pregunta 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum molestie quam, et facilisis eros condimentum tincidunt.",
    },
    {
      id: 4,
      icon: <GroupsIcon fontSize="large" />,
      title: "¿Cómo añadir proveedores?",
      shortText:
        "Aprende a añadir nuevos proveedores al sistema.",
      longText:
        "Texto más extenso para la pregunta 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum molestie quam, et facilisis eros condimentum tincidunt.",
    },
    {
      id: 5,
      icon: <EngineeringIcon fontSize="large" />,
      title: "¿En construcción de momento?",
      shortText:
        "Texto breve para la pregunta 5, ojalá de dos líneas porque sí.",
      longText:
        "Texto más extenso para la pregunta 5. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum molestie quam, et facilisis eros condimentum tincidunt.",
      steps: [
        "Hacer una cosa llamada 1.",
        "Hacer una cosa llamada 2.",
        "Hacer una cosa llamada 3.",
      ],
    },
    {
      id: 6,
      icon: <SupportAgentIcon fontSize="large" />,
      title: "Contacto de soporte",
      shortText:
        "Encuentra la información de contacto de soporte técnico.",
      longText:
        "Texto más extenso para la pregunta 6. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum molestie quam, et facilisis eros condimentum tincidunt.",
    },
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleCardClick = (faq) => {
    setSelectedFaq(faq);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedFaq(null);
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid
      container
      style={{
        marginTop: ".5em",
        justifyContent: "center",
        marginBottom: "50px",
      }}
      spacing={2}
    >
      <Grid item xs={12}>
        <Typography variant="h3" align="center" gutterBottom>
          Preguntas frecuentes
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Box display="flex" justifyContent="center" mb={1}>
          <TextField
            variant="outlined"
            placeholder="Utiliza términos clave para buscar"
            onChange={(e) => handleSearch(e.target.value)}
            fullWidth
            style={{ maxWidth: "65%" }}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} style={{ marginTop: ".5em" }}>
        {filteredFaqs.length === 0 ? (
          <Typography variant="body1" align="center">
            No se encontraron resultados.
          </Typography>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {filteredFaqs.map((faq) => (
              <Grid item key={faq.id} lg={3} style={{ margin: ".8em" }}>
                <StyledCard
                  style={{
                    border: "1px solid theme.palette.primary.main",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCardClick(faq)}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="center" mb={2}>
                      {faq.icon}
                    </Box>
                    <Typography variant="h6" align="center" gutterBottom>
                      {faq.title}
                    </Typography>
                    <Typography variant="body2" align="center">
                      {faq.shortText}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          sx: {
            transform: "translateX(25%)",
          },
        }}
      >
        <DialogTitle>{selectedFaq && selectedFaq.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {selectedFaq && selectedFaq.longText}
          </Typography>
          {selectedFaq && selectedFaq.steps && (
            <div>
              <Typography variant="h6" gutterBottom>
                Pasos:
              </Typography>
              {selectedFaq.steps.map((step, index) => (
                <Typography key={index} variant="body1">
                  {index + 1}. {step}
                </Typography>
              ))}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Help;