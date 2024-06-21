import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts';
import { Typography, Box } from '@mui/material';

const data = [
  { name: 'Switches', value: 67000 },
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

const renderCustomizedLabel = ({ x, y, width, value, index }) => {
    const item = dataWithPercentage[index];
  
    return (
      <text x={x} y={y} dy={-4} textAnchor="start" fill="#666" fontSize={12} fontWeight="bold" >
        {`${item.name} (${item.value}%)`}
      </text>
    );
  };

const TopProductosVendidos = () => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography gutterBottom align="left" sx={{fontSize: "25px", fontWeight: "bold", marginLeft: "30px"}}>
        Top 10 productos más vendidos
      </Typography>
      <ResponsiveContainer width="100%" height={360}>
      <BarChart
        layout="vertical"
        data={dataWithPercentage}
        margin={{ top: 5, right: 5}}
        >
          <XAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
          <YAxis type="category" tick={false} axisLine={false}/>
          <Bar dataKey="value" fill="#266763" barSize={7} >
            <LabelList dataKey="name" content={renderCustomizedLabel} />
          </Bar>
          
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TopProductosVendidos;
