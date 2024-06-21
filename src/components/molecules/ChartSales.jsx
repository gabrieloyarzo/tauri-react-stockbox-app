import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography, Grid } from '@mui/material';

const data = [
  { month: 'Ene', amount: 100000 },
  { month: 'Feb', amount: 120000 },
  { month: 'Mar', amount: 90000 },
  { month: 'Abr', amount: 110000 },
  { month: 'May', amount: 95000 },
  { month: 'Jun', amount: 150000 },
  { month: 'Jul', amount: 140000 },
  { month: 'Ago', amount: 190000 },
  { month: 'Sep', amount: 135000 },
  { month: 'Oct', amount: 14500 },
  { month: 'Nov', amount: 13000 },
  { month: 'Dic', amount: 15500 },
];

const Ventas = () => {

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
      <Typography gutterBottom align="left" sx={{fontSize: "27px", fontWeight: "bold"}}>
        Ventas
        <Typography component="span" color="textSecondary"sx={{fontSize: "30px", fontWeight: "bold", marginLeft: "5px"}}>
          $150,000
        </Typography>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 7, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis/> 
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