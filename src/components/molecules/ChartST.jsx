import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const data = [
  { month: 'Ene', year2023: 4000, year2024: 2400 },
  { month: 'Feb', year2023: 3000, year2024: 1398 },
  { month: 'Mar', year2023: 2000, year2024: 9800 },
  { month: 'Abr', year2023: 2780, year2024: 3908 },
  { month: 'May', year2023: 1890, year2024: 4800 },
  { month: 'Jun', year2023: 2390, year2024: 3800 },
  { month: 'Jul', year2023: 3490, year2024: 4300 },
  { month: 'Ago', year2023: 3490, year2024: 4300 },
  { month: 'Sep', year2023: 3490, year2024: 4300 },
  { month: 'Oct', year2023: 3490, year2024: 4300 },
  { month: 'Nov', year2023: 3490, year2024: 4300 },
  { month: 'Dic', year2023: 3490, year2024: 4300 },
];

const total2023 = data.reduce((sum, item) => sum + item.year2023, 0);
const total2024 = data.reduce((sum, item) => sum + item.year2024, 0);

const TendenciasVentas = () => (
  <Box sx={{ width: '100%', height: 'auto' }}>
    <Typography gutterBottom align="left" sx={{ fontSize: "25px", fontWeight: "bold" }}>
      Tendencia de ventas
    </Typography>
    <Box sx={{ width: '100%', height: 325 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10}}
        >
          <CartesianGrid stroke="none" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend
            verticalAlign="top"
            align="left"
            height={50}
            payload={[
              { value: <span style={{ fontWeight: 'bold' }}>Año 2023 <span style={{ color: 'black' }}>${total2023} -</span></span>, type: 'square', id: 'ID01', color: '#787878' },
              { value: <span style={{ fontWeight: 'bold' }}>Año 2024 <span style={{ color: 'black' }}>${total2024}</span></span>, type: 'square', id: 'ID02', color: '#266763' },
            ]}
          />
          <Bar dataKey="year2023" fill="#787878" name="Año 2023" />
          <Bar dataKey="year2024" fill="#266763" name="Año 2024" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  </Box>
);

export default TendenciasVentas;
