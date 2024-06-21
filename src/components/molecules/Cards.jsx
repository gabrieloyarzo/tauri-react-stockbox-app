import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

const CardFormat = ({ titulo, monto, incremento, periodo }) => {
  return (
    <Box
      sx={{ 
        textAlign: 'center',
        p: 1, 
        border: '1px solid grey', 
        borderRadius: "15px",
        bgcolor: "#EFEFEF",
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '85%',
      }}
    >
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <Typography variant="h7" component="div" sx={{ fontWeight: "bold", textAlign: 'center' }}>
            {titulo}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" component="div">
            {monto}
          </Typography>
        </Grid>
        {(incremento || periodo) && (
          <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            {incremento && (
              <Typography fontSize="18px" color="text.secondary">
                {incremento}
              </Typography>
            )}
            {periodo && (
              <Typography fontSize="10px" color="text.secondary">
                {periodo}
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
    </Box>
  );
}



// const CardGrid = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await ProductApi.getAnalyticsData();
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={2.4}>
//         <CardFormat 
//           titulo={data.ingresosTotales.titulo} 
//           monto={data.ingresosTotales.monto} 
//           incremento={data.ingresosTotales.incremento} 
//           periodo={data.ingresosTotales.periodo} 
//         />
//       </Grid>
//       <Grid item xs={2.4}>
//         <CardFormat 
//           titulo={data.numeroDeVentas.titulo} 
//           monto={data.numeroDeVentas.monto} 
//           incremento={data.numeroDeVentas.incremento} 
//           periodo={data.numeroDeVentas.periodo} 
//         />
//       </Grid>
//       <Grid item xs={2.4}>
//         <CardFormat 
//           titulo={data.numeroDeCompras.titulo} 
//           monto={data.numeroDeCompras.monto} 
//           incremento={data.numeroDeCompras.incremento} 
//           periodo={data.numeroDeCompras.periodo} 
//         />
//       </Grid>
//       <Grid item xs={2.3}>
//         <CardFormat 
//           titulo={data.alertasDeBajoStock.titulo} 
//           monto={data.alertasDeBajoStock.monto} 
//         />
//       </Grid>
//       <Grid item xs={2.5}>
//         <CardFormat 
//           titulo={data.inventarioActualDeProductos.titulo} 
//           monto={data.inventarioActualDeProductos.monto}
//         />
//       </Grid>
//     </Grid>
//   );
// }


const CardGrid = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2.4}>
        <CardFormat titulo="Ingresos totales" monto="$40.000" incremento="10% ↑" periodo="Último mes" />
      </Grid>
      <Grid item xs={2.4}>
        <CardFormat titulo="N° de ventas" monto="$40.000" incremento="10% ↑" periodo="Último mes" />
      </Grid>
      <Grid item xs={2.4}>
        <CardFormat titulo="N° de compras" monto="$40.000" incremento="10% ↑" periodo="Último mes" />
      </Grid>
      <Grid item xs={2.3}>
        <CardFormat titulo="Alertas de bajo stock" monto="400" />
      </Grid>
      <Grid item xs={2.5}>
        <CardFormat titulo="Inventario actual de productos" monto="4000"/>
      </Grid>
    </Grid>
  );
}

export default CardGrid;
