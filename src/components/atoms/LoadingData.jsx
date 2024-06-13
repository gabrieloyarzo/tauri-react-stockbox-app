import React, { useState, useEffect } from "react";
import loading from "../../images/loading.gif";
import { Container } from "@mui/material";

const LoadingData = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots === "..." ? "" : prevDots + "."));
    }, 300); // Cambia el valor según la velocidad deseada

    return () => clearInterval(interval);
  }, []);

  return (
    <Container
      maxWidth="sm" // Establece el ancho máximo del Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh', // Ajusta la altura según tu diseño
        position: 'absolute', // Establece el posicionamiento absoluto
        top: '30%', // Coloca el Container en la mitad de la pantalla verticalmente
        left: '60%', // Coloca el Container en la mitad de la pantalla horizontalmente
        transform: 'translate(-50%, -50%)', // Centra el Container en relación con su posición absoluta
      }}
    >
      <img
        src={loading}
        alt="Loading animation"
        style={{ width: "100px", height: "100px" }} // Ajusta el tamaño de la imagen
      />
      <h2 style={{ fontStyle: "italic" }}>Cargando data{dots}</h2>
    </Container>
  );
};

export default LoadingData;
