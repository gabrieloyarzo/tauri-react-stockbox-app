import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import AnalyticApi from '../../services/api/analytic.service';

const CardFormat = ({ titulo, monto, incremento, periodo }) => {
  return (
    <Box
      sx={{ 
        textAlign: 'center',
        p: 1, 
        borderRadius: "15px",
        bgcolor: "#EFEFEF",
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '85%',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)',
      }}
    >
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <Typography component="div" sx={{ fontWeight: "bold", textAlign: 'center', fontSize: '15px'}}>
            {titulo}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography component="div" sx={{ fontWeight: "bold", textAlign: 'center', fontSize: '22px', color: '#266763'}}>
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

const CardGrid = () => {
  const [analyticsData, setAnalyticsData] = useState({
    // sumTotalSales: 0,
    productsCount: 0,
    purchasesCount: 0,
    sumTotalSales: 0,
    // notificationCount: 0
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // const analyticsResponse = await AnalyticApi.getAnalyticData();
        const productsCount = await AnalyticApi.getProductsCount();
        const purchasesCount = await AnalyticApi.getPurchasesCount();
        const salesCount = await AnalyticApi.getSalesCount();
        // const notificationCount = await AnalyticApi.getnotificationCount();
        
        setAnalyticsData({
          // sumTotalSales: analyticsResponse.sumTotalSales,
          productsCount: productsCount,
          purchasesCount: purchasesCount,
          salesCount: salesCount
          // notificationCount: notificationCount
        });
      } catch (error) {
        console.error("Error al obtener datos de analytics:", error);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={2.4}>
        <CardFormat titulo="Ingresos totales" monto={`$${analyticsData.purchasesCount}`} incremento="10% ↑" periodo="Último mes" />
      </Grid>
      <Grid item xs={2.4}>
        <CardFormat titulo="N° de ventas" monto={analyticsData.salesCount} incremento="10% ↑" periodo="Último mes" />
      </Grid>
      <Grid item xs={2.4}>
        <CardFormat titulo="N° de compras" monto={analyticsData.purchasesCount} incremento="10% ↑" periodo="Último mes" />
      </Grid>
      <Grid item xs={2.3}>
        <CardFormat titulo="Alertas de bajo stock" monto={analyticsData.purchasesCount} />
      </Grid>
      <Grid item xs={2.5}>
        <CardFormat titulo="N° de inventario actual" monto={analyticsData.productsCount} />
      </Grid>
    </Grid>
  );
}

export default CardGrid;
