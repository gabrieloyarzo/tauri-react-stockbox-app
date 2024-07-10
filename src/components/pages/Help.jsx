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
import CachedIcon from '@mui/icons-material/Cached';

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
        "Si necesitas añadir un nuevo producto al sistema, a continuación te proporcionamos los pasos detallados",
      steps: [
        "Dirígete a la sección de ''Productos''. ", 
        "Haz clic en el icono de agregar (+) ubicado en la esquina inferior derecha.", 
        "Completa los campos solicitados con la información adecuada.",
        "Para guardar el producto registrado, selecciona el botón de guardar.",
        "Si decides no registrar el producto, simplemente cierra el formulario.",
      ],
    },
    {
      id: 2,
      icon: <AttachMoneyOutlinedIcon fontSize="large" />,
      title: "¿Cómo registrar una venta?",
      shortText:
        "Obtén instrucciones sobre cómo registrar una nueva venta.",
      longText:
        "Si necesitas incorporar una venta realizada en el sistema, a continuación se detallan los pasos que debes seguir para llevar a cabo este proceso.",
      steps: [
        "Accede a la sección de ''Ventas''.",
        "Haz clic en el icono de agregar (+) ubicado en la esquina inferior derecha.",
        "Completa todos los campos requeridos con la información precisa.",
        "Guarda la venta registrada seleccionando la opción correspondiente.",
        "Si optas por no registrar la venta, puedes cerrar el formulario sin guardar cambios.",
      ],
    },
    {
      id: 3,
      icon: <SearchIcon fontSize="large" />,
      title: "¿Cómo buscar un producto?",
      shortText:
        "Descubre cómo buscar un producto en el inventario.",
      longText:
        "Si necesitas buscar un producto en particular, aquí tienes una guía paso a paso para ayudarte a realizar esta tarea.",
      steps: [
        "Ve a la sección de ''Productos''.",
        "Utiliza el filtro de búsqueda según tus necesidades.",
        "En la barra de búsqueda, ingresa los detalles del producto que deseas encontrar.",
        "Después de realizar la búsqueda, revisa los resultados y toma las acciones pertinentes según sea necesario.",
      ],
    },
    {
      id: 4,
      icon: <GroupsIcon fontSize="large" />,
      title: "¿Cómo añadir proveedores?",
      shortText:
        "Aprende a añadir nuevos proveedores al sistema.",
      longText:
        "Si necesitas incorporar un nuevo proveedor al sistema, a continuación se detallan los pasos que debes seguir para llevar a cabo este proceso.",
      steps: [
        "Ir al apartado ''Proveedores''.",
        "Haz clic en el icono de agregar (+) ubicado en la esquina inferior derecha.",
        "Proporciona toda la información necesaria en los campos correspondientes.",
        "Haz clic en la opción adecuada para guardar la información del proveedor registrado.",
        "Si prefieres no guardar el proveedor, simplemente cierra el formulario.",
      ],
    },
    {
      id: 5,
      icon: <CachedIcon fontSize="large" />,
      title: "¿Cómo realizar una devolución?",
      shortText:
        "Descubre como realizar una devolución de venta.",
      longText:
        "A continuación, te ofrecemos los pasos necesarios para realizar la devolución de una venta en nuestro sistema.",
      steps: [
        "Ir a la sección ''Venta''.",
        "Busca la venta de la cual deseas realizar la devolución utilizando el método que te resulte más conveniente.",
        "Una vez localizada, selecciona el icono de devolución.",
        "Complete los campos requeridos con la información necesaria para procesar la devolución.",
        "Si todo está correcto, elija la opción de guardar para confirmar la devolución.",
        "En caso contrario, si decide no proceder, elija la opción de cancelar.",
      ],
    },
    {
      id: 6,
      icon: <SupportAgentIcon fontSize="large" />,
      title: "Contacto de soporte",
      shortText:
        "Encuentra la información de contacto de soporte técnico.",
      longText:
        "Si necesita ayuda adicional, puede contactar al equipo de soporte de StockBox.",
      steps: [
        "Enviar un correo a stockbox.soporte@gmail.com.",
        "En el asunto del correo agregar inicialmente ''StockBox - Asunto del contacto''.",
      ],  
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