import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts';
import { Typography, Box } from '@mui/material';

const data = [
  { name: 'Switches', value: 17 },
  { name: 'Displays', value: 16 },
  { name: 'Transistors', value: 14 },
  { name: 'Other', value: 13 },
  { name: 'Sensors', value: 12 },
  { name: 'Batteries', value: 9 },
  { name: 'Sens12312ors', value: 12 },
  { name: 'Batt2312eries', value: 9 },
  { name: 'Sen23sors', value: 12 },
  { name: 'Bat123teries', value: 9 },
];

const totalValue = data.reduce((acc, item) => acc + item.value, 0);


const dataWithPercentage = data.map(item => ({
  name: item.name,
  value: ((item.value / totalValue) * 100).toFixed(2) 
}));

const TopProductosVendidos = () => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6" paddingLeft="30px" gutterBottom>
        Top 10 productos más vendidos
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
      <BarChart
        layout="vertical"
        data={dataWithPercentage}
        margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={false} />
          <YAxis type="category" tick={false} />
          <Bar dataKey="value" fill="#8884d8" barSize={30}>
            <LabelList dataKey={(entry) => `${entry.name} (${entry.value}%)`} position="insideRight" style={{ fill: 'white' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TopProductosVendidos;
