import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography, Grid } from '@mui/material';
import AnalyticApi from '../../services/api/analytic.service';

const Ventas = () => {
  const [chartData, setChartData] = useState([]);
  const [totalSales, setTotalSales] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AnalyticApi.getAnalyticData();
        const salesData = response.data.datePriceSales.map(item => ({
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
          const month = new Date(new Date().getFullYear(), index, 1);
          return {
            month: month.toLocaleString('default', { month: 'short' }),
            amount: monthlySales[month.toLocaleString('default', { month: 'short' })] || 0,
          };
        });
  
        const totalSales = allMonths.reduce((total, data) => total + data.amount, 0);
  
        setChartData(allMonths);
        setTotalSales(totalSales);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
          <p>{`${label} ${new Date().getFullYear()}`}</p>
          <p>{`Ventas: ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div style={{ width: '100%', height: 'auto'}}>
      <Typography gutterBottom align="left" sx={{fontSize: "24px", fontWeight: "bold"}}>
        Balance de ventas -
        <Typography component="span" color="textSecondary" sx={{fontSize: "30px", fontWeight: "bold", marginLeft: "5px"}}>
          {`$${totalSales}`} 
        </Typography>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 10, left: 7, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis /> 
              {/* label={{ value: 'Ventas', angle: -90, position: 'insideLeft' }} */}
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="amount" stroke="#266763" activeDot={{ r: 10 }} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Ventas;
