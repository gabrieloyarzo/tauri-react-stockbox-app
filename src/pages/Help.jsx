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
      icon: <HelpOutlineIcon fontSize="large" />,
      title: "¿Pregunta 1?",
      shortText:
        "Texto breve para la pregunta 1, ojalá de dos líneas porque sí.",
      longText:
        "Texto más extenso para la pregunta 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum molestie quam, et facilisis eros condimentum tincidunt.",
    },
    {
      id: 2,
      icon: <SearchIcon fontSize="large" />,
      title: "¿Pregunta 2?",
      shortText:
        "Texto breve para la pregunta 2, ojalá de dos líneas porque sí.",
      longText:
        "Texto más extenso para la pregunta 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum molestie quam, et facilisis eros condimentum tincidunt.",
    },
    {
      id: 3,
      icon: <HelpOutlineIcon fontSize="large" />,
      title: "¿Pregunta 3?",
      shortText:
        "Texto breve para la pregunta 3, ojalá de dos líneas porque sí.",
      longText:
        "Texto más extenso para la pregunta 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum molestie quam, et facilisis eros condimentum tincidunt.",
    },
    {
      id: 4,
      icon: <SearchIcon fontSize="large" />,
      title: "¿Pregunta 4?",
      shortText:
        "Texto breve para la pregunta 4, ojalá de dos líneas porque sí.",
      longText:
        "Texto más extenso para la pregunta 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum molestie quam, et facilisis eros condimentum tincidunt.",
    },
    {
      id: 5,
      icon: <HelpOutlineIcon fontSize="large" />,
      title: "¿Pregunta 5?",
      shortText:
        "Texto breve para la pregunta 5, ojalá de dos líneas porque sí.",
      longText:
        "Texto más extenso para la pregunta 5. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum molestie quam, et facilisis eros condimentum tincidunt.",
    },
    {
      id: 6,
      icon: <SearchIcon fontSize="large" />,
      title: "¿Pregunta 6?",
      shortText:
        "Texto breve para la pregunta 6, ojalá de dos líneas porque sí.",
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
            placeholder="Buscar..."
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
        {filteredFaqs.length ===
        0 /* En caso de que no haya coincidencias. */ ? (
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
          <Typography variant="body1">
            {selectedFaq && selectedFaq.longText}
          </Typography>
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
