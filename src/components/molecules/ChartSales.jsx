import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography, Grid } from '@mui/material';
import AnalyticApi from '../../services/api/analytic.service';
import { formatNumber } from '../../functions/helpers';

const AnnualSales  = () => {
  const [chartData, setChartData] = useState([]);
  const [totalSales, setTotalSales] = useState(0); 

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

        const allMonths = Array.from({ length: 12 }, (_, index) => {
          const month = new Date(currentYear, index, 1);
          return {
            month: month.toLocaleString('default', { month: 'short' }),
            amount: monthlySales[month.toLocaleString('default', { month: 'short' })] || 0,
          };
        });

        const totalSales = allMonths.reduce((total, data) => total + data.amount, 0);

        setChartData(allMonths);
        setTotalSales(totalSales);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const formattedValue = formatNumber(payload[0].value);
  
      return (
        <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
          <p>{`${label} ${new Date().getFullYear()}`}</p>
          <p>{`Ventas: $${formattedValue}`}</p>
        </div>
      );
    }
  
    return null;
  };

  const formatYAxis = (value) => {
    if (value >= 1000000) {
      const millionValue = value / 1000000;
      return `${millionValue.toFixed(millionValue < 10 ? 1 : 0)}M`;
    } else if (value >= 100000) {
      const thousandValue = value / 1000;
      return `${thousandValue.toFixed(0)}m`; 
    } else {
      return formatNumber(value); 
    }
  };

  return (
    <div style={{ width: '100%', height: '70%'}}>
      <Typography gutterBottom align="left" sx={{fontSize: "20px", fontWeight: "bold"}}>
        Balance de ventas 
        <Typography component="span" color="textSecondary" sx={{fontSize: "22px", fontWeight: "bold", marginLeft: "5px"}}>
          {`$${formatNumber(totalSales)}`}
        </Typography>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart
              data={chartData}
              margin={{ top: 2}}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${formatYAxis(value)}`}/> 
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="amount" stroke="#266763" activeDot={{ r: 10 }} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default AnnualSales;