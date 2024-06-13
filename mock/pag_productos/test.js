// Evento para mostrar la ventana flotante
document.getElementById("boton-flotante").addEventListener("click", function() {
    document.getElementById("ventana_flotante").style.display = "block";
  });
  
  // Funcion para cerrar la ventana flotante
  function cerrarVentana() {
    document.getElementById("ventana_flotante").style.display = "none";
  }
  