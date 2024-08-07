import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import AnalyticApi from '../../services/api/analytic.service';
import { formatNumber } from '../../functions/helpers';

const CardFormat = ({ titulo, monto, incremento, periodo }) => {
  let incrementoColor = 'green';

  if (incremento && incremento.includes('↓')) {
    incrementoColor = 'red';
  }

  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 0.6,
        borderRadius: "15px",
        bgcolor: "#EFEFEF",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)',
        overflow: 'hidden',
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: "bold", textAlign: 'center' }}>
        {titulo}
      </Typography>
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: "bold", 
          textAlign: 'center', 
          color: '#266763', 
          wordBreak: 'break-word', 
          fontSize: 'clamp(1rem, 2vw, 1.5rem)',
          transition: 'font-size 0.2s ease',
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        {monto}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            flex: 1,
            fontSize: "0.75em", 
            wordBreak: 'break-word', 
            textAlign: 'left',
            overflow: 'hidden',
          }} 
          color="text.secondary"
        >
          {periodo}
        </Typography>
        <Typography 
          variant="h6" 
          color={incrementoColor} 
          sx={{ 
            flex: 1,
            wordBreak: 'break-word', 
            fontSize: 'clamp(1rem, 2vw, 1rem)',
            textAlign: 'right',
            overflow: 'hidden',
          }}
        >
          {incremento}
        </Typography>
      </Box>
    </Box>
  );
}  


const CardGrid = () => {
  
  const [analyticsData, setAnalyticsData] = useState({
    IngresosTotales: 0,
    NVentas: 0,
    NCompras: 0,
    NDevoluciones: 0,
    NProveedores: 0,
  });

  const [currentMonthSales, setCurrentMonthSales] = useState(0);
  const [lastMonthSales, setLastMonthSales] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AnalyticApi.getAnalyticData();
        const currentYear = new Date().getFullYear();

        const salesData = response.data.datePriceSales
          .filter(item => new Date(item.date).getFullYear() === currentYear)
          .map(item => ({
            month: new Date(item.date).toLocaleString('default', { month: 'short' }),
            amount: item.total_price,
          }));

        const monthlySales = salesData.reduce((acc, data) => {
          const { month, amount } = data;
          if (!acc[month]) {
            acc[month] = 0;
          }
          acc[month] += amount;
          return acc;
        }, {});

        const currentMonth = new Date().toLocaleString('default', { month: 'short' });
        const lastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toLocaleString('default', { month: 'short' });

        const currentSales = monthlySales[currentMonth] || 0;
        const lastSales = monthlySales[lastMonth] || 0;

        setCurrentMonthSales(currentSales);
        setLastMonthSales(lastSales);

        setAnalyticsData({
          IngresosTotales: response.data.sumTotalSales,
          NVentas: response.data.countSales,
          NCompras: response.data.countPurchases,
          NProveedores: response.data.countProviders,
          NDevoluciones: response.data.countRefunds,
        });
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  let incrementoIngresos = '';
  if (currentMonthSales !== 0 && lastMonthSales !== 0) {
    const incremento = ((currentMonthSales - lastMonthSales) / lastMonthSales) * 100;
    incrementoIngresos = `${incremento.toFixed(0)}% `;
    if (incremento < 0) {
      incrementoIngresos += '↓';
    } else {
      incrementoIngresos += '↑';
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={2.4}>
        <CardFormat titulo="Ingresos totales" monto={`$${formatNumber(currentMonthSales)}`} incremento={incrementoIngresos} periodo="Último mes" />
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <CardFormat titulo="N° de ventas" monto={analyticsData.NVentas} />
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <CardFormat titulo="N° de compras" monto={analyticsData.NCompras} />
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <CardFormat titulo="N° de devoluciones" monto={analyticsData.NDevoluciones} />
      </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
        <CardFormat titulo="N° de proveedores" monto={analyticsData.NProveedores} />
      </Grid>
    </Grid>
  );
}

export default CardGrid;