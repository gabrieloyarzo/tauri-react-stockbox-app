export function WebSocketConnection (showSnackbar)  {
      const ws = new WebSocket('ws://gestion-api-ovkf.onrender.com');
      ws.addEventListener('message', (message) => {
         showSnackbar(message.data,"info");
      });

      ws.addEventListener('error' , () => {
        console.error('Error connecting to WebSocket');
      });

      ws.addEventListener('open', () => {
        console.log('WebSocket connection established');
      });


};


